// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [reminderAlerts, setReminderAlerts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: ""
  });

  const handleRequestError = (err, fallbackMessage) => {
    const status = err?.response?.status;
    const message =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      fallbackMessage ||
      "Request failed";

    if (status === 401) {
      setError("Session expired. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    setError(message);
  };

  // Fetch pets
  const getPets = async () => {
    try {
      const res = await API.get("/pets");
      setError("");
      setPets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      handleRequestError(err, "Failed to load pets.");
    }
  };

  const getReminderAlerts = async () => {
    try {
      const res = await API.get("/reminders/alerts");
      setReminderAlerts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      // Don't hard-fail the whole dashboard if alerts fail
      handleRequestError(err, "Failed to load reminders.");
    }
  };

  const acknowledgeReminder = async (id) => {
    try {
      await API.put(`/reminders/${id}/ack`);
      setReminderAlerts((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      handleRequestError(err, "Failed to dismiss reminder.");
    }
  };

  useEffect(() => {
    getPets();
    getReminderAlerts();
  }, []);

  // Add pet
  const addPet = async () => {
    try {
      setError("");
      await API.post("/pets", form);
      setForm({ name: "", breed: "", age: "" });
      getPets();
    } catch (err) {
      handleRequestError(err, "Failed to add pet.");
    }
  };

  // Delete pet
  const deletePet = async (id) => {
    try {
      setError("");
      await API.delete(`/pets/${id}`);
      getPets();
    } catch (err) {
      handleRequestError(err, "Failed to delete pet.");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {error ? (
        <div
          style={{
            marginBottom: 12,
            padding: 10,
            background: "#fee2e2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            borderRadius: 8
          }}
        >
          {error}
        </div>
      ) : null}

      {reminderAlerts.length ? (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #fde68a",
            background: "#fffbeb"
          }}
        >
          <h3 style={{ marginTop: 0 }}>Reminders</h3>
          {reminderAlerts.map((r) => (
            <div
              key={r._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                padding: "8px 0",
                borderTop: "1px solid #fef3c7"
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  {r.type} for {r.petId?.name || "your pet"}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  Due: {r.dateTime ? new Date(r.dateTime).toLocaleString() : "unknown"}
                </div>
              </div>
              <button onClick={() => acknowledgeReminder(r._id)}>Dismiss</button>
            </div>
          ))}
        </div>
      ) : null}

      <h3>Add Pet</h3>
      <input placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Breed"
        value={form.breed}
        onChange={(e) => setForm({ ...form, breed: e.target.value })} />
      <input placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })} />

      <button onClick={addPet}>Add Pet</button>

      <h3>Your Pets</h3>
      {pets.map((pet) => (
        <div key={pet._id}>
          <p>{pet.name} - {pet.breed} - {pet.age}</p>
          <button onClick={() => deletePet(pet._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}