from services.nlp.categorization import categorize
from services.nlp.prioritization import calculate_priority
from services.nlp.deduplication import compare_problems, is_duplicate


# ============================================================
# 20 TEST PROBLEMS
# Covers all 10 categories.
# expected_category is our manually defined ground truth.
# ============================================================

PROBLEMS = [
    # ---------------- WATER MANAGEMENT ----------------
    {
        "id": "P01",
        "title": "Broken village handpump",
        "description": "The public handpump in the village is broken and residents have no reliable source of drinking water.",
        "citizens_affected": 500,
        "latitude": 23.3441,
        "longitude": 85.3096,
        "expected_category": "WATER_MANAGEMENT",
    },
    {
        "id": "P02",
        "title": "Drinking water pipeline failure",
        "description": "The drinking water pipeline has stopped supplying water to several households for the past week.",
        "citizens_affected": 450,
        "latitude": 23.3460,
        "longitude": 85.3110,
        "expected_category": "WATER_MANAGEMENT",
    },

    # ---------------- HEALTHCARE ----------------
    {
        "id": "P03",
        "title": "Shortage of emergency medicines",
        "description": "The government hospital has run out of essential emergency medicines and patients are unable to receive treatment.",
        "citizens_affected": 1200,
        "latitude": 23.3600,
        "longitude": 85.3200,
        "expected_category": "HEALTHCARE",
    },
    {
        "id": "P04",
        "title": "No doctor at rural health centre",
        "description": "The rural health centre frequently operates without a doctor, forcing villagers to travel long distances for medical care.",
        "citizens_affected": 800,
        "latitude": 23.3700,
        "longitude": 85.3300,
        "expected_category": "HEALTHCARE",
    },

    # ---------------- EDUCATION ----------------
    {
        "id": "P05",
        "title": "Damaged school classrooms",
        "description": "Several classrooms in the government school have damaged roofs and students cannot safely attend classes during rain.",
        "citizens_affected": 300,
        "latitude": 23.3800,
        "longitude": 85.3400,
        "expected_category": "EDUCATION",
    },
    {
        "id": "P06",
        "title": "Lack of teachers in government school",
        "description": "The school has too few teachers for the number of students, resulting in cancelled classes and poor learning opportunities.",
        "citizens_affected": 250,
        "latitude": 23.3900,
        "longitude": 85.3500,
        "expected_category": "EDUCATION",
    },

    # ---------------- AGRICULTURE ----------------
    {
        "id": "P07",
        "title": "Crop disease affecting farmers",
        "description": "Farmers are losing large portions of their crops because a plant disease is spreading through the fields.",
        "citizens_affected": 700,
        "latitude": 23.4000,
        "longitude": 85.3600,
        "expected_category": "AGRICULTURE",
    },
    {
        "id": "P08",
        "title": "Lack of irrigation facilities",
        "description": "Farmers do not have reliable irrigation facilities and their crops are suffering during periods of low rainfall.",
        "citizens_affected": 600,
        "latitude": 23.4100,
        "longitude": 85.3700,
        "expected_category": "AGRICULTURE",
    },

    # ---------------- SANITATION ----------------
    {
        "id": "P09",
        "title": "Blocked village drainage",
        "description": "The main drainage system is blocked and dirty wastewater is accumulating near houses.",
        "citizens_affected": 350,
        "latitude": 23.4200,
        "longitude": 85.3800,
        "expected_category": "SANITATION",
    },
    {
        "id": "P10",
        "title": "Poor public toilet facilities",
        "description": "Public toilets are damaged and unhygienic, forcing residents to depend on unsafe sanitation practices.",
        "citizens_affected": 400,
        "latitude": 23.4300,
        "longitude": 85.3900,
        "expected_category": "SANITATION",
    },

    # ---------------- ENVIRONMENT ----------------
    {
        "id": "P11",
        "title": "Industrial air pollution",
        "description": "Smoke from a nearby industrial area is causing severe air pollution and reducing the quality of air in surrounding communities.",
        "citizens_affected": 2000,
        "latitude": 23.4400,
        "longitude": 85.4000,
        "expected_category": "ENVIRONMENT",
    },
    {
        "id": "P12",
        "title": "Polluted local lake",
        "description": "Waste and pollutants are being dumped into the local lake, damaging the ecosystem and affecting nearby residents.",
        "citizens_affected": 1000,
        "latitude": 23.4500,
        "longitude": 85.4100,
        "expected_category": "ENVIRONMENT",
    },

    # ---------------- RURAL LIVELIHOODS ----------------
    {
        "id": "P13",
        "title": "Lack of rural employment",
        "description": "Young people in the village have very few employment opportunities and many are forced to migrate to cities for work.",
        "citizens_affected": 900,
        "latitude": 23.4600,
        "longitude": 85.4200,
        "expected_category": "RURAL_LIVELIHOODS",
    },
    {
        "id": "P14",
        "title": "Poor livelihood opportunities",
        "description": "Local workers lack sustainable livelihood opportunities and have difficulty finding stable sources of income.",
        "citizens_affected": 500,
        "latitude": 23.4700,
        "longitude": 85.4300,
        "expected_category": "RURAL_LIVELIHOODS",
    },

    # ---------------- ACCESSIBILITY ----------------
    {
        "id": "P15",
        "title": "No wheelchair ramp at public building",
        "description": "The government office has stairs but no wheelchair ramp, preventing people with mobility disabilities from entering independently.",
        "citizens_affected": 150,
        "latitude": 23.4800,
        "longitude": 85.4400,
        "expected_category": "ACCESSIBILITY",
    },
    {
        "id": "P16",
        "title": "Lack of accessible transport",
        "description": "Public buses do not provide accessible facilities for wheelchair users and people with mobility disabilities.",
        "citizens_affected": 300,
        "latitude": 23.4900,
        "longitude": 85.4500,
        "expected_category": "ACCESSIBILITY",
    },

    # ---------------- URBAN INFRASTRUCTURE ----------------
    {
        "id": "P17",
        "title": "Damaged urban roads",
        "description": "Several roads in the city are full of potholes and damaged sections, making transportation difficult and unsafe.",
        "citizens_affected": 3000,
        "latitude": 23.5000,
        "longitude": 85.5000,
        "expected_category": "URBAN_INFRASTRUCTURE",
    },
    {
        "id": "P18",
        "title": "Broken street lights",
        "description": "Many street lights in the urban area are not working, creating unsafe conditions for pedestrians at night.",
        "citizens_affected": 1500,
        "latitude": 23.5100,
        "longitude": 85.5100,
        "expected_category": "URBAN_INFRASTRUCTURE",
    },

    # ---------------- PUBLIC SERVICE DELIVERY ----------------
    {
        "id": "P19",
        "title": "Delay in government certificates",
        "description": "Citizens are facing long delays in receiving government certificates because the local public service office is not processing applications on time.",
        "citizens_affected": 600,
        "latitude": 23.5200,
        "longitude": 85.5200,
        "expected_category": "PUBLIC_SERVICE_DELIVERY",
    },
    {
        "id": "P20",
        "title": "Poor government service access",
        "description": "Residents have difficulty accessing essential government services because applications and requests are frequently delayed.",
        "citizens_affected": 800,
        "latitude": 23.5300,
        "longitude": 85.5300,
        "expected_category": "PUBLIC_SERVICE_DELIVERY",
    },
]


