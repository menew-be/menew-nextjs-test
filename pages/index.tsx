import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const API_URL = "/api/estimates"; // Django API endpoint for estimates

const Home = () => {
  interface Estimate {
    id: number;
    created_by: {
      username: string;
    };
    equipments: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
    archive: boolean;
  }

  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch estimates.");
        }
        const data = await response.json();
        setEstimates(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchEstimates();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Estimates</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {estimates.map((estimate) => (
            <li key={estimate.id}>
              Estimate #{estimate.id} - Created by {estimate.created_by.username} - Archived:{" "}
              {estimate.archive ? "Yes" : "No"}
              <ul style={{ padding: "10px 50px" }}>
                {estimate.equipments.map((equipment) => (
                  <li key={equipment.id}>
                    {equipment.name} - Price: ${equipment.price} - Quantity: {equipment.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
