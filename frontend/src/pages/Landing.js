import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ background: "#ffffff" }}>
      <main>
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroInner}>
              <div style={styles.badge}>All-in-one pet care</div>
              <h1 style={styles.h1}>Smart Pet Care, Simplified</h1>
              <p style={styles.subhead}>
                Track your pet’s health, manage daily care, and book services — all in one place.
              </p>
              <div style={styles.heroActions}>
                <Link to="/register" style={styles.primaryBtn}>
                  Get Started
                </Link>
                <Link to="/login" style={styles.secondaryBtn}>
                  Login
                </Link>
              </div>
              <div style={styles.heroMeta}>
                Built for pet owners who want clarity, consistency, and peace of mind.
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.h2}>What you can do</h2>
            <p style={styles.lead}>Everything you need to manage pets today, and plan for tomorrow.</p>

            <div style={styles.grid2x2}>
              <div style={styles.card}>
                <div style={styles.cardIcon}>🐾</div>
                <div style={styles.cardTitle}>Pet Management</div>
                <div style={styles.cardText}>Add pets and keep key details in one place.</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardIcon}>📝</div>
                <div style={styles.cardTitle}>Activity Tracking</div>
                <div style={styles.cardText}>Log feeding, exercise, medication, and grooming.</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardIcon}>⏰</div>
                <div style={styles.cardTitle}>Smart Reminders</div>
                <div style={styles.cardText}>Never miss feeding times or vet visits again.</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardIcon}>📅</div>
                <div style={styles.cardTitle}>Service Booking</div>
                <div style={styles.cardText}>Book grooming, vet consultations, and training fast.</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ ...styles.section, background: "#f8fafc" }}>
          <div style={styles.container}>
            <h2 style={styles.h2}>How it works</h2>
            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNum}>1</div>
                <div>
                  <div style={styles.stepTitle}>Add your pet</div>
                  <div style={styles.stepText}>Start by creating your pet profile.</div>
                </div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNum}>2</div>
                <div>
                  <div style={styles.stepTitle}>Track daily activities</div>
                  <div style={styles.stepText}>Keep a simple, trusted history of care.</div>
                </div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNum}>3</div>
                <div>
                  <div style={styles.stepTitle}>Get reminders</div>
                  <div style={styles.stepText}>Stay on schedule with upcoming tasks.</div>
                </div>
              </div>
              <div style={styles.step}>
                <div style={styles.stepNum}>4</div>
                <div>
                  <div style={styles.stepTitle}>Book services</div>
                  <div style={styles.stepText}>Reserve a service in a couple of clicks.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.h2}>Why you’ll love it</h2>
            <div style={styles.bullets}>
              <div style={styles.bullet}>Never miss feeding or vet visits</div>
              <div style={styles.bullet}>Maintain a complete pet history you can trust</div>
              <div style={styles.bullet}>Keep pet care organized with less stress</div>
              <div style={styles.bullet}>Save time with simple booking and clear timelines</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={styles.cta}>
          <div style={styles.container}>
            <div style={styles.ctaInner}>
              <div>
                <div style={styles.ctaTitle}>Start managing your pet today</div>
                <div style={styles.ctaText}>Create an account and keep every day of care on track.</div>
              </div>
              <Link to="/register" style={styles.primaryBtn}>
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerRow}>
            <div style={{ fontWeight: 800 }}>PetCare</div>
            <div style={styles.footerMeta}>
              © {new Date().getFullYear()} • Built by your team
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 16px"
  },
  hero: {
    padding: "64px 0 56px",
    background: "linear-gradient(135deg, rgba(102,126,234,0.12) 0%, rgba(118,75,162,0.12) 100%)"
  },
  heroInner: {
    textAlign: "center",
    maxWidth: 780,
    margin: "0 auto"
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(118,75,162,0.25)",
    background: "rgba(255,255,255,0.7)",
    color: "#4c1d95",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 0.3,
    marginBottom: 14
  },
  h1: {
    fontSize: 44,
    lineHeight: 1.1,
    letterSpacing: -0.6,
    margin: "0 0 12px",
    color: "#0f172a"
  },
  subhead: {
    margin: "0 auto",
    fontSize: 18,
    lineHeight: 1.6,
    color: "#334155",
    maxWidth: 680
  },
  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 18
  },
  primaryBtn: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 10,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700
  },
  secondaryBtn: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 10,
    background: "#ffffff",
    color: "#4c1d95",
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid rgba(118,75,162,0.25)"
  },
  heroMeta: {
    marginTop: 14,
    color: "#64748b",
    fontSize: 13
  },
  section: {
    padding: "44px 0"
  },
  h2: {
    margin: 0,
    fontSize: 28,
    letterSpacing: -0.3,
    color: "#0f172a"
  },
  lead: {
    margin: "10px 0 18px",
    color: "#475569"
  },
  grid2x2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12
  },
  card: {
    border: "1px solid #e5e7eb",
    background: "#fff",
    borderRadius: 14,
    padding: 14
  },
  cardIcon: {
    fontSize: 22
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: 800,
    color: "#0f172a"
  },
  cardText: {
    marginTop: 6,
    color: "#475569"
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
    marginTop: 16
  },
  step: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 14,
    background: "#fff"
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 999,
    background: "rgba(102,126,234,0.15)",
    color: "#4338ca",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto"
  },
  stepTitle: {
    fontWeight: 800,
    color: "#0f172a"
  },
  stepText: {
    marginTop: 4,
    color: "#475569"
  },
  bullets: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
    marginTop: 16
  },
  bullet: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 14,
    background: "#fff",
    color: "#0f172a",
    fontWeight: 600
  },
  cta: {
    padding: "44px 0",
    background: "linear-gradient(135deg, rgba(102,126,234,0.14) 0%, rgba(118,75,162,0.14) 100%)"
  },
  ctaInner: {
    border: "1px solid rgba(118,75,162,0.22)",
    background: "rgba(255,255,255,0.75)",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: "wrap"
  },
  ctaTitle: {
    fontWeight: 900,
    fontSize: 18,
    color: "#0f172a"
  },
  ctaText: {
    marginTop: 4,
    color: "#475569"
  },
  footer: {
    padding: "18px 0",
    borderTop: "1px solid #e5e7eb",
    background: "#fff"
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center"
  },
  footerMeta: {
    color: "#64748b",
    fontSize: 13
  }
};

