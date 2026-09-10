# services/nlp/embeddings.py

from functools import lru_cache

import numpy as np
from sentence_transformers import SentenceTransformer


MODEL_NAME = "all-MiniLM-L6-v2"


@lru_cache(maxsize=1)
def get_embedding_model() -> SentenceTransformer:
    """
    Load the embedding model once and reuse it.

    The model is cached so we don't reload it for every API request.
    """
    return SentenceTransformer(MODEL_NAME)


def generate_embedding(text: str) -> np.ndarray:
    """
    Convert text into a normalized semantic embedding.
    """
    model = get_embedding_model()

    embedding = model.encode(
        text or "",
        normalize_embeddings=True
    )

    return np.asarray(embedding, dtype=np.float32)


def cosine_similarity(
    embedding_a: np.ndarray,
    embedding_b: np.ndarray
) -> float:
    """
    Calculate cosine similarity between two normalized embeddings.
    """

    if embedding_a.size == 0 or embedding_b.size == 0:
        return 0.0

    return float(np.dot(embedding_a, embedding_b))