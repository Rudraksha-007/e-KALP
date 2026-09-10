# services/nlp/routing.py

from services.nlp.embeddings import (
    generate_embedding,
    cosine_similarity,
)


def match_entities(
    problem_text: str,
    entities: list[dict],
    top_k: int = 3,
) -> list[dict]:
    """
    Match a problem against universities/industries.

    Each entity should look like:

    {
        "id": "...",
        "name": "...",
        "expertise": [
            "water management",
            "environment"
        ]
    }
    """

    problem_embedding = generate_embedding(problem_text)

    results = []

    for entity in entities:

        expertise_text = ". ".join(
            entity.get("expertise", [])
        )

        if not expertise_text:
            continue

        expertise_embedding = generate_embedding(
            expertise_text
        )

        similarity = cosine_similarity(
            problem_embedding,
            expertise_embedding
        )

        results.append({
            "id": entity["id"],
            "name": entity["name"],
            "score": round(similarity, 4),
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results[:top_k]


def match_universities(
    title: str,
    description: str,
    universities: list[dict],
    top_k: int = 3,
) -> list[dict]:

    text = f"{title}. {description}"

    return match_entities(
        text,
        universities,
        top_k,
    )


def match_industries(
    title: str,
    description: str,
    industries: list[dict],
    top_k: int = 3,
) -> list[dict]:

    text = f"{title}. {description}"

    return match_entities(
        text,
        industries,
        top_k,
    )