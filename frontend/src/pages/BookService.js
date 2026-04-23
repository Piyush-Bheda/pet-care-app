import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function BookService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        // minimal: fetch all services and pick one (keeps backend simple)
        const res = await API.get("/services");
        const services = Array.isArray(res.data) ? res.data : [];
        const found = services.find((s) => s._id === serviceId) || null;
        if (!cancelled) setService(found);
      } catch (err) {
        if (!cancelled) handleRequestError(err, "Failed to load service.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, serviceId]);

  const confirmBooking = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!serviceId) {
      setError("Missing service.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await API.post("/bookings", { serviceId, date, time });
      setSuccess(true);
    } catch (err) {
      handleRequestError(err, "Failed to create booking.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Book Service</h2>

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

      {success ? (
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #bbf7d0",
            background: "#f0fdf4",
            marginBottom: 12
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Booking successful</div>
          <button onClick={() => navigate("/my-bookings")}>View my bookings</button>
        </div>
      ) : null}

      {loading ? (
        <p>Loading…</p>
      ) : !service ? (
        <p>Service not found.</p>
      ) : (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 14,
            maxWidth: 520
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 16 }}>{service.name}</div>
          <div style={{ color: "#4b5563", marginTop: 4 }}>{service.description}</div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>₹{service.price}</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Optional time"
            />
            <button onClick={confirmBooking} disabled={saving || success}>
              {saving ? "Confirming..." : "Confirm booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

