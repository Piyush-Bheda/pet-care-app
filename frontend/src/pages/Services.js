import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
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
        const res = await API.get("/services");
        if (!cancelled) setServices(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!cancelled) handleRequestError(err, "Failed to load services.");
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
      <h2>Services</h2>

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
      ) : services.length ? (
        <div style={{ display: "grid", gap: 12 }}>
          {services.map((s) => (
            <div
              key={s._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 14
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                  <div style={{ color: "#4b5563", marginTop: 4 }}>{s.description}</div>
                </div>
                <div style={{ fontWeight: 700 }}>₹{s.price}</div>
              </div>
              <div style={{ marginTop: 10 }}>
                <button onClick={() => navigate(`/book/${s._id}`)}>Book</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
}

