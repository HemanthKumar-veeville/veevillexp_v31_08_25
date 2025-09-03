"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: "trail" | "sparkle" | "bubble";
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  // Create new particles
  const createParticle = useCallback(
    (x: number, y: number, type: Particle["type"] = "trail") => {
      const particle: Particle = {
        id: particleIdRef.current++,
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

      setParticles((prev) => [...prev, particle]);
    },
    []
  );

  // Update particles animation
  const updateParticles = useCallback(() => {
    setParticles((prev) =>
      prev
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
        }))
        .filter((particle) => particle.life > 0)
    );
  }, []);

  // Render particles on canvas
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render particles
    particles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;

      if (particle.type === "sparkle") {
        // Draw sparkle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add cross lines for sparkle effect
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size, particle.y);
        ctx.lineTo(particle.x + particle.size, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size);
        ctx.lineTo(particle.x, particle.y + particle.size);
        ctx.stroke();
      } else if (particle.type === "bubble") {
        // Draw bubble
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.stroke();

        // Add highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(
          particle.x - particle.size * 0.3,
          particle.y - particle.size * 0.3,
          particle.size * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // Draw trail particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, [particles]);

  // Animation loop
  const animate = useCallback(() => {
    updateParticles();
    renderParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Create trail particles
      if (isVisible) {
        createParticle(e.clientX, e.clientY, "trail");

        // Occasionally create sparkles and bubbles
        if (Math.random() < 0.1) {
          createParticle(e.clientX, e.clientY, "sparkle");
        }
        if (Math.random() < 0.05) {
          createParticle(e.clientX, e.clientY, "bubble");
        }
      }
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable");

      setIsPointer(isClickable);

      // Create extra particles on clickable elements
      if (isClickable && isVisible) {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createParticle(e.clientX, e.clientY, "sparkle");
          }, i * 50);
        }
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", updateCursorType);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, createParticle]);

  // Start animation loop
  useEffect(() => {
    if (isVisible) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Custom cursor */}
      <div
        style={{
          width: "64px",
          height: "64px",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          backgroundImage: `url('/img/pencil_no_bg_v1.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.1s ease, opacity 0.2s ease",
          transform: isPointer
            ? `translate(${position.x - 16}px, ${position.y - 16}px) scale(1.2)`
            : `translate(${position.x - 16}px, ${position.y - 16}px)`,
        }}
      />
    </>
  );
}
