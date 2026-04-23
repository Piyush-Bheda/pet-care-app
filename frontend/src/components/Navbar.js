import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      {/* Brand / Logo */}
      <Link to={token ? "/dashboard" : "/login"} style={styles.brand}>
        🐾 PetCare
      </Link>

      {/* Navigation links */}
      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/services" style={styles.link}>
              Services
            </Link>
            <Link to="/my-bookings" style={styles.link}>
              My Bookings
            </Link>
            <Link to="/activities" style={styles.link}>
              Activities
            </Link>
            <Link to="/reminders" style={styles.link}>
              Reminders
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.registerBtn}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    textDecoration: "none",
    letterSpacing: "0.5px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  registerBtn: {
    padding: "8px 20px",
    background: "#fff",
    color: "#764ba2",
    borderRadius: "8px",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "14px",
    transition: "opacity 0.2s",
  },
  logoutBtn: {
    padding: "8px 20px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.5)",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },
};

export default Navbar;
