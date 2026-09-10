import math
import re


# ============================================================
# KEYWORDS
# ============================================================

SEVERITY_KEYWORDS = {
    "death": 40,
    "dying": 40,
    "fatal": 40,

    "emergency": 32,
    "critical": 32,

    "outbreak": 30,
    "starvation": 30,

    "collapse": 28,
    "danger": 25,
    "dangerous": 25,

    "unsafe": 22,
    "contaminated": 22,

    "flood": 20,
    "flooding": 20,

    "shortage": 15,
    "failure": 12,
}


VULNERABILITY_KEYWORDS = {
    "children": 20,
    "child": 20,

    "elderly": 18,

    "pregnant": 20,
    "pregnancy": 20,

    "infants": 20,
    "infant": 20,

    "disabled": 20,
    "disability": 20,

    "remote": 10,
    "rural": 8,

    "poor": 8,
    "village": 5,
}


# ============================================================
# HELPERS
# ============================================================

def _contains_keyword(
    text: str,
    keyword: str,
) -> bool:

    return keyword.lower() in text.lower()


def _calculate_reach_score(
    citizens_affected: int,
) -> int:
    """
    Convert affected population into a 0-30 score.

    Logarithmic scaling prevents large populations from
    automatically making every problem critical.
    """

    citizens = max(
        1,
        citizens_affected,
    )

    # Rough scale:
    #
    # 1 person       -> ~0
    # 10 people      -> ~10
    # 100 people     -> ~20
    # 1000 people    -> ~30
    #
    score = 10 * math.log10(citizens)

    return min(
        30,
        round(score),
    )


def _calculate_severity_score(
    text: str,
):
    score = 0
    reasons = []

    for keyword, points in SEVERITY_KEYWORDS.items():

        if _contains_keyword(
            text,
            keyword,
        ):
            score += points
            reasons.append(keyword)

    # Cap severity at 40.
    score = min(
        40,
        score,
    )

    return score, reasons


def _calculate_vulnerability_score(
    text: str,
):
    score = 0
    reasons = []

    for keyword, points in VULNERABILITY_KEYWORDS.items():

        if _contains_keyword(
            text,
            keyword,
        ):
            score += points
            reasons.append(keyword)

    # Cap vulnerability at 20.
    score = min(
        20,
        score,
    )

    return score, reasons


# ============================================================
# MAIN
# ============================================================

def calculate_priority(
    title: str,
    description: str,
    citizens_affected: int = 1,
) -> dict:

    text = (
        f"{title}. {description}"
    ).lower()

    severity_score, severity_reasons = (
        _calculate_severity_score(text)
    )

    vulnerability_score, vulnerability_reasons = (
        _calculate_vulnerability_score(text)
    )

    reach_score = _calculate_reach_score(
        citizens_affected
    )

    # --------------------------------------------------------
    # Total = 100 maximum
    #
    # Severity       = 40
    # Reach          = 30
    # Vulnerability  = 20
    # Base/urgency   = 10
    # --------------------------------------------------------

    base_score = 10

    score = (
        base_score
        + severity_score
        + vulnerability_score
        + reach_score
    )

    score = max(
        0,
        min(
            100,
            round(score),
        ),
    )

    # --------------------------------------------------------
    # Labels
    # --------------------------------------------------------

    if score >= 80:
        label = "critical"

    elif score >= 60:
        label = "high"

    elif score >= 40:
        label = "medium"

    else:
        label = "low"

    return {
        "score": score,

        "label": label,

        "reasons": {
            "severity": severity_reasons,
            "vulnerability": vulnerability_reasons,
            "citizens_affected": citizens_affected,
        },

        "components": {
            "base": base_score,
            "severity": severity_score,
            "reach": reach_score,
            "vulnerability": vulnerability_score,
        },
    }