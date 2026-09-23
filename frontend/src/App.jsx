import { useState } from "react";
import "./App.css";
import manufacturers from "./manufacturers.json";

const initialData = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2020,
  mileage: 45000,
  engine: "2.5L I4",
  fuel_type: "Gasoline",
  transmission: "Automatic",
  drivetrain: "FWD",
  accidents_or_damage: 0,
  one_owner: 1,
  personal_use_only: 1,
  seller_rating: 4.8,
  driver_rating: 4.7,
  driver_reviews_num: 100,
  mpg_avg: 30,
};

const examples = [
  {
    name: "Toyota Camry",
    data: {
      ...initialData,
      manufacturer: "Toyota",
      model: "Camry",
      year: 2020,
      mileage: 45000,
    },
  },
  {
    name: "Honda Civic",
    data: {
      ...initialData,
      manufacturer: "Honda",
      model: "Civic",
      year: 2020,
      mileage: 42000,
      engine: "2.0L I4",
    },
  },
  {
    name: "Ford F-150",
    data: {
      ...initialData,
      manufacturer: "Ford",
      model: "F-150",
      year: 2019,
      mileage: 68000,
      engine: "5.0L V8",
    },
  },
  {
    name: "BMW 3 Series",
    data: {
      ...initialData,
      manufacturer: "BMW",
      model: "3 Series",
      year: 2021,
      mileage: 32000,
      engine: "2.0L I4",
    },
  },
  {
    name: "Toyota Corolla",
    data: {
      ...initialData,
      manufacturer: "Toyota",
      model: "Corolla",
      year: 2021,
      mileage: 38000,
      engine: "1.8L I4",
    },
  },
];

function App() {
  const [form, setForm] = useState(initialData);
  const [advanced, setAdvanced] = useState(false);
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

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPrice(data.predicted_price);
    } catch {
      alert("Could not connect to the prediction API.");
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
        <h2>Vehicle information</h2>

        <div className="grid">
          <label>
            Manufacturer
            <select
              value={form.manufacturer}
              onChange={(e) => update("manufacturer", e.target.value)}
            >
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer}>{manufacturer}</option>
              ))}
            </select>
          </label>

          <label>
            Model
            <input
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder="e.g. Camry"
            />
          </label>

          <label>
            Year
            <input
              type="number"
              min="1900"
              max="2026"
              value={form.year}
              onChange={(e) => update("year", Number(e.target.value))}
            />
          </label>

          <label className="full">
            Mileage: <strong>{form.mileage.toLocaleString()} miles</strong>
            <input
              type="range"
              min="0"
              max="300000"
              step="1000"
              value={form.mileage}
              onChange={(e) => update("mileage", Number(e.target.value))}
            />
          </label>
        </div>

        <button
          className="advanced-btn"
          onClick={() => setAdvanced(!advanced)}
        >
          {advanced ? "− Hide advanced options" : "+ Advanced options"}
        </button>

        {advanced && (
          <div className="grid advanced">
            <label>
              Engine
              <input
                value={form.engine}
                onChange={(e) => update("engine", e.target.value)}
                placeholder="e.g. 2.5L I4"
              />
            </label>

            <label>
              Fuel type
              <select
                value={form.fuel_type}
                onChange={(e) => update("fuel_type", e.target.value)}
              >
                <option>Gasoline</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
                <option>Flex Fuel</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Transmission
              <select
                value={form.transmission}
                onChange={(e) => update("transmission", e.target.value)}
              >
                <option>Automatic</option>
                <option>Manual</option>
                <option>CVT</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Drivetrain
              <select
                value={form.drivetrain}
                onChange={(e) => update("drivetrain", e.target.value)}
              >
                <option>FWD</option>
                <option>RWD</option>
                <option>AWD</option>
                <option>4WD</option>
              </select>
            </label>

            <label>
              Accidents / damage
              <select
                value={form.accidents_or_damage}
                onChange={(e) =>
                  update("accidents_or_damage", Number(e.target.value))
                }
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>

            <label>
              One owner
              <select
                value={form.one_owner}
                onChange={(e) =>
                  update("one_owner", Number(e.target.value))
                }
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              Personal use only
              <select
                value={form.personal_use_only}
                onChange={(e) =>
                  update("personal_use_only", Number(e.target.value))
                }
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              MPG
              <input
                type="number"
                value={form.mpg_avg}
                onChange={(e) =>
                  update("mpg_avg", Number(e.target.value))
                }
              />
            </label>
          </div>
        )}

        <button onClick={predict} disabled={loading}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {price !== null && (
          <div className="result">
            <span>Estimated market price</span>
            <strong>
              ${price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
        )}
      </section>

      <section className="examples">
        <h2>Try an example</h2>
        <p>Select a vehicle to quickly test the model.</p>

        <div className="example-list">
          {examples.map((example) => (
            <button
              key={example.name}
              className="example"
              onClick={() => {
                setForm(example.data);
                setPrice(null);
              }}
            >
              {example.name}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;