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
  const [isVisible, setIsVisible] = useState(true);
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

  // Animation loop
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

      // Update position directly for smooth movement on MacBook
      // ALWAYS update position regardless of isVisible state
      setPosition({ x: e.clientX, y: e.clientY });

      // Create trail particles only if visible
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
      const isClickable = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable")
      );

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
      // Keep cursor visible on all devices
    };

    // Set initial position to center of screen
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    document.addEventListener("mousemove", updateCursor, { passive: true });
    document.addEventListener("mouseover", updateCursorType, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    // Additional event listeners for better cross-device compatibility
    document.addEventListener(
      "touchstart",
      () => {
        setIsVisible(true);
        hasMovedRef.current = true;
      },
      { passive: true }
    );

    // Ensure cursor is visible after a short delay
    const fallbackTimer = setTimeout(() => {
      if (!hasMovedRef.current) {
        setIsVisible(true);
        hasMovedRef.current = true;
      }
    }, 100);

    // Additional MacBook-specific cursor visibility fix
    if (navigator.userAgent.toLowerCase().includes("mac")) {
      const macBookTimer = setTimeout(() => {
        setIsVisible(true);
        hasMovedRef.current = true;
        // Force cursor to center if it's not positioned
        if (position.x === 0 && position.y === 0) {
          setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        }
      }, 50);

      return () => {
        document.removeEventListener("mousemove", updateCursor);
        document.removeEventListener("mouseover", updateCursorType);
        document.removeEventListener("mouseenter", handleMouseEnter);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("touchstart", () => {});
        clearTimeout(fallbackTimer);
        clearTimeout(macBookTimer);
      };
    }

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", () => {});
      clearTimeout(fallbackTimer);
    };
  }, [createParticle, isVisible]);

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

  // Preload cursor image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
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
        setIsVisible(true);
        // Force initial position on MacBook to ensure cursor appears
        setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };

    detectDevice();

    // Re-detect on resize
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // Calculate cursor position with proper offset
  const getCursorTransform = () => {
    const offsetX = imageLoaded ? 32 : 10; // Center the cursor properly
    const offsetY = imageLoaded ? 32 : 10;

    return `translate(${position.x - offsetX}px, ${position.y - offsetY}px)`;
  };

  const getCursorScale = () => {
    return isPointer ? "scale(1.2)" : "scale(1)";
  };

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
          // Remove transition for immediate response on MacBook
          transform: `${getCursorTransform()} ${getCursorScale()}`,
          // Use will-change for better performance on MacBook
          willChange: "transform",
        }}
      />
    </>
  );
}
