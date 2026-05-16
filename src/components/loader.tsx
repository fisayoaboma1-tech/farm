"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  minDisplay?: number; /* minimum time (ms) to show loader */
}

export default function Loader({ minDisplay = 1200 }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDisplay);
    return () => clearTimeout(timer);
  }, [minDisplay]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-gray-950 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* Sprout logo */}
      <div className="relative mb-8">
        {/* Glow ring */}
        <div className="absolute inset-0 -m-6 rounded-full bg-emerald-500/10 blur-2xl animate-pulse" />

        {/* Sprout icon — matches header logo */}
        <svg
          className="relative h-12 w-12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2C11.9 2 11 2.9 11 4v4h4V4c0-1.1-.9-2-2-2z"
            fill="#34d399"
            stroke="#34d399"
            strokeWidth="1"
          />
          <path
            d="M6 11c0 3.3 2.7 6 6 6s6-2.7 6-6"
            fill="#34d399"
            stroke="#34d399"
            strokeWidth="1"
          />
          <path
            d="M12 22V11"
            fill="#34d399"
            stroke="#34d399"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ===== Sliding clip-path text (adapted from user's pattern) ===== */}
      <div
        className="loader-text relative"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 6vw, 48px)",
          display: "inline-grid",
          overflow: "hidden",
          color: "#34d399",
          letterSpacing: "0.05em",
        }}
      >
        {/* Before pseudo — top half slides left */}
        <span
          className="loader-half loader-half--top"
          aria-hidden="true"
          style={{
            gridArea: "1/1",
            clipPath: "inset(0 -200% 50%)",
            textShadow: "-8ch 0 0 #34d399",
            animation: "loader-slide 1.2s ease-in-out infinite",
          }}
        >
          MULIARAYA
        </span>

        {/* After pseudo — bottom half slides right */}
        <span
          className="loader-half loader-half--bottom"
          aria-hidden="true"
          style={{
            gridArea: "1/1",
            clipPath: "inset(50% -200% 0%)",
            textShadow: "8ch 0 0 #34d399",
            animation: "loader-slide 1.2s ease-in-out infinite reverse",
          }}
        >
          MULIARAYA
        </span>

        {/* Visible text (ghost / outline feel) */}
        <span
          className="loader-ghost"
          aria-hidden="true"
          style={{
            gridArea: "1/1",
            opacity: 0.08,
            WebkitTextStroke: "1px #34d399",
            color: "transparent",
          }}
        >
          MULIARAYA
        </span>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-xs tracking-[0.3em] text-emerald-400/40 uppercase font-mono">
        Agricultural Trading & Supply
      </p>

      {/* Loading bar */}
      <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-emerald-900/30">
        <div className="h-full w-full origin-left rounded-full bg-emerald-400 animate-loading-bar" />
      </div>

      {/* ===== Keyframes injected once ===== */}
      <style jsx>{`
        @keyframes loader-slide {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(calc(100% * var(--s, 1)));
          }
          75% {
            transform: translateX(calc(100% * var(--s, 1)));
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes loading-bar {
          0% {
            transform: scaleX(0);
          }
          30% {
            transform: scaleX(0.3);
          }
          60% {
            transform: scaleX(0.7);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .loader-half--top {
          --s: -1;
        }
        .loader-half--bottom {
          --s: 1;
        }
      `}</style>
    </div>
  );
}