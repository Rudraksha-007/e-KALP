from services.nlp.categorization import categorize


title = "Broken handpump in village"

description = """
Residents have not had access to clean drinking water
for several weeks because the village handpump is broken.
"""

result = categorize(
    title=title,
    description=description,
    top_k=3,
)

print("\nRESULT:")
print(result)

print("\nType:")
print(type(result))