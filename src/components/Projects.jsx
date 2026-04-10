import { useState } from "react";
import { portfolioData } from "../data/portfolioData";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(null);

  const displayed = showAll
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.featured);

  return (
    <section id="projects" className="section projects-section">
      <div className="section-inner">
        {/* Heading */}
        <div className="section-header">
          <p className="section-eyebrow">What I've Built</p>
          <h2 className="section-title">
            Featured <span className="glow-text">Projects</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {displayed.map((project, i) => (
            <div
              key={project.title}
              className={`project-card ${project.featured ? "featured" : ""} ${hovered === i ? "is-hovered" : ""}`}
              style={{
                "--card-color": project.color,
                animationDelay: `${i * 0.1}s`
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-hover
            >
              {/* Glow border */}
              <div className="card-glow" />

              {/* Card top */}
              <div className="card-top">
                <div className="card-icon-wrap">
                  <span className="card-icon">🚀</span>
                </div>
                <div className="card-links">
                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noreferrer"
                       className="card-link" title="GitHub" data-hover>
                      <GithubIcon />
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noreferrer"
                       className="card-link" title="Live Demo" data-hover>
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* Card content */}
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>

              {/* Tags */}
              <div className="card-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="card-tag"
                        style={{ borderColor: project.color + "44", color: project.color }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover line */}
              <div className="card-bottom-line" style={{ background: project.color }} />
            </div>
          ))}
        </div>

        {/* Show more/less */}
        {portfolioData.projects.length > portfolioData.projects.filter(p => p.featured).length && (
          <div className="projects-toggle">
            <button
              className="btn-outline-glow"
              onClick={() => setShowAll(!showAll)}
              data-hover
            >
              {showAll ? "Show Less ↑" : `Show All Projects (${portfolioData.projects.length}) ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

const GithubIcon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.6-4.04-1.6-.54-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const ExternalIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;