from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes import auth
from database import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="e-KALP", lifespan=lifespan)
app.include_router(auth.router)


@app.get("/")
def health_check():
    return {"status": "healthy"}