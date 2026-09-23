import { useState } from "react";
import "./App.css";
import manufacturers from "./manufacturers.json";

const examples = [
  {
    name: "Toyota Camry",
    data: {
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
    },
  },
  {
    name: "Honda Civic",
    data: {
      manufacturer: "Honda",
      model: "Civic",
      year: 2020,
      mileage: 42000,
      engine: "2.0L I4",
      fuel_type: "Gasoline",
      transmission: "Automatic",
      drivetrain: "FWD",
      accidents_or_damage: 0,
      one_owner: 1,
      personal_use_only: 1,
      seller_rating: 4.8,
      driver_rating: 4.7,
      driver_reviews_num: 100,
      mpg_avg: 33,
    },
  },
  {
    name: "Ford F-150",
    data: {
      manufacturer: "Ford",
      model: "F-150",
      year: 2019,
      mileage: 68000,
      engine: "5.0L V8",
      fuel_type: "Gasoline",
      transmission: "Automatic",
      drivetrain: "4WD",
      accidents_or_damage: 0,
      one_owner: 1,
      personal_use_only: 1,
      seller_rating: 4.7,
      driver_rating: 4.6,
      driver_reviews_num: 100,
      mpg_avg: 20,
    },
  },
  {
    name: "BMW 3 Series",
    data: {
      manufacturer: "BMW",
      model: "3 Series",
      year: 2021,
      mileage: 32000,
      engine: "2.0L I4",
      fuel_type: "Gasoline",
      transmission: "Automatic",
      drivetrain: "RWD",
      accidents_or_damage: 0,
      one_owner: 1,
      personal_use_only: 1,
      seller_rating: 4.8,
      driver_rating: 4.7,
      driver_reviews_num: 100,
      mpg_avg: 28,
    },
  },
  {
    name: "Toyota Corolla",
    data: {
      manufacturer: "Toyota",
      model: "Corolla",
      year: 2021,
      mileage: 38000,
      engine: "1.8L I4",
      fuel_type: "Gasoline",
      transmission: "CVT",
      drivetrain: "FWD",
      accidents_or_damage: 0,
      one_owner: 1,
      personal_use_only: 1,
      seller_rating: 4.8,
      driver_rating: 4.7,
      driver_reviews_num: 100,
      mpg_avg: 32,
    },
  },
];

const initialData = examples[0].data;

function App() {
  const [form, setForm] = useState(initialData);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    setPrice(null);
  };

  const selectExample = (data) => {
    setForm(data);
    setPrice(null);
  };

  const predict = async () => {
    setLoading(true);

    const payload = {
      ...form,
      engine: form.engine || null,
      fuel_type: form.fuel_type || null,
      transmission: form.transmission || null,
      drivetrain: form.drivetrain || null,
    };

    try {
      const response = await fetch(
        "https://car-price-predictor-e2qh.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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

        <div
          className="advanced"
          style={{
            marginTop: "8px",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "2px" }}>
            Advanced options
          </h3>

          <p style={{ marginTop: 0 }}>
            These fields are optional and can be set to Not specified.
          </p>

          <div className="grid">
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
                <option value="">Not specified</option>
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
                <option value="">Not specified</option>
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
                <option value="">Not specified</option>
                <option>FWD</option>
                <option>RWD</option>
                <option>AWD</option>
                <option>4WD</option>
              </select>
            </label>

            <label>
              Accidents / damage
              <select
                value={form.accidents_or_damage ?? ""}
                onChange={(e) =>
                  update(
                    "accidents_or_damage",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">Not specified</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>

            <label>
              One owner
              <select
                value={form.one_owner ?? ""}
                onChange={(e) =>
                  update(
                    "one_owner",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">Not specified</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              Personal use only
              <select
                value={form.personal_use_only ?? ""}
                onChange={(e) =>
                  update(
                    "personal_use_only",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">Not specified</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              MPG
              <input
                type="number"
                value={form.mpg_avg ?? ""}
                onChange={(e) =>
                  update(
                    "mpg_avg",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                placeholder="e.g. 30"
              />
            </label>
          </div>
        </div>

        <button type="button" onClick={predict} disabled={loading}>
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
              type="button"
              key={example.name}
              className="example"
              onClick={() => selectExample(example.data)}
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