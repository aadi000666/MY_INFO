import { useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";

// ── ABOUT ────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner about-inner">

        {/* Left — text */}
        <div className="about-text">
          <div className="section-header" style={{ textAlign: "left" }}>
            <p className="section-eyebrow">Who Am I</p>
            <h2 className="section-title">
              About <span className="glow-text">Me</span>
            </h2>
            <div className="section-line" style={{ margin: "16px 0 0" }} />
          </div>

          <p className="about-desc">{portfolioData.about}</p>

          {/* Education */}
          <div className="timeline">
            <h3 className="timeline-heading">🎓 Education</h3>
            {portfolioData.education.map((edu, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-period">{edu.period}</span>
                  <h4 className="timeline-title">{edu.degree}</h4>
                  <p className="timeline-sub">{edu.school}</p>
                  {edu.grade && <span className="timeline-grade">{edu.grade}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          {portfolioData.experience?.length > 0 && (
            <div className="timeline">
              <h3 className="timeline-heading">💼 Experience</h3>
              {portfolioData.experience.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" style={{ background: "#ff6b9d" }} />
                  <div className="timeline-content">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-title">{exp.role}</h4>
                    <p className="timeline-sub">{exp.company}</p>
                    <p className="timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Download CV */}
          <a className="btn-primary-glow" href="#" data-hover
             style={{ display: "inline-flex", marginTop: "32px" }}>
            Download CV ↓
          </a>
        </div>

        {/* Right — info cards */}
        <div className="about-cards">
          <div className="info-card" data-hover>
            <span className="info-icon">📍</span>
            <div>
              <p className="info-label">Location</p>
              <p className="info-value">{portfolioData.location}</p>
            </div>
          </div>
          <div className="info-card" data-hover>
            <span className="info-icon">📧</span>
            <div>
              <p className="info-label">Email</p>
              <p className="info-value">{portfolioData.email}</p>
            </div>
          </div>
          <div className="info-card" data-hover>
            <span className="info-icon">📱</span>
            <div>
              <p className="info-label">Phone</p>
              <p className="info-value">{portfolioData.phone}</p>
            </div>
          </div>
          <div className="info-card" data-hover>
            <span className="info-icon">🎓</span>
            <div>
              <p className="info-label">Degree</p>
              <p className="info-value">{portfolioData.education[0]?.degree}</p>
            </div>
          </div>

          {/* Big stat card */}
          <div className="big-stat-card">
            <div className="big-stat-grid">
              {portfolioData.stats.map((s, i) => (
                <div key={i} className="mini-stat">
                  <div className="mini-stat-val">{s.value}</div>
                  <div className="mini-stat-lab">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────
export function Contact() {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [status,  setStatus]  = useState(null);  // null | "sending" | "sent" | "error"

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // Wire up to EmailJS / Formspree / your backend
    // For now — mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${portfolioData.email}?subject=${subject}&body=${body}`);
    setStatus("sent");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="glow-text">Connect</span>
          </h2>
          <div className="section-line" />
          <p className="section-sub">
            Have a project in mind? Want to collaborate? I'm all ears.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Left — info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Reach me at</h3>
            {[
              { icon: "📧", label: "Email",    val: portfolioData.email    },
              { icon: "📱", label: "Phone",    val: portfolioData.phone    },
              { icon: "📍", label: "Location", val: portfolioData.location },
            ].map(item => (
              <div key={item.label} className="contact-item" data-hover>
                <span className="contact-item-icon">{item.icon}</span>
                <div>
                  <p className="contact-item-label">{item.label}</p>
                  <p className="contact-item-val">{item.val}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="contact-socials">
              {Object.entries(portfolioData.social).map(([platform, url]) =>
                url && (
                  <a key={platform} href={url} target="_blank" rel="noreferrer"
                     className="contact-social-btn" data-hover>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                       placeholder="Write Your Name Please" required />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input name="email" type="email" value={form.email}
                       onChange={handleChange} placeholder="name@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Hey, I'd love to collaborate on..." rows={5} required />
            </div>
            <button type="submit" className="btn-primary-glow form-submit" data-hover
                    disabled={status === "sending"}>
              {status === "sent"    ? "Message Sent! ✓"  :
               status === "sending" ? "Sending..."        : "Send Message →"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Designed & Built by <span className="glow-text">{portfolioData.name}</span></p>
        <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </section>
  );
}