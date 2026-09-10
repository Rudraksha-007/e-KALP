from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes import auth
from database import Base, engine

from models.ai_test import AIProblemTest
from routes.ai_test import router as ai_test_router
from routes.problems import router as problems_router  # ← ADD


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="e-KALP", lifespan=lifespan)
app.include_router(auth.router)
app.include_router(ai_test_router)
app.include_router(problems_router)


@app.get("/")
def health_check():
    return {"status": "healthy"}
