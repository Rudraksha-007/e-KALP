from fastapi import FastAPI  

app = FastAPI(
    title="e-KALP",
)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
    }