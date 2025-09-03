"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
  }, []);

  return (
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
  );
}
