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
  const [isVisible, setIsVisible] = useState(true); // Start as visible by default
  const [isMacOS, setIsMacOS] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use refs instead of state for particles to prevent infinite re-renders
  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);
  const hasMovedRef = useRef(false);

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

      // Add to ref instead of state
      particlesRef.current.push(particle);
    },
    []
  );

  // Update particles animation
  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.02,
        vx: particle.vx * 0.98,
        vy: particle.vy * 0.98,
      }))
      .filter((particle) => particle.life > 0);
  }, []);

  // Render particles on canvas
  const renderParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render particles from ref
    particlesRef.current.forEach((particle) => {
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
  }, []);

  // Animation loop - now stable without dependencies that change
  const animate = useCallback(() => {
    updateParticles();
    renderParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // Set initial position if this is the first movement
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsVisible(true);
      }

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

    const handleMouseEnter = () => {
      setIsVisible(true);
      hasMovedRef.current = true;
    };

    const handleMouseLeave = () => {
      // Don't hide cursor on mouse leave, just keep it visible
      // This ensures it stays visible on all devices
    };

    // Set initial position to center of screen
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", updateCursorType);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Additional event listeners for better cross-device compatibility
    document.addEventListener("touchstart", () => {
      setIsVisible(true);
      hasMovedRef.current = true;
    });

    // Ensure cursor is visible after a short delay (fallback for devices with delayed events)
    const fallbackTimer = setTimeout(() => {
      if (!hasMovedRef.current) {
        setIsVisible(true);
        hasMovedRef.current = true;
      }
    }, 100);

    // Additional fallback for MacBooks and devices with delayed mouse events
    const macBookFallbackTimer = setTimeout(() => {
      if (isMacOS && !hasMovedRef.current) {
        setIsVisible(true);
        hasMovedRef.current = true;
      }
    }, 200);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", () => {});
      clearTimeout(fallbackTimer);
      clearTimeout(macBookFallbackTimer);
    };
  }, [createParticle, isMacOS]);

  // Start animation loop - now stable
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

  // Preload cursor image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Fallback to default cursor
    img.src = "/img/pencil_no_bg_v1.png";
  }, []);

  // Detect device type and OS
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMac = /macintosh|mac os x/i.test(userAgent);
      const isHighDPI = window.devicePixelRatio > 1;

      setIsMacOS(isMac);

      // Force cursor visibility on MacBooks and high-DPI displays
      if (isMac || isHighDPI) {
        hasMovedRef.current = true;
        // Use a callback to avoid dependency issues
        setIsVisible((prev) => {
          if (!prev) return true;
          return prev;
        });
      }
    };

    detectDevice();

    // Re-detect on resize (for device orientation changes)
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
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
        className="custom-cursor"
        style={{
          width: imageLoaded ? "64px" : "20px",
          height: imageLoaded ? "64px" : "20px",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          backgroundImage: imageLoaded
            ? `url('/img/pencil_no_bg_v1.png')`
            : "none",
          backgroundColor: imageLoaded ? "transparent" : "#FFD700",
          borderRadius: imageLoaded ? "0" : "50%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.1s ease, opacity 0.2s ease",
          transform: isPointer
            ? `translate(${position.x - (imageLoaded ? 16 : 10)}px, ${
                position.y - (imageLoaded ? 16 : 10)
              }px) scale(1.2)`
            : `translate(${position.x - (imageLoaded ? 16 : 10)}px, ${
                position.y - (imageLoaded ? 16 : 10)
              }px)`,
        }}
      />
    </>
  );
}
