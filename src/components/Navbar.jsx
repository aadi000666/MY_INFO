import { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

const navLinks = [
  { label: "Home",       href: "#home"     },
  { label: "About",      href: "#about"    },
  { label: "Skills",     href: "#skills"   },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact"  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState("home");
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section detect
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <a className="nav-logo" onClick={() => scrollTo("#home")}>
          <span className="logo-bracket">&lt;</span>
          {portfolioData.name.split(" ")[0]}
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                className={`nav-link ${active === link.href.slice(1) ? "active" : ""}`}
                onClick={() => scrollTo(link.href)}
                data-hover
              >
                {link.label}
                <span className="nav-underline" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          className="nav-cta"
          href={`mailto:${portfolioData.email}`}
          data-hover
        >
          Hire Me ↗
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            className="mobile-link"
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}