# ============================================================
# 1. CATEGORY EVALUATION
# ============================================================

print("\n" + "=" * 80)
print("CATEGORY EVALUATION")
print("=" * 80)

correct = 0
review_count = 0

results = []

for problem in PROBLEMS:
    result = categorize(
        problem["title"],
        problem["description"],
        top_k=3,
    )

    predicted = result["primary_category"]
    expected = problem["expected_category"]

    is_correct = predicted == expected

    if is_correct:
        correct += 1

    if result["needs_review"]:
        review_count += 1

    results.append({
        **problem,
        "predicted_category": predicted,
        "category_score": result["categories"][0]["score"],
        "needs_review": result["needs_review"],
    })

    status = "OK" if is_correct else "WRONG"

    print(
        f'{problem["id"]} | '
        f'Expected: {expected:<25} | '
        f'Predicted: {predicted:<25} | '
        f'Score: {result["categories"][0]["score"]:.3f} | '
        f'Review: {result["needs_review"]} | '
        f'{status}'
    )


accuracy = correct / len(PROBLEMS)

print("\nCategory Accuracy:")
print(f"{correct}/{len(PROBLEMS)} = {accuracy:.2%}")

print(f"Needs manual review: {review_count}/{len(PROBLEMS)}")


# ============================================================
# 2. PRIORITY EVALUATION
# ============================================================

print("\n" + "=" * 80)
print("PRIORITY EVALUATION")
print("=" * 80)

for problem in PROBLEMS:
    priority = calculate_priority(
        problem["title"],
        problem["description"],
        problem["citizens_affected"],
    )

    print(
        f'{problem["id"]} | '
        f'{priority["score"]:>3} | '
        f'{priority["label"]:<8} | '
        f'Severity: {priority["components"]["severity"]:>2} | '
        f'Vulnerability: {priority["components"]["vulnerability"]:>2} | '
        f'Reach: {priority["components"]["reach"]:>2}'
    )


# ============================================================
# 3. PRIORITY DISTRIBUTION
# ============================================================

