import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const EQUIPMENT_API_URL = "/api/equipment";
const ADD_ESTIMATE_API_URL = "/api/estimates";

const AddEstimate = () => {
  interface Equipment {
    id: number;
    name: string;
    price: number;
  }

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<number[]>([]);
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch available equipment options
    const fetchEquipments = async () => {
      try {
        const response = await fetch(EQUIPMENT_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch equipment.");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchEquipments();
  }, []);

  const handleEquipmentChange = (equipmentId: number) => {
    if (selectedEquipments.includes(equipmentId)) {
      setSelectedEquipments(
        selectedEquipments.filter((id) => id !== equipmentId)
      );
    } else {
      setSelectedEquipments([...selectedEquipments, equipmentId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedEquipments.length === 0) {
      setError("You must select at least one piece of equipment.");
      return;
    }

    const newEstimate = {
      note,
      equipments: selectedEquipments, // The selected equipment IDs
      created_by: 1, // This should be the logged-in user’s ID in a real app
    };

    try {
      const response = await fetch(ADD_ESTIMATE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEstimate),
      });

      if (!response.ok) {
        throw new Error("Failed to add estimate.");
      }

      alert("Estimate added successfully!");
      setNote("");
      setSelectedEquipments([]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Add a New Estimate</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>
            Note:
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </label>
        </div>

        <h3>Select Equipment</h3>
        <ul>
          {equipments.map((equipment) => (
            <li key={equipment.id}>
              <label>
                <input
                  type="checkbox"
                  value={equipment.id}
                  checked={selectedEquipments.includes(equipment.id)}
                  onChange={() => handleEquipmentChange(equipment.id)}
                />
                {equipment.name} - ${equipment.price}
              </label>
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit}>Submit Estimate</button>
      </div>
    </div>
  );
};

export default AddEstimate;
