import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let raf, mouse = { x: -9999, y: -9999 };
    let hue = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const COLS   = ["#00d2ff","#ff4da6","#9b6dff","#00ffa3","#ffb347"];
    const COUNT  = 110;

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x     = Math.random() * canvas.width;
        this.y     = init ? Math.random() * canvas.height : canvas.height + 10;
        this.r     = Math.random() * 1.8 + 0.3;
        this.vx    = (Math.random() - 0.5) * 0.45;
        this.vy    = -(Math.random() * 0.55 + 0.18);
        this.life  = 0;
        this.max   = Math.random() * 320 + 180;
        this.color = COLS[Math.floor(Math.random() * COLS.length)];
        this.spin  = (Math.random() - 0.5) * 0.04;
        this.ang   = Math.random() * Math.PI * 2;
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          const f = (130 - d) / 130;
          this.vx += (dx / d) * f * 0.9;
          this.vy += (dy / d) * f * 0.9;
        }
        // Slight spiral
        this.ang += this.spin;
        this.vx  += Math.cos(this.ang) * 0.003;

        this.vx  *= 0.97;
        this.vy  *= 0.97;
        this.x   += this.vx;
        this.y   += this.vy;
        this.life++;
        if (this.life > this.max || this.y < -10) this.reset();
      }
      draw() {
        const alpha = Math.min(this.life / 50, 1) * Math.min((this.max - this.life) / 50, 1);
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle   = this.color;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Connection lines
    const drawConnections = (ps) => {
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx   = ps[i].x - ps[j].x;
          const dy   = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 90) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 90) * 0.12;
            ctx.strokeStyle = "#00d2ff";
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Mouse attraction particles (extra burst on move)
    const burst = [];

    const particles = Array.from({ length: COUNT }, () => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle radial gradient overlay
      const grad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 200
      );
      grad.addColorStop(0, "rgba(0,210,255,0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections(particles);

      hue++;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:.65 }}
    />
  );
}