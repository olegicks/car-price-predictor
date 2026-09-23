from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from catboost import CatBoostRegressor
import pandas as pd

app = FastAPI(title="Car Price Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "car_price_model.cbm"

model = CatBoostRegressor()
model.load_model(MODEL_PATH)


class Car(BaseModel):
    manufacturer: str
    model: str
    year: int
    mileage: float
    engine: str
    transmission: str
    drivetrain: str
    fuel_type: str
    accidents_or_damage: float | None = None
    one_owner: float | None = None
    personal_use_only: float | None = None
    seller_rating: float | None = None
    driver_rating: float | None = None
    driver_reviews_num: float = 0
    mpg_avg: float | None = None


@app.get("/")
def root():
    return {"status": "online"}


@app.post("/predict")
def predict(car: Car):
    data = pd.DataFrame([car.model_dump()])
    prediction = model.predict(data)[0]

    return {
        "predicted_price": round(float(prediction), 2)
    }