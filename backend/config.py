"""Compatibility shim — re-exports settings so `from config import settings` works."""
from database import settings

__all__ = ["settings"]
