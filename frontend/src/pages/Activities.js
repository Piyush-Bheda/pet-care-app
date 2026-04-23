import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ACTIVITY_TYPES = ["feeding", "exercise", "medication", "grooming"];

export default function Activities() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [activities, setActivities] = useState([]);

  const [form, setForm] = useState({ type: "", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const loadPets = async () => {
    try {
      const res = await API.get("/pets");
      const list = Array.isArray(res.data) ? res.data : [];
      setPets(list);
      if (!selectedPetId && list.length) setSelectedPetId(list[0]._id);
    } catch (err) {
      handleRequestError(err, "Failed to load pets.");
    }
  };

  const loadActivities = async (petId) => {
    if (!petId) {
      setActivities([]);
      return;
    }
    try {
      const res = await API.get(`/activities/pet/${petId}`);
      setActivities(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      handleRequestError(err, "Failed to load activity history.");
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setError("");
      setLoading(true);
      try {
        await loadPets();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    loadActivities(selectedPetId);
  }, [selectedPetId]);

  const missing = useMemo(() => {
    const m = [];
    if (!selectedPetId) m.push("pet");
    if (!form.type) m.push("type");
    return m;
  }, [form.type, selectedPetId]);

  const addActivity = async () => {
    if (missing.length) {
      setError(`Please select: ${missing.join(", ")}`);
      return;
    }
    if (!ACTIVITY_TYPES.includes(form.type)) {
      setError(`Invalid activity type. Allowed: ${ACTIVITY_TYPES.join(", ")}`);
      return;
    }

    try {
      setSaving(true);
      setError("");
      await API.post("/activities", {
        petId: selectedPetId,
        type: form.type,
        notes: form.notes
      });
      setForm({ type: "", notes: "" });
      await loadActivities(selectedPetId);
    } catch (err) {
      handleRequestError(err, "Failed to add activity.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Activities</h2>

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
          value={selectedPetId}
          onChange={(e) => setSelectedPetId(e.target.value)}
          disabled={loading}
        >
          {pets.length ? null : <option value="">No pets found</option>}
          {pets.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={form.type}
          onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          disabled={!selectedPetId || loading}
        >
          <option value="">Select type</option>
          {ACTIVITY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          value={form.notes}
          placeholder="Notes (optional)"
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          disabled={!selectedPetId || loading}
        />

        <button onClick={addActivity} disabled={saving || loading || !selectedPetId}>
          {saving ? "Saving..." : "Add Activity"}
        </button>
      </div>

      <h3>History</h3>
      {loading ? (
        <p>Loading…</p>
      ) : !selectedPetId ? (
        <p>Select a pet to view history.</p>
      ) : activities.length ? (
        activities.map((a) => (
          <div key={a._id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <div style={{ fontWeight: 600 }}>{a.type}</div>
            <div style={{ color: "#374151" }}>{a.notes || "—"}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {a.time ? new Date(a.time).toLocaleString() : ""}
            </div>
          </div>
        ))
      ) : (
        <p>No activities yet for this pet.</p>
      )}
    </div>
  );
}

