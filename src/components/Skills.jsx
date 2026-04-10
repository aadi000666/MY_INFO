import { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolioData";

const CATEGORIES = ["All", "Frontend", "Backend", "AI", "Tools"];

export default function Skills() {
  const [active,  setActive]  = useState("All");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = portfolioData.skills.filter(
    s => active === "All" || s.category === active
  );

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="section-inner">
        {/* Heading */}
        <div className="section-header">
          <p className="section-eyebrow">What I Know</p>
          <h2 className="section-title">
            My <span className="glow-text">Skills</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Category filter */}
        <div className="skill-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
              data-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{ animationDelay: `${i * 0.06}s` }}
              data-hover
            >
              <div className="skill-top">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 0.06 + 0.2}s`,
                    background: skill.level > 76
                      ? "linear-gradient(90deg,#00c8ff,#34d399)"
                      : skill.level > 60
                      ? "linear-gradient(90deg,#a78bfa,#00c8ff)"
                      : "linear-gradient(90deg,#ff6b9d,#a78bfa)",
                  }}
                />
              </div>
              <span className="skill-category-tag">{skill.category}</span>
            </div>
          ))}
        </div>

        {/* Tech stack icon row */}
        <div className="tech-row">
          {["⚛️ React","🐍 Python","🤖 AI/ML","🗄️ MongoDB","⚡ FastAPI","🎨 CSS","🔧 Git","🖥️ Node.js"].map((t, i) => (
            <div key={i} className="tech-pill" style={{ animationDelay: `${i * 0.08}s` }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}