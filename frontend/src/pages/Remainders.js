// src/pages/Reminders.js
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Reminders() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    petId: "",
    type: "",
    dateTime: ""
  });

  const missingFields = useMemo(() => {
    const missing = [];
    if (!form.petId) missing.push("pet");
    if (!form.type) missing.push("type");
    if (!form.dateTime) missing.push("date/time");
    return missing;
  }, [form]);

  const handleRequestError = (err) => {
    const status = err?.response?.status;
    const message =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Request failed";

    if (status === 401) {
      setError("Session expired. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    setError(message);
  };

  const loadPets = async () => {
    try {
      const res = await API.get("/pets");
      setPets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      handleRequestError(err);
    }
  };

  const loadReminders = async () => {
    try {
      const res = await API.get("/reminders");
      setReminders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      handleRequestError(err);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setError("");
      setLoading(true);
      try {
        await Promise.all([loadPets(), loadReminders()]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const addReminder = async () => {
    if (missingFields.length) {
      setError(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    try {
      setError("");
      await API.post("/reminders", form);
      setForm({ petId: "", type: "", dateTime: "" });
      await loadReminders();
    } catch (err) {
      handleRequestError(err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Reminders</h2>

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

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <select
          value={form.petId}
          onChange={(e) => setForm({ ...form, petId: e.target.value })}
        >
          <option value="">Select Pet</option>
          {pets.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          value={form.type}
          placeholder="Type (feeding/vet)"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <input
          value={form.dateTime}
          type="datetime-local"
          onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
        />

        <button onClick={addReminder} disabled={loading}>
          Add Reminder
        </button>
      </div>

      <h3>All Reminders</h3>
      {loading ? (
        <p>Loading…</p>
      ) : reminders.length ? (
        reminders.map((r) => (
          <div key={r._id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <p style={{ margin: 0 }}>
              {(r.petId && typeof r.petId === "object" ? r.petId.name : r.petId) || "Unknown pet"}{" "}
              - {r.type} - {r.status || "pending"}
            </p>
          </div>
        ))
      ) : (
        <p>No reminders yet.</p>
      )}
    </div>
  );
}