print("\n" + "=" * 80)
print("PRIORITY DISTRIBUTION")
print("=" * 80)

priority_distribution = {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
}

for problem in PROBLEMS:
    priority = calculate_priority(
        problem["title"],
        problem["description"],
        problem["citizens_affected"],
    )

    label = priority["label"]

    if label in priority_distribution:
        priority_distribution[label] += 1

for label, count in priority_distribution.items():
    print(f"{label.upper():<10}: {count}")


# ============================================================
# 4. DEDUPLICATION / SIMILARITY TEST
#
# We deliberately include:
#
# P01 + P02 -> likely duplicate
# P09 + P10 -> related but NOT necessarily duplicate
# P17 + P18 -> related urban infrastructure, not duplicate
# P03 + P04 -> related healthcare, not duplicate
#
# Everything else should generally be unrelated.
# ============================================================

EXPECTED_DUPLICATES = {
    ("P01", "P02"): True,

    # These are intentionally false:
    ("P03", "P04"): False,
    ("P09", "P10"): False,
    ("P17", "P18"): False,
}


print("\n" + "=" * 80)
print("DEDUPLICATION / SEMANTIC SIMILARITY")
print("=" * 80)

problem_map = {p["id"]: p for p in PROBLEMS}

pair_results = []

for i in range(len(PROBLEMS)):
    for j in range(i + 1, len(PROBLEMS)):

        a = PROBLEMS[i]
        b = PROBLEMS[j]

        result = compare_problems(
            a["title"],
            a["description"],
            b["title"],
            b["description"],
            a["latitude"],
            a["longitude"],
            b["latitude"],
            b["longitude"],
        )

        pair = (a["id"], b["id"])

        expected_duplicate = EXPECTED_DUPLICATES.get(pair)

        detected_duplicate = is_duplicate(
            result["similarity"],
            result["distance_km"],
        )

        pair_results.append({
            "pair": pair,
            "similarity": result["similarity"],
            "distance_km": result["distance_km"],
            "expected_duplicate": expected_duplicate,
            "detected_duplicate": detected_duplicate,
        })

        # Always print the intentionally labelled evaluation pairs.
        if expected_duplicate is not None:
            status = (
                "OK"
                if detected_duplicate == expected_duplicate
                else "WRONG"
            )

            print(
                f'{pair[0]} <-> {pair[1]} | '
                f'Similarity: {result["similarity"]:.4f} | '
                f'Distance: {result["distance_km"]:.2f} km | '
                f'Expected duplicate: {expected_duplicate} | '
                f'Detected: {detected_duplicate} | '
                f'{status}'
            )


# ============================================================
# 5. DEDUP THRESHOLD DIAGNOSTIC
#
# This is important because our current 0.85 threshold appears
# too strict for the MiniLM similarity values we've observed.
#
# We DON'T change the production threshold here.
# We simply see what would happen at different thresholds.
# ============================================================

print("\n" + "=" * 80)
print("DEDUPLICATION THRESHOLD DIAGNOSTIC")
print("=" * 80)

thresholds = [
    0.40,
    0.45,
    0.50,
    0.55,
    0.60,
    0.65,
    0.70,
    0.75,
    0.80,
    0.85,
]

for threshold in thresholds:

    detected = 0

    for pair_result in pair_results:

        similarity = pair_result["similarity"]
        distance = pair_result["distance_km"]

        duplicate = is_duplicate(
            similarity,
            distance,
            similarity_threshold=threshold,
        )

        if duplicate:
            detected += 1

    print(
        f"Threshold {threshold:.2f} -> "
        f"{detected} duplicate pairs detected"
    )


# ============================================================
# 6. MOST SIMILAR PAIRS
#
# This helps us see whether the embedding model is producing
# sensible similarity relationships.
# ============================================================

print("\n" + "=" * 80)
print("TOP 10 MOST SIMILAR PROBLEM PAIRS")
print("=" * 80)

sorted_pairs = sorted(
    pair_results,
    key=lambda x: x["similarity"],
    reverse=True,
)

for item in sorted_pairs[:10]:

    a, b = item["pair"]

    print(
        f'{a} <-> {b} | '
        f'Similarity: {item["similarity"]:.4f} | '
        f'Distance: {item["distance_km"]:.2f} km'
    )


# ============================================================
# 7. FINAL SUMMARY
# ============================================================

print("\n" + "=" * 80)
print("FINAL SUMMARY")
print("=" * 80)

print(f"Category accuracy : {accuracy:.2%}")
print(f"Manual review     : {review_count}/{len(PROBLEMS)}")

print("\nPriority distribution:")
for label, count in priority_distribution.items():
    print(f"  {label:<10}: {count}")

print("\nEvaluation complete.")