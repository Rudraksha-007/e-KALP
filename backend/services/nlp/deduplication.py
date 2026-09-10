import re
from math import radians, sin, cos, sqrt, atan2

from services.nlp.embeddings import (
    generate_embedding,
    cosine_similarity,
)


# ============================================================
# CONFIGURATION
# ============================================================

# Based on our calibration experiment:
#
# ~0.65 gave the best pure-similarity F1.
#
# We don't use this as the only duplicate condition.
SEMANTIC_DUPLICATE_THRESHOLD = 0.65

# Very low similarity generally indicates unrelated problems.
SEMANTIC_UNRELATED_THRESHOLD = 0.30

# Problems within this distance receive stronger geographic
# evidence.
DEFAULT_DISTANCE_KM = 5.0

# Extremely close reports receive additional confidence.
VERY_CLOSE_DISTANCE_KM = 1.0


# ============================================================
# CATEGORY GROUPS
# ============================================================

# These are used to determine whether two categories are
# compatible enough to potentially represent the same issue.
#
# We intentionally don't require exact category equality because
# the categorizer can occasionally produce different but related
# categories for the same real-world problem.

CATEGORY_GROUPS = {
    "WATER_MANAGEMENT": {
        "WATER_MANAGEMENT",
        "AGRICULTURE",
    },

    "AGRICULTURE": {
        "AGRICULTURE",
        "WATER_MANAGEMENT",
        "RURAL_LIVELIHOODS",
    },

    "RURAL_LIVELIHOODS": {
        "RURAL_LIVELIHOODS",
        "AGRICULTURE",
    },

    "SANITATION": {
        "SANITATION",
        "WATER_MANAGEMENT",
        "ENVIRONMENT",
    },

    "ENVIRONMENT": {
        "ENVIRONMENT",
        "SANITATION",
        "WATER_MANAGEMENT",
        "URBAN_INFRASTRUCTURE",
    },

    "HEALTHCARE": {
        "HEALTHCARE",
    },

    "EDUCATION": {
        "EDUCATION",
    },

    "ACCESSIBILITY": {
        "ACCESSIBILITY",
        "URBAN_INFRASTRUCTURE",
        "PUBLIC_SERVICE_DELIVERY",
    },

    "URBAN_INFRASTRUCTURE": {
        "URBAN_INFRASTRUCTURE",
        "ENVIRONMENT",
        "ACCESSIBILITY",
    },

    "PUBLIC_SERVICE_DELIVERY": {
        "PUBLIC_SERVICE_DELIVERY",
        "ACCESSIBILITY",
    },
}


# ============================================================
# ISSUE KEYWORDS
# ============================================================

# Instead of comparing every word, we focus on words that help
# identify the actual underlying issue.
#
# This is especially useful for cases such as:
#
#   drinking water shortage
#          vs
#   irrigation water shortage
#
# They are semantically similar but represent different issues.

ISSUE_KEYWORDS = {
    "water": {
        "water",
        "drinking",
        "pipeline",
        "handpump",
        "pump",
        "well",
        "groundwater",
        "supply",
        "irrigation",
    },

    "sanitation": {
        "toilet",
        "toilets",
        "sewage",
        "sewer",
        "drainage",
        "drain",
        "wastewater",
        "garbage",
        "waste",
        "hygiene",
        "defecation",
    },

    "healthcare": {
        "hospital",
        "doctor",
        "doctors",
        "medicine",
        "medicines",
        "medical",
        "health",
        "clinic",
        "patient",
        "treatment",
        "ambulance",
    },

    "education": {
        "school",
        "student",
        "students",
        "teacher",
        "teachers",
        "classroom",
        "education",
        "college",
        "learning",
    },

    "agriculture": {
        "crop",
        "crops",
        "farmer",
        "farmers",
        "farming",
        "field",
        "fields",
        "irrigation",
        "harvest",
        "pesticide",
        "soil",
    },

    "environment": {
        "pollution",
        "polluted",
        "pollutant",
        "smoke",
        "emission",
        "emissions",
        "factory",
        "industrial",
        "lake",
        "river",
        "ecosystem",
        "air",
    },

    "livelihood": {
        "employment",
        "job",
        "jobs",
        "income",
        "livelihood",
        "livelihoods",
        "worker",
        "workers",
        "migration",
        "work",
    },

    "accessibility": {
        "wheelchair",
        "disabled",
        "disability",
        "accessible",
        "accessibility",
        "ramp",
        "ramps",
        "blind",
        "visually",
        "hearing",
        "sign",
        "mobility",
    },

    "urban": {
        "road",
        "roads",
        "pothole",
        "potholes",
        "street",
        "streetlight",
        "streetlights",
        "traffic",
        "sidewalk",
        "footpath",
        "urban",
        "city",
    },

    "government": {
        "government",
        "certificate",
        "certificates",
        "application",
        "applications",
        "service",
        "services",
        "office",
        "public",
        "official",
        "processing",
    },
}


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def _normalize_text(text: str) -> str:
    """
    Normalize text for lightweight keyword/issue matching.
    """

    if not text:
        return ""

    text = text.lower()

    # Keep alphabetic characters and spaces.
    text = re.sub(r"[^a-z\s]", " ", text)

    # Collapse repeated whitespace.
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def _tokenize(text: str) -> set[str]:
    """
    Convert text into a set of normalized tokens.
    """

    return set(_normalize_text(text).split())


