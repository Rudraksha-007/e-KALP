"""
Semantic categorization of citizen-reported problems.

Uses SentenceTransformer embeddings and category prototypes
instead of a supervised TF-IDF classifier.

This is better suited to short citizen complaints because
the model compares the meaning of the complaint with several
examples describing each category.
"""

from functools import lru_cache

from services.nlp.embeddings import (
    generate_embedding,
    cosine_similarity,
)

from services.nlp.category_prototypes import (
    CATEGORY_PROTOTYPES,
)


# ------------------------------------------------------------
# Configuration
# ------------------------------------------------------------

DEFAULT_TOP_K = 3

# Minimum gap between first and second category.
# Below this, we ask for human review.
DEFAULT_REVIEW_MARGIN = 0.05

# Minimum semantic similarity required before accepting
# a category as a strong match.
DEFAULT_ACCEPTANCE_THRESHOLD = 0.35


# ------------------------------------------------------------
# Pre-compute prototype embeddings
# ------------------------------------------------------------

@lru_cache(maxsize=1)
def _get_prototype_embeddings():
    """
    Generate embeddings for every category prototype.

    Cached so the embeddings are generated only once.
    """

    embeddings = {}

    for category, prototypes in CATEGORY_PROTOTYPES.items():

        embeddings[category] = [
            generate_embedding(text)
            for text in prototypes
        ]

    return embeddings


# ------------------------------------------------------------
# Category similarity
# ------------------------------------------------------------

def _category_similarity(
    problem_embedding,
    prototype_embeddings,
):
    """
    Calculate similarity between a problem and one category.

    We use the maximum similarity among that category's
    prototypes. This allows a problem to match the most
    relevant description of the category.
    """

    similarities = [
        cosine_similarity(
            problem_embedding,
            prototype_embedding,
        )
        for prototype_embedding in prototype_embeddings
    ]

    return max(similarities)


# ------------------------------------------------------------
# Main categorization function
# ------------------------------------------------------------

def categorize(
    title: str,
    description: str,
    top_k: int = DEFAULT_TOP_K,
    review_margin: float = DEFAULT_REVIEW_MARGIN,
    acceptance_threshold: float = DEFAULT_ACCEPTANCE_THRESHOLD,
) -> dict:
    """
    Categorize a citizen-reported problem.

    Returns:
        {
            "primary_category": "...",
            "categories": [
                {
                    "category": "...",
                    "score": ...
                }
            ],
            "needs_review": bool,
            "margin": ...
        }
    """

    text = f"{title}. {description}"

    # Generate embedding for the submitted problem.
    problem_embedding = generate_embedding(text)

    # Load cached category embeddings.
    prototype_embeddings = _get_prototype_embeddings()

    scores = []

    for category, embeddings in prototype_embeddings.items():

        similarity = _category_similarity(
            problem_embedding,
            embeddings,
        )

        scores.append({
            "category": category,
            "score": similarity,
        })

    # Highest similarity first.
    scores.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    top_k = max(
        1,
        min(top_k, len(scores)),
    )

    top_categories = scores[:top_k]

    primary = top_categories[0]

    if len(top_categories) >= 2:

        margin = (
            top_categories[0]["score"]
            - top_categories[1]["score"]
        )

    else:
        margin = top_categories[0]["score"]

    # Human review if:
    # 1. best category isn't semantically strong enough
    # OR
    # 2. top two categories are too close.
    needs_review = (
        primary["score"] < acceptance_threshold
        or margin < review_margin
    )

    return {
        "primary_category": primary["category"],

        "categories": [
            {
                "category": item["category"],
                "score": round(
                    item["score"],
                    4,
                ),
            }
            for item in top_categories
        ],

        "needs_review": needs_review,

        "margin": round(
            margin,
            4,
        ),
    }


# ------------------------------------------------------------
# Convenience function
# ------------------------------------------------------------

def primary_category(
    title: str,
    description: str,
) -> str:

    result = categorize(
        title=title,
        description=description,
        top_k=1,
    )

    return result["primary_category"]