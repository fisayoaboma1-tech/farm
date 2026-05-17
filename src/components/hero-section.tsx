"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Sprout } from "lucide-react";
import { InlineSearch } from "@/components/search-bar";

/* ── 7 agricultural landscape slides ─────────────────────────────── */
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=1920&q=85&auto=format",
    title: "Vineyards & Sun-Drenched Grapes",
    subtitle:
      "Sun-soaked vineyards yielding rich harvests for world-class wines and fresh produce.",
    badge: "VINEYARDS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85&auto=format",
    title: "Golden Wheat Harvests",
    subtitle:
      "From our fields to your table — sustainably grown wheat across thousands of fertile acres.",
    badge: "WHEAT & GRAINS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=85&auto=format",
    title: "Lush Tea Plantations",
    subtitle:
      "Hand-picked premium tea leaves nurtured in the misty highlands of our partner estates.",
    badge: "TEA & BEVERAGES",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=85&auto=format",
    title: "Verdant Rice Paddies",
    subtitle:
      "Terraced rice fields producing the finest grain with traditional wisdom and modern care.",
    badge: "RICE & CEREALS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=85&auto=format",
    title: "Fresh Organic Orchards",
    subtitle:
      "Bountiful orchards brimming with organically grown fruits picked at peak ripeness.",
    badge: "FRUIT ORCHARDS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=85&auto=format",
    title: "Vast Cornfields Under Open Skies",
    subtitle:
      "Expansive corn operations driving feed, fuel, and food for communities worldwide.",
    badge: "CORN & FEED",
  },
  {
    image:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1920&q=85&auto=format",
    title: "Ranchlands & Livestock",
    subtitle:
      "Ethically raised livestock grazing on lush pasturelands for premium dairy and meat.",
    badge: "LIVESTOCK",
  },
];

/* ── Slide indicator dots ──────────────────────────────────────────── */
function Dots({ current, total }: { current: number; total: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full transition-all duration-500",
            i === current
              ? "h-2.5 w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
              : "h-2 w-2 bg-white/40 hover:bg-white/60"
          )}
        />
      ))}
    </div>
  );
}

/* ── Hero component ─────────────────────────────────────────────────── */
interface HeroSectionProps {
  isAuthenticated: boolean;
  user?: { name?: string | null; email?: string | null } | null;
}

export default function HeroSection({
  isAuthenticated,
  user,
}: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));

  const goTo = useCallback(
    (i: number) => {
      setCurrent(i % slides.length);
    },
    []
  );

  /* Auto-advance every 6 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* Preload neighbouring images */
  const slide = slides[current];

  /* Preload the next and previous images */
  useEffect(() => {
    const preload = (i: number) => {
      const idx = ((i % slides.length) + slides.length) % slides.length;
      if (!loaded[idx]) {
        const img = new Image();
        img.onload = () =>
          setLoaded((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        img.src = slides[idx].image;
      }
    };
    preload(current);
    preload(current + 1);
    preload(current - 1);
  }, [current, loaded]);

  return (
    <section className="relative h-[75vh] sm:h-[85vh] min-h-[500px] sm:min-h-[600px] w-full overflow-hidden">
      {/* ── Background slides ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Image with subtle zoom on active */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center will-change-transform",
              i === current && "animate-hero-zoom"
            )}
            style={{ backgroundImage: `url(${s.image})` }}
          />

          {/* Overlay — rich gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── Grain texture overlay for premium feel ── */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Inline search bar ── */}
      <InlineSearch />

      {/* ── Content ── */}
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center px-6 sm:px-10">
        <div className="max-w-2xl" key={current}>
          {/* Badge */}
          <div className="animate-hero-badge mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/90 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-sm uppercase">
              <Sprout className="h-3.5 w-3.5 text-green-300" />
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-hero-title text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="animate-hero-desc mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
            {slide.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="animate-hero-cta mt-8 flex flex-wrap items-center gap-4">
            {isAuthenticated ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
                Welcome back, {user?.name || user?.email || "Farmer"}
              </span>
              ) : (
                <Link
                  href="/auth/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-400/40 hover:scale-105 active:scale-95"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <Dots current={current} total={slides.length} />

      {/* ── Side arrows ── */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110 md:block"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110 md:block"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}