# ============================================================
# HAVERSINE DISTANCE
# ============================================================

def haversine_distance(
    latitude_a: float,
    longitude_a: float,
    latitude_b: float,
    longitude_b: float,
) -> float:
    """
    Calculate geographic distance between two coordinates.

    Returns:
        Distance in kilometres.
    """

    earth_radius_km = 6371.0

    lat1 = radians(latitude_a)
    lat2 = radians(latitude_b)

    delta_lat = radians(latitude_b - latitude_a)
    delta_lon = radians(longitude_b - longitude_a)

    a = (
        sin(delta_lat / 2) ** 2
        +
        cos(lat1)
        * cos(lat2)
        * sin(delta_lon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius_km * c


# ============================================================
# CATEGORY COMPATIBILITY
# ============================================================

def _categories_compatible(
    category_a: str | None,
    category_b: str | None,
) -> bool:
    """
    Determine whether two categories are compatible.

    Exact match -> compatible.

    Otherwise check whether one category belongs to the
    compatibility group of the other.
    """

    if not category_a or not category_b:
        # Missing category should not automatically reject
        # an otherwise strong semantic match.
        return True

    if category_a == category_b:
        return True

    compatible_a = CATEGORY_GROUPS.get(category_a, {category_a})
    compatible_b = CATEGORY_GROUPS.get(category_b, {category_b})

    return (
        category_b in compatible_a
        or category_a in compatible_b
    )


# ============================================================
# ISSUE OVERLAP
# ============================================================

def _extract_issue_groups(text: str) -> set[str]:
    """
    Determine which broad issue groups are present in text.

    Example:

        "broken drinking water pump"

    might produce:

        {"water"}
    """

    tokens = _tokenize(text)

    matched_groups = set()

    for group, keywords in ISSUE_KEYWORDS.items():

        if tokens.intersection(keywords):
            matched_groups.add(group)

    return matched_groups


def _issue_overlap(
    text_a: str,
    text_b: str,
) -> tuple[float, set[str], set[str]]:
    """
    Calculate overlap between issue groups.

    Returns:
        overlap score,
        groups in A,
        groups in B
    """

    groups_a = _extract_issue_groups(text_a)
    groups_b = _extract_issue_groups(text_b)

    if not groups_a or not groups_b:
        return 0.0, groups_a, groups_b

    intersection = groups_a.intersection(groups_b)
    union = groups_a.union(groups_b)

    score = len(intersection) / len(union)

    return score, groups_a, groups_b


# ============================================================
# DUPLICATE RELATIONSHIP CLASSIFICATION
# ============================================================

def classify_relationship(
    similarity: float,
    distance_km: float | None = None,
    category_a: str | None = None,
    category_b: str | None = None,
    issue_overlap: float = 0.0,
) -> dict:
    """
    Classify the relationship between two problems.

    Possible results:

        DUPLICATE
        RELATED
        UNRELATED

    The classification uses:

        1. Semantic similarity
        2. Geographic distance
        3. Category compatibility
        4. Issue overlap
    """

    category_compatible = _categories_compatible(
        category_a,
        category_b,
    )

    nearby = (
        distance_km is None
        or distance_km <= DEFAULT_DISTANCE_KM
    )

    very_close = (
        distance_km is None
        or distance_km <= VERY_CLOSE_DISTANCE_KM
    )

    reasons = []

    # --------------------------------------------------------
    # UNRELATED
    # --------------------------------------------------------

    # Extremely low semantic similarity is strong evidence that
    # the problems are unrelated.
    if similarity < SEMANTIC_UNRELATED_THRESHOLD:

        reasons.append("Very low semantic similarity")

        return {
            "relationship": "UNRELATED",
            "confidence": round(
                max(0.0, 1.0 - similarity),
                4,
            ),
            "reasons": reasons,
        }

    # --------------------------------------------------------
    # DUPLICATE
    # --------------------------------------------------------

    duplicate = False

    # Case 1:
    # Very high semantic similarity + nearby location.
    if (
        similarity >= 0.80
        and nearby
        and category_compatible
    ):
        duplicate = True
        reasons.append("Very high semantic similarity")

    # Case 2:
    # Good similarity + very close location + matching issue.
    elif (
        similarity >= 0.55
        and very_close
        and category_compatible
        and issue_overlap >= 0.50
    ):
        duplicate = True
        reasons.append("Strong issue similarity")

    # Case 3:
    # Similarity around the calibrated 0.65 region +
    # geographic proximity + category compatibility.
    elif (
        similarity >= SEMANTIC_DUPLICATE_THRESHOLD
        and nearby
        and category_compatible
    ):
        duplicate = True
        reasons.append("Semantic similarity above calibrated threshold")

    if duplicate:

        if very_close:
            reasons.append("Very close geographic location")

        elif nearby:
            reasons.append("Nearby geographic location")

        if category_a and category_b:

            if category_a == category_b:
                reasons.append("Same category")

            elif category_compatible:
                reasons.append("Compatible categories")

        if issue_overlap >= 0.50:
            reasons.append("Same issue group")

        # Confidence is intentionally conservative.
        confidence = 0.60

        if similarity >= 0.80:
            confidence += 0.15

        if similarity >= 0.90:
            confidence += 0.10

        if very_close:
            confidence += 0.05

        if issue_overlap >= 0.50:
            confidence += 0.05

        confidence = min(0.99, confidence)

        return {
            "relationship": "DUPLICATE",
            "confidence": round(confidence, 4),
            "reasons": reasons,
        }

    # --------------------------------------------------------
    # RELATED
    # --------------------------------------------------------

    # At this point the problems aren't strong enough to call
    # duplicates, but they still have meaningful semantic
    # similarity.
    if similarity >= SEMANTIC_UNRELATED_THRESHOLD:

        reasons.append("Problems have semantic similarity")

        if nearby:
            reasons.append("Problems are geographically nearby")

        if category_a and category_b:

            if category_a == category_b:
                reasons.append("Same category")

            elif category_compatible:
                reasons.append("Related categories")

            else:
                reasons.append("Different categories")

        if issue_overlap > 0:
            reasons.append("Some issue overlap")

        # Related confidence roughly follows semantic similarity.
        confidence = min(
            0.89,
            max(
                0.40,
                similarity + 0.10,
            ),
        )

        return {
            "relationship": "RELATED",
            "confidence": round(confidence, 4),
            "reasons": reasons,
        }

    # --------------------------------------------------------
    # FALLBACK
    # --------------------------------------------------------

    return {
        "relationship": "UNRELATED",
        "confidence": round(
            max(0.0, 1.0 - similarity),
            4,
        ),
        "reasons": ["Insufficient similarity"],
    }


# ============================================================
# MAIN COMPARISON FUNCTION
# ============================================================

def compare_problems(
    title_a: str,
    description_a: str,
    title_b: str,
    description_b: str,
    latitude_a: float | None = None,
    longitude_a: float | None = None,
    latitude_b: float | None = None,
    longitude_b: float | None = None,
    category_a: str | None = None,
    category_b: str | None = None,
) -> dict:
    """
    Compare two problem statements.

    Returns semantic similarity, geographic distance,
    issue overlap and relationship classification.
    """

    text_a = f"{title_a}. {description_a}"
    text_b = f"{title_b}. {description_b}"

    # --------------------------------------------------------
    # Semantic similarity
    # --------------------------------------------------------

    embedding_a = generate_embedding(text_a)
    embedding_b = generate_embedding(text_b)

    similarity = cosine_similarity(
        embedding_a,
        embedding_b,
    )

    # --------------------------------------------------------
    # Geographic distance
    # --------------------------------------------------------

    distance_km = None

    coordinates_available = all(
        value is not None
        for value in [
            latitude_a,
            longitude_a,
            latitude_b,
            longitude_b,
        ]
    )

    if coordinates_available:

        distance_km = haversine_distance(
            latitude_a,
            longitude_a,
            latitude_b,
            longitude_b,
        )

    # --------------------------------------------------------
    # Issue overlap
    # --------------------------------------------------------

    overlap, issues_a, issues_b = _issue_overlap(
        text_a,
        text_b,
    )

    # --------------------------------------------------------
    # Relationship
    # --------------------------------------------------------

    relationship = classify_relationship(
        similarity=similarity,
        distance_km=distance_km,
        category_a=category_a,
        category_b=category_b,
        issue_overlap=overlap,
    )

    return {
        "similarity": round(similarity, 4),
        "distance_km": (
            round(distance_km, 2)
            if distance_km is not None
            else None
        ),

        "issue_overlap": round(overlap, 4),

        "issues_a": sorted(issues_a),
        "issues_b": sorted(issues_b),

        "relationship": relationship["relationship"],
        "confidence": relationship["confidence"],
        "reasons": relationship["reasons"],
    }


# ============================================================
# BACKWARD COMPATIBILITY
# ============================================================

def is_duplicate(
    similarity: float,
    distance_km: float | None,
    similarity_threshold: float = SEMANTIC_DUPLICATE_THRESHOLD,
    distance_threshold_km: float = DEFAULT_DISTANCE_KM,
) -> bool:
    """
    Backward-compatible boolean duplicate check.

    This is intentionally simpler than classify_relationship().

    Existing code that calls:

        is_duplicate(similarity, distance_km)

    will continue to work.

    For new code, prefer classify_relationship() or
    compare_problems().
    """

    if similarity < similarity_threshold:
        return False

    if distance_km is None:
        return True

    return distance_km <= distance_threshold_km