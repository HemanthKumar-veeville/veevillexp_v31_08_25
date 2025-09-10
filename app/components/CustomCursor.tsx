"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ParticleType = "trail" | "sparkle" | "bubble";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
  maxLife: number; // lifespan scale
  size: number;
  color: string;
  type: ParticleType;
}

const CURSOR_IMG = "/img/pencil_no_bg_v1.png";
const MAX_PARTICLES = 600;
const LIFE_STEP = 0.02;
const DPR_MAX = 2;

export default function CustomCursor() {
  // visibility is still stateful (for quick show/hide), but position updates are imperative
  const [visible, setVisible] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgLoadedRef = useRef(false);
  const overClickableRef = useRef(false);

  const posRef = useRef({ x: 0, y: 0 });
  const rafCursorRef = useRef<number | undefined>(undefined);
  const rafAnimRef = useRef<number | undefined>(undefined);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef = useRef(1);

  const particlesRef = useRef<Particle[]>([]);
  const pidRef = useRef(0);

  // Toggle html.has-custom-cursor (only on fine pointers & if motion allowed)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const mqPointer = window.matchMedia("(pointer: fine)");
      const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const enable = mqPointer.matches && !mqMotion.matches;
      document.documentElement.classList.toggle("has-custom-cursor", enable);
    };

    update();

    // Use window resize as a fallback to detect changes
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // Canvas sizing with DPR scaling
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
    dprRef.current = dpr;

    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
  }, []);

  // Imperative cursor transform updater (no React re-render needed)
  const updateCursorVisual = useCallback((x: number, y: number) => {
    const el = cursorRef.current;
    if (!el) return;

    // Custom offsets for x and y to position click point at pencil tip
    const xOffset = imgLoadedRef.current ? 18 : 10; // half of width
    const yOffset = imgLoadedRef.current ? 10 : 10; // Increased y-offset to move click point to pencil tip
    const scale = overClickableRef.current ? 1.2 : 1;

    el.style.transform = `translate3d(${x - xOffset}px, ${
      y - yOffset
    }px, 0) scale(${scale})`;
  }, []);

  // Particle creation (keeps original feel)
  const createParticle = useCallback(
    (x: number, y: number, type: ParticleType = "trail") => {
      const p: Particle = {
        id: pidRef.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: type === "trail" ? 0.6 : type === "sparkle" ? 1 : 0.8,
        size:
          type === "trail"
            ? Math.random() * 3 + 1
            : type === "sparkle"
            ? Math.random() * 2 + 1
            : Math.random() * 4 + 2,
        color:
          type === "trail"
            ? "#FFD700"
            : type === "sparkle"
            ? "#FF69B4"
            : "#87CEEB",
        type,
      };

      const arr = particlesRef.current;
      arr.push(p);
      if (arr.length > MAX_PARTICLES) arr.splice(0, arr.length - MAX_PARTICLES);
    },
    []
  );

  const updateParticles = useCallback(() => {
    const arr = particlesRef.current;
    for (let i = arr.length - 1; i >= 0; i--) {
      const p = arr[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.life -= LIFE_STEP;
      if (p.life <= 0) arr.splice(i, 1);
    }
  }, []);

  const renderParticles = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(
      0,
      0,
      canvas.width / dprRef.current,
      canvas.height / dprRef.current
    );

    const arr = particlesRef.current;
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const alpha = Math.max(0, Math.min(1, p.life / p.maxLife)); // clamp

      ctx.save();
      ctx.globalAlpha = alpha;

      if (p.type === "sparkle") {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - p.size, p.y);
        ctx.lineTo(p.x + p.size, p.y);
        ctx.moveTo(p.x, p.y - p.size);
        ctx.lineTo(p.x, p.y + p.size);
        ctx.stroke();
      } else if (p.type === "bubble") {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(
          p.x - p.size * 0.3,
          p.y - p.size * 0.3,
          p.size * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }, []);

  const animate = useCallback(() => {
    updateParticles();
    renderParticles();
    rafAnimRef.current = requestAnimationFrame(animate);
  }, [renderParticles, updateParticles]);

  // Pointer movement (unified + imperative updates)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPointerMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y, pointerType } = e;
      posRef.current = { x, y };

      // Only show cursor if not over a clickable element
      if (!overClickableRef.current) {
        setVisible(true);
      }

      // Imperative transform update (no re-render)
      if (rafCursorRef.current) cancelAnimationFrame(rafCursorRef.current);
      rafCursorRef.current = requestAnimationFrame(() => {
        if (!overClickableRef.current) {
          updateCursorVisual(x, y);
        }

        // Particles: keep creating on all pointers (mouse/touch), like your original
        createParticle(x, y, "trail");
        if (pointerType !== "touch") {
          if (Math.random() < 0.1) createParticle(x, y, "sparkle");
          if (Math.random() < 0.05) createParticle(x, y, "bubble");
        }
      });
    };

    const onPointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const clickable = !!(
        el?.tagName.toLowerCase() === "button" ||
        el?.tagName.toLowerCase() === "a" ||
        el?.tagName.toLowerCase() === "input" ||
        el?.tagName.toLowerCase() === "textarea" ||
        el?.closest("button") ||
        el?.closest("a") ||
        el?.closest("input") ||
        el?.closest("textarea") ||
        el?.getAttribute("role") === "button" ||
        el?.getAttribute("role") === "textbox" ||
        el?.classList.contains("clickable")
      );
      overClickableRef.current = clickable;

      // Hide cursor and create sparkles when over clickable elements
      const { clientX: x, clientY: y } = e;
      if (clickable) {
        setVisible(false);
        for (let i = 0; i < 3; i++) {
          setTimeout(() => createParticle(x, y, "sparkle"), i * 50);
        }
      } else {
        setVisible(true);
        updateCursorVisual(x, y);
      }
    };

    const onPointerDown = () => setVisible(true);
    const onPointerLeave = () => {
      // hide visual but keep particles animating
      setVisible(false);
    };
    const onPointerEnter = (e: PointerEvent) => {
      setVisible(true);
      updateCursorVisual(e.clientX, e.clientY);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave as any, {
      passive: true,
    });
    document.addEventListener("pointerenter", onPointerEnter as any, {
      passive: true,
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    rafAnimRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", onPointerMove as any);
      document.removeEventListener("pointerover", onPointerOver as any);
      document.removeEventListener("pointerdown", onPointerDown as any);
      document.removeEventListener("pointerleave", onPointerLeave as any);
      document.removeEventListener("pointerenter", onPointerEnter as any);
      window.removeEventListener("resize", resizeCanvas);
      if (rafCursorRef.current) cancelAnimationFrame(rafCursorRef.current);
      if (rafAnimRef.current) cancelAnimationFrame(rafAnimRef.current);
    };
  }, [animate, createParticle, resizeCanvas, updateCursorVisual]);

  // Preload cursor image (keep ref in sync)
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgLoadedRef.current = true;
      setImgLoaded(true);
    };
    img.onerror = () => {
      imgLoadedRef.current = false;
      setImgLoaded(false);
    };
    img.src = CURSOR_IMG;
  }, []);

  // Opacity controlled via state and html.has-custom-cursor (CSS); keep element always mounted
  const showVisual =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("has-custom-cursor") &&
    visible;

  return (
    <>
      {/* Particle canvas always mounted (so touch also gets particles) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Custom cursor (visual hidden on coarse pointers via CSS) */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        aria-hidden
        style={{
          width: imgLoaded ? "64px" : "20px",
          height: imgLoaded ? "64px" : "20px",
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 9999,
          backgroundImage: imgLoaded ? `url('${CURSOR_IMG}')` : "none",
          backgroundColor: imgLoaded ? "transparent" : "#FFD700",
          borderRadius: imgLoaded ? "0" : "50%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: showVisual ? 1 : 0, // CSS media queries will also guard this
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translate3d(-9999px,-9999px,0)", // off-screen until first move
        }}
      />
    </>
  );
}
