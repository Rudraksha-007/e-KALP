from services.nlp.categorization import categorize
from services.nlp.deduplication import compare_problems, is_duplicate
from services.nlp.prioritization import calculate_priority


# ============================================================
# 5 SAMPLE PROBLEMS
# ============================================================

problems = [
    {
        "id": "P1",
        "title": "Village handpump is broken",
        "description": (
            "The main handpump in the village has been broken for "
            "several weeks. Residents do not have reliable access "
            "to clean drinking water."
        ),
        "latitude": 23.3441,
        "longitude": 85.3096,
        "citizens_affected": 500,
    },

    {
        "id": "P2",
        "title": "No drinking water due to failed water pump",
        "description": (
            "People in the village are facing a shortage of clean "
            "drinking water because the public water pump near the "
            "school is not working."
        ),
        "latitude": 23.3460,
        "longitude": 85.3110,
        "citizens_affected": 450,
    },

    {
        "id": "P3",
        "title": "Government school has damaged toilets",
        "description": (
            "The primary school has broken and unusable toilets. "
            "Children are forced to use open areas, creating serious "
            "sanitation and hygiene concerns."
        ),
        "latitude": 23.3445,
        "longitude": 85.3100,
        "citizens_affected": 180,
    },

    {
        "id": "P4",
        "title": "Hospital has shortage of emergency medicines",
        "description": (
            "The local government hospital is facing a critical "
            "shortage of emergency medicines. Patients and elderly "
            "people are at risk because essential medicines are "
            "unavailable."
        ),
        "latitude": 23.3600,
        "longitude": 85.3200,
        "citizens_affected": 1200,
    },

    {
        "id": "P5",
        "title": "Flooding has damaged village roads",
        "description": (
            "Heavy flood water has damaged the main roads connecting "
            "the village to nearby towns. Residents are facing unsafe "
            "travel and difficulty accessing essential services."
        ),
        "latitude": 23.5000,
        "longitude": 85.5000,
        "citizens_affected": 3000,
    },
]


# ============================================================
# SETTINGS
# ============================================================

# Use the same threshold as your current deduplication service.
SIMILARITY_THRESHOLD = 0.85
DISTANCE_THRESHOLD_KM = 5.0


# ============================================================
# CATEGORY
# ============================================================

def run_categorization():
    print("\n")
    print("=" * 80)
    print("CATEGORIZATION")
    print("=" * 80)

    results = {}

    for problem in problems:

        result = categorize(
            title=problem["title"],
            description=problem["description"],
            top_k=3,
        )

        results[problem["id"]] = result

        print(f"\n{problem['id']}: {problem['title']}")
        print("-" * 60)

        print(
            f"Primary category : "
            f"{result['primary_category']}"
        )

        print(
            f"Needs review     : "
            f"{result['needs_review']}"
        )

        print(
            f"Margin           : "
            f"{result['margin']:.4f}"
        )

        print("Top categories:")

        for category in result["categories"]:
            print(
                f"  {category['category']:<30}"
                f"{category['score']:.4f}"
            )

    return results


# ============================================================
# PRIORITIZATION
# ============================================================

def run_prioritization():
    print("\n")
    print("=" * 80)
    print("PRIORITIZATION")
    print("=" * 80)

    results = {}

    for problem in problems:

        result = calculate_priority(
            title=problem["title"],
            description=problem["description"],
            citizens_affected=problem["citizens_affected"],
        )

        results[problem["id"]] = result

        print(f"\n{problem['id']}: {problem['title']}")
        print("-" * 60)

        print(f"Priority score : {result['score']}/100")
        print(f"Priority label : {result['label']}")

        print(
            f"Citizens      : "
            f"{result['reasons']['citizens_affected']}"
        )

        print(
            f"Severity      : "
            f"{result['reasons']['severity']}"
        )

        print(
            f"Vulnerability : "
            f"{result['reasons']['vulnerability']}"
        )

    return results


# ============================================================
# DEDUPLICATION
# ============================================================

def run_deduplication():
    print("\n")
    print("=" * 80)
    print("PAIRWISE DEDUPLICATION")
    print("=" * 80)

    duplicate_pairs = []

    for i in range(len(problems)):

        for j in range(i + 1, len(problems)):

            a = problems[i]
            b = problems[j]

            comparison = compare_problems(
                title_a=a["title"],
                description_a=a["description"],
                title_b=b["title"],
                description_b=b["description"],
                latitude_a=a["latitude"],
                longitude_a=a["longitude"],
                latitude_b=b["latitude"],
                longitude_b=b["longitude"],
            )

            duplicate = is_duplicate(
                similarity=comparison["similarity"],
                distance_km=comparison["distance_km"],
                similarity_threshold=SIMILARITY_THRESHOLD,
                distance_threshold_km=DISTANCE_THRESHOLD_KM,
            )

            print(
                f"\n{a['id']} <-> {b['id']}"
            )

            print(
                f"Similarity : "
                f"{comparison['similarity']:.4f}"
            )

            print(
                f"Distance   : "
                f"{comparison['distance_km']} km"
            )

            print(
                f"Duplicate  : "
                f"{'YES' if duplicate else 'NO'}"
            )

            if duplicate:
                duplicate_pairs.append(
                    (a["id"], b["id"])
                )

    return duplicate_pairs


# ============================================================
# GROUPING
# ============================================================

def build_groups(duplicate_pairs):
    """
    Build groups from duplicate pairs.

    Example:

        P1-P2
        P2-P3

    becomes:

        Group 1 = P1, P2, P3
    """

    groups = []

    for a, b in duplicate_pairs:

        group_found = None

        for group in groups:

            if a in group or b in group:
                group.add(a)
                group.add(b)
                group_found = group
                break

        if group_found is None:
            groups.append({a, b})

    # Problems that aren't duplicates get their own group.
    grouped_ids = set()

    for group in groups:
        grouped_ids.update(group)

    for problem in problems:

        if problem["id"] not in grouped_ids:
            groups.append({problem["id"]})

    return groups


def run_grouping(duplicate_pairs):
    print("\n")
    print("=" * 80)
    print("PROBLEM GROUPS")
    print("=" * 80)

    groups = build_groups(duplicate_pairs)

    for index, group in enumerate(groups, start=1):

        print(f"\nGROUP {index}")
        print("-" * 60)

        for problem_id in sorted(group):

            problem = next(
                p for p in problems
                if p["id"] == problem_id
            )

            print(
                f"{problem_id}: "
                f"{problem['title']}"
            )

    return groups


# ============================================================
# FINAL DASHBOARD
# ============================================================

def print_final_dashboard(
    categorization_results,
    priority_results,
    groups,
):
    print("\n")
    print("=" * 80)
    print("FINAL NLP DASHBOARD")
    print("=" * 80)

    print()

    print(
        f"{'ID':<5}"
        f"{'CATEGORY':<28}"
        f"{'PRIORITY':<12}"
        f"{'SCORE':<8}"
        f"{'REVIEW':<8}"
        f"GROUP"
    )

    print("-" * 80)

    for index, problem in enumerate(problems):

        problem_id = problem["id"]

        category = categorization_results[
            problem_id
        ]

        priority = priority_results[
            problem_id
        ]

        group_number = None

        for group_index, group in enumerate(groups, start=1):

            if problem_id in group:
                group_number = group_index
                break

        print(
            f"{problem_id:<5}"
            f"{category['primary_category']:<28}"
            f"{priority['label']:<12}"
            f"{priority['score']:<8}"
            f"{str(category['needs_review']):<8}"
            f"{group_number}"
        )


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print("\n")
    print("#" * 80)
    print("# SOCIAL PROBLEM NLP PIPELINE TEST")
    print("#" * 80)

    # 1. Categorization
    categorization_results = run_categorization()

    # 2. Prioritization
    priority_results = run_prioritization()

    # 3. Pairwise deduplication
    duplicate_pairs = run_deduplication()

    # 4. Group similar problems
    groups = run_grouping(duplicate_pairs)

    # 5. Final dashboard
    print_final_dashboard(
        categorization_results,
        priority_results,
        groups,
    )

    print("\n")
    print("=" * 80)
    print("TEST COMPLETE")
    print("=" * 80)