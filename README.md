# Car Price Predictor

A full-stack machine learning application that estimates the market
price of a used car from its specifications.

The project covers the complete pipeline: data cleaning and analysis,
feature engineering, model training, REST API, web interface, and cloud
deployment.

## Live Demo

**Frontend:** https://car-price-predictor-ebon.vercel.app/

**API:** https://car-price-predictor-e2qh.onrender.com

**API Docs:** https://car-price-predictor-e2qh.onrender.com/docs

## Features

-   Used-car price prediction with CatBoost
-   762k+ real used-car listings
-   Interactive React interface
-   Manufacturer, model, year and mileage inputs
-   Advanced vehicle specifications
-   Example vehicles for quick testing
-   REST API with FastAPI
-   Production deployment on Vercel and Render

## Machine Learning

The model was trained on the [Used Cars
Dataset](https://www.kaggle.com/datasets/andreinovikov/used-cars-dataset),
containing 762,091 used-car listings collected from cars.com.

### Model

-   **Algorithm:** CatBoost Regressor
-   **Task:** Regression
-   **Target:** Vehicle price
-   **R²:** 0.9022
-   **MAE:** \~\$3,204
-   **RMSE:** \~\$6,903

The data was cleaned by removing invalid prices, extreme price outliers
and duplicate records. MPG values were also converted into a numerical
feature.

The most important features in the final model included manufacturer,
mileage, engine, MPG, model and year.

## Tech Stack

### Machine Learning

-   Python
-   Pandas
-   NumPy
-   CatBoost
-   Scikit-learn
-   Jupyter Notebook
-   Matplotlib
-   Seaborn

### Backend

-   FastAPI
-   Pydantic
-   Uvicorn
-   Pandas
-   CatBoost

### Frontend

-   React
-   Vite
-   JavaScript
-   CSS

### Deployment

-   GitHub
-   Vercel
-   Render

## Architecture

``` text
Used Cars Dataset
       ↓
Data Cleaning & EDA
       ↓
Feature Engineering
       ↓
CatBoost Regressor
       ↓
Saved .cbm Model
       ↓
FastAPI REST API
       ↓
React + Vite Frontend
       ↓
Vercel + Render
```

## Project Structure

``` text
car-price-predictor/
├── backend/
├── data/
├── frontend/
├── model/
├── notebooks/
├── .gitignore
└── README.md
```

## Run Locally

``` bash
git clone https://github.com/olegicks/car-price-predictor.git
cd car-price-predictor

python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload

cd frontend
npm install
npm run dev
```

The frontend runs on Vite's local development server and communicates
with the FastAPI prediction API.

## Repository

[GitHub](https://github.com/olegicks/car-price-predictor)