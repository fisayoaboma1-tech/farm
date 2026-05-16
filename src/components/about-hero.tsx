"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const imageSources = [
  "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959635/WhatsApp_Image_2026-05-16_at_8.16.32_PM_otmktj.jpg",
  "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959636/WhatsApp_Image_2026-05-16_at_8.16.33_PM_1_dkxu68.jpg",
  "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959636/WhatsApp_Image_2026-05-16_at_8.16.33_PM_bfnxf2.jpg",
];

export default function AboutHeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageSources.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loaded]);

  

  return (
    <section className={`relative overflow-hidden bg-gray-950 min-h-[60vh] sm:min-h-[70vh] flex items-center ${loaded ? "anim-ready" : ""}`}>
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomInCentre {
          0%   { opacity: 0; transform: scale(0.7); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-ready .anim-left  { animation: slideInLeft 0.8s ease-out 0.1s both; }
        .anim-ready .anim-right { animation: slideInRight 0.8s ease-out 0.3s both; }
        .anim-ready .anim-zoom  { animation: zoomInCentre 0.9s ease-out 0.5s both; }
      `}</style>

      {/* ── Background images (crossfade) ── */}
      <div className="absolute inset-0 z-0">
        {imageSources.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1500ms]"
            style={{ opacity: i === imageIndex ? 0.85 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ── Dark overlay for readability ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* ── Subtle green glow overlays ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.10)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 sm:pt-24 pb-20 sm:pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/25">
          <Link href="/" className="hover:text-emerald-400 transition-colors duration-300">
            Home
          </Link>
          <span className="text-white/15">/</span>
          <span className="text-emerald-400/80 font-medium">About Us</span>
        </nav>

        {/* Header */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto">
          <span className="anim-left inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400/60">
            <span className="h-px w-8 bg-emerald-400/40" />
            About MULIARAYA
          </span>

          <h1 className="anim-right mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl text-center">
            Trusted Agricultural Trading Partner
          </h1>

          <p className="anim-zoom mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base mx-auto text-center">
            MULIARAYA is a dedicated agricultural products trading and
            supply company focused on connecting farmers, producers, and global
            markets. We specialize in sourcing, processing, and distributing
            high-quality agricultural commodities such as rice, cocoa, sesame seeds,
            spices, and other farm produce.
          </p>
        </div>

      </div>
    </section>
  );
}