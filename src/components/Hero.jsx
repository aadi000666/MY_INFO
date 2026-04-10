import { useState, useEffect, useRef, useCallback } from "react";
import { portfolioData } from "../data/portfolioData";

/* ── Typewriter ── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText]       = useState("");
  const [idx,  setIdx]        = useState(0);
  const [del,  setDel]        = useState(false);
  useEffect(() => {
    const cur = words[idx % words.length];
    const t = del
      ? setTimeout(() => { setText(s => s.slice(0,-1)); if(text.length<=1){setDel(false);setIdx(i=>i+1);} }, speed/2)
      : setTimeout(() => { setText(cur.slice(0,text.length+1)); if(text===cur) setTimeout(()=>setDel(true),pause); }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words, speed, pause]);
  return text;
}

/* ── Count-up ── */
function useCountUp(target, dur=1600, run=false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const num = parseInt(target);
    if (isNaN(num)) { setVal(target); return; }
    let cur = 0;
    const step = num / (dur / 16);
    const t = setInterval(() => { cur = Math.min(cur+step, num); setVal(Math.floor(cur)); if(cur>=num) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [target, dur, run]);
  return val;
}

/* ── Ripple button ── */
function RippleButton({ className, onClick, children, style }) {
  const ref = useRef(null);
  const handleClick = (e) => {
    const btn  = ref.current;
    const rect = btn.getBoundingClientRect();
    const r    = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    r.className = "ripple";
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
    onClick?.();
  };
  return <button ref={ref} className={className} style={style} onClick={handleClick} data-hover>{children}</button>;
}

/* ── Stat card ── */
function StatCard({ value, label, visible }) {
  const num    = parseInt(value);
  const suffix = value.replace(/[0-9]/g,"");
  const counted= useCountUp(num, 1600, visible);
  return (
    <div className="stat-card" data-hover>
      <div className="stat-value">{isNaN(num)?value:`${counted}${suffix}`}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const typed    = useTypewriter(portfolioData.typewriterWords);
  const [vis, setVis] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVis(true);obs.disconnect();} }, {threshold:.2});
    if(statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section id="home" className="hero-section">
      {/* Glowing orbs */}
      <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"rgba(0,210,255,.06)",filter:"blur(110px)",top:-150,left:-200,pointerEvents:"none",animation:"orbPulse 7s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:450,height:450,borderRadius:"50%",background:"rgba(155,109,255,.06)",filter:"blur(100px)",bottom:-80,right:-100,pointerEvents:"none",animation:"orbPulse 9s ease-in-out infinite 3s"}}/>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot"/>
          Available for opportunities
        </div>

        {/* Name with glitch */}
        <h1 className="hero-name">
          <span className="name-hi">Hi, I'm</span>
          <br/>
          {portfolioData.name.split(" ").map((word,i) => (
            <span key={i} className="name-word" style={{animationDelay:`${.2+i*.12}s`}}>
              <span className="glitch-wrap" data-text={word}>{word}</span>{" "}
            </span>
          ))}
        </h1>

        {/* Typewriter */}
        <div className="hero-typewriter">
          <span className="type-prefix">I build </span>
          <span className="type-text">{typed}</span>
          <span className="type-cursor">|</span>
        </div>

        {/* Desc */}
        <p className="hero-desc">{portfolioData.about.split("\n")[0]}</p>

        {/* CTAs */}
        <div className="hero-btns">
          <RippleButton className="btn-primary-glow" onClick={() => scrollTo("projects")}>
            <span>View My Work</span>
            <span className="btn-arrow">→</span>
          </RippleButton>
          <RippleButton className="btn-outline-glow" onClick={() => scrollTo("contact")}>
            <span>Let's Talk</span>
          </RippleButton>
        </div>

        {/* Socials */}
        <div className="hero-socials">
          {Object.entries(portfolioData.social).map(([p,url]) => url && (
            <a key={p} href={url} target="_blank" rel="noreferrer" className="social-icon" data-hover title={p}>
              {p==="github"    && <GithubIcon/>}
              {p==="linkedin"  && <LinkedinIcon/>}
              {p==="twitter"   && <TwitterIcon/>}
              {p==="instagram" && <InstagramIcon/>}
            </a>
          ))}
        </div>
      </div>

      {/* Photo */}
      <div className="hero-photo-wrap">
        <div className="photo-bg-glow"/>
        <div className="photo-ring-outer">
          <div className="photo-ring-inner">
            {portfolioData.photo
              ? <img src={portfolioData.photo} alt={portfolioData.name} className="hero-photo"/>
              : <div className="hero-photo-placeholder"><span className="placeholder-icon">👤</span><span className="placeholder-text">Your Photo</span></div>
            }
          </div>
        </div>
        <div className="float-badge badge-tl">Python</div>
        <div className="float-badge badge-tr">React</div>
        <div className="float-badge badge-bl">AI/ML</div>
        <div className="float-badge badge-br">FastAPI</div>
      </div>

      {/* Stats */}
      <div className="hero-stats" ref={statsRef}>
        {portfolioData.stats.map((s,i) => <StatCard key={i} value={s.value} label={s.label} visible={vis}/>)}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={() => scrollTo("about")}>
        <div className="scroll-mouse"><div className="scroll-wheel"/></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}

const GithubIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.6-4.04-1.6-.54-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LinkedinIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>;
const TwitterIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.19a4.92 4.92 0 00-8.39 4.49A13.98 13.98 0 011.64 3.16a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.83 4.94 4.94 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.87 9.87 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63A10 10 0 0024 4.59l-.05-.02z"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32A6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>;