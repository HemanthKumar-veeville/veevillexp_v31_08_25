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
  const animationRef = useRef<number | null>(null);
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
    // Universal cursor update function that works for both mouse and touch events
    const updateCursorPosition = (
      x: number,
      y: number,
      isTouch: boolean = false
    ) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsVisible(true);
      }

      // Always update position for consistent behavior
      setPosition({ x, y });

      // Create particles if visible
      if (isVisible) {
        createParticle(x, y, "trail");
        if (!isTouch) {
          // Only create special effects for mouse movement
          if (Math.random() < 0.1) createParticle(x, y, "sparkle");
          if (Math.random() < 0.05) createParticle(x, y, "bubble");
        }
      }
    };

    // Mouse event handlers with RAF for smoother updates
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      // Use requestAnimationFrame for smoother updates, especially on MacOS
      requestAnimationFrame(() => {
        updateCursorPosition(e.clientX, e.clientY);
      });
    };

    // Touch event handlers with proper touch position calculation
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY, true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY, true);
      }
    };

    const updateCursorType = (e: MouseEvent | TouchEvent) => {
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

      if (isClickable && isVisible) {
        const x =
          e instanceof MouseEvent
            ? e.clientX
            : (e as TouchEvent).touches[0]?.clientX;
        const y =
          e instanceof MouseEvent
            ? e.clientY
            : (e as TouchEvent).touches[0]?.clientY;

        if (typeof x === "number" && typeof y === "number") {
          for (let i = 0; i < 3; i++) {
            setTimeout(() => createParticle(x, y, "sparkle"), i * 50);
          }
        }
      }
    };

    // Set initial position to center of screen
    const centerCursor = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      setPosition({ x, y });
      setIsVisible(true);
      hasMovedRef.current = true;
    };

    centerCursor();

    // Add event listeners with proper passive settings
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("mouseover", updateCursorType);
    document.addEventListener("touchstart", updateCursorType as EventListener, {
      passive: true,
    });

    // Ensure cursor is always visible and positioned
    const visibilityTimer = setTimeout(centerCursor, 100);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener(
        "touchstart",
        updateCursorType as EventListener
      );
      clearTimeout(visibilityTimer);
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
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isHighDPI = window.devicePixelRatio > 1;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      setIsMacOS(isMac);

      // Force cursor visibility and position on all supported devices
      if (isMac || isHighDPI || isIOS || isTouchDevice) {
        hasMovedRef.current = true;
        setIsVisible(true);

        // Get current mouse position if available, otherwise center
        if (typeof window !== "undefined") {
          const mouseX =
            window.event instanceof MouseEvent
              ? (window.event as MouseEvent).clientX
              : window.innerWidth / 2;
          const mouseY =
            window.event instanceof MouseEvent
              ? (window.event as MouseEvent).clientY
              : window.innerHeight / 2;
          setPosition({ x: mouseX, y: mouseY });
        }
      }

      // Add specific styles for cursor on MacOS
      if (isMac) {
        document.documentElement.style.cursor = "none";
        const style = document.createElement("style");
        style.textContent = `
          * { cursor: none !important; }
          a, button, [role="button"], .clickable { cursor: none !important; }
        `;
        document.head.appendChild(style);
        return () => style.remove();
      }
    };

    const cleanup = detectDevice();

    // Handle orientation changes for mobile devices
    const handleOrientationChange = () => {
      if (typeof window !== "undefined") {
        const mouseX =
          window.event instanceof MouseEvent
            ? (window.event as MouseEvent).clientX
            : window.innerWidth / 2;
        const mouseY =
          window.event instanceof MouseEvent
            ? (window.event as MouseEvent).clientY
            : window.innerHeight / 2;
        setPosition({ x: mouseX, y: mouseY });
      }
    };

    // Re-detect on resize and orientation change
    window.addEventListener("resize", detectDevice);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
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
          transform: `${getCursorTransform()} ${getCursorScale()}`,
          willChange: "transform, opacity",
          // Improved performance for MacOS
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          perspective: "1000px",
          WebkitPerspective: "1000px",
        }}
      />
    </>
  );
}
