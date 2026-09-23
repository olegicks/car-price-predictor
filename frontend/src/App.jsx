import { useState } from "react";
import "./App.css";

const initialData = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2020,
  mileage: 45000,
  engine: "2.5L I4",
  transmission: "Automatic",
  drivetrain: "FWD",
  fuel_type: "Gasoline",
  accidents_or_damage: 0,
  one_owner: 1,
  personal_use_only: 1,
  seller_rating: 4.8,
  driver_rating: 4.7,
  driver_reviews_num: 100,
  mpg_avg: 30,
};

function App() {
  const [form, setForm] = useState(initialData);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const predict = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setPrice(data.predicted_price);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <p>CAR PRICE PREDICTOR</p>
        <h1>What is your car worth?</h1>
        <span>Machine learning powered used-car price estimation.</span>
      </section>

      <section className="card">
        <div className="grid">
          {Object.entries(form).map(([key, value]) => (
            <label key={key}>
              {key.replaceAll("_", " ")}
              <input
                type={typeof value === "number" ? "number" : "text"}
                step="any"
                value={value}
                onChange={(e) =>
                  update(
                    key,
                    typeof value === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              />
            </label>
          ))}
        </div>

        <button onClick={predict} disabled={loading}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {price !== null && (
          <div className="result">
            <span>Estimated market price</span>
            <strong>${price.toLocaleString()}</strong>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;