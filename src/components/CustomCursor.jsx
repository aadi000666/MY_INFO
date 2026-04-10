import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);
  const trail   = useRef([]);

  useEffect(() => {
    const dot     = dotRef.current;
    const ringEl  = ringRef.current;
    if (!dot || !ringEl) return;

    // Trail dots
    const TRAIL_COUNT = 8;
    const trailEls = Array.from({ length: TRAIL_COUNT }, (_, i) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;top:0;left:0;width:4px;height:4px;border-radius:50%;
        background:rgba(0,210,255,${0.35 - i * 0.04});
        pointer-events:none;z-index:9997;will-change:transform;
        transition:opacity .3s;
      `;
      document.body.appendChild(el);
      return el;
    });
    trail.current = trailEls;

    const history = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 3}px)`;
    };

    const animate = () => {
      // Smooth ring
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      ringEl.style.transform = `translate(${ring.current.x - 18}px,${ring.current.y - 18}px)`;

      // Trail
      history.unshift({ x: ring.current.x, y: ring.current.y });
      history.pop();
      trailEls.forEach((el, i) => {
        const h = history[i];
        if (h) el.style.transform = `translate(${h.x - 2}px,${h.y - 2}px) scale(${1 - i * 0.1})`;
      });

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const onEnter = () => ringEl.classList.add("hovering");
    const onLeave = () => ringEl.classList.remove("hovering");

    const update = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
      trailEls.forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}