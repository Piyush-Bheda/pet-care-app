import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
        const res = await API.get("/bookings");
        if (!cancelled) setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!cancelled) handleRequestError(err, "Failed to load bookings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Bookings</h2>

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

      {loading ? (
        <p>Loading…</p>
      ) : bookings.length ? (
        <div style={{ display: "grid", gap: 10 }}>
          {bookings.map((b) => (
            <div
              key={b._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 14
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontWeight: 800 }}>{b.serviceId?.name || "Service"}</div>
                <div
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 999,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb"
                  }}
                >
                  {b.status || "booked"}
                </div>
              </div>
              <div style={{ color: "#4b5563", marginTop: 4 }}>
                {b.date ? new Date(b.date).toLocaleString() : ""}
              </div>
              {typeof b.serviceId?.price === "number" ? (
                <div style={{ marginTop: 6, fontWeight: 700 }}>₹{b.serviceId.price}</div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}

