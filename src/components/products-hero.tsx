"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const videoSources = [
  "https://res.cloudinary.com/dahp1ngcc/video/upload/v1778955061/From_KlickPin_CF_Fresh_simple_wedding_cake_ideas_for_your_next_inspiration_board_using_ideas_that_balance_beauty_and_everyday_function_-_Pin-45810121243428120_sad7ai.mp4",
  "https://res.cloudinary.com/dahp1ngcc/video/upload/v1778955052/From_KlickPin_CF_Try_Stylish_Pinterest_marketing_ideas_that_are_trending_right_now_across_Pinterest_boards_for_ideas_worth_saving_right_now_-_Pin-141863457007788904_1_j37y7k.mp4",
];

export default function ProductsHeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % videoSources.length);
  };

  return (
    <section className={`relative overflow-hidden bg-gray-950 min-h-[60vh] sm:min-h-[70vh] flex items-center ${loaded ? "anim-ready" : ""}`}>
      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomInCentre {
          0%   { opacity: 0; transform: scale(0.7); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-ready .anim-right { animation: slideInRight 0.8s ease-out 0.3s both; }
        .anim-ready .anim-zoom  { animation: zoomInCentre 0.9s ease-out 0.5s both; }
      `}</style>

      {/* ── Background video ── */}
      <video
        ref={videoRef}
        key={videoIndex}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={videoSources[videoIndex]} type="video/mp4" />
      </video>

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
          <span className="text-emerald-400/80 font-medium">Products & Services</span>
        </nav>

        {/* Header */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400/60">
            <span className="h-px w-8 bg-emerald-400/40" />
            Our Agricultural Products & Services
          </span>

          <h1 className="anim-right mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl text-center">
            Agricultural Products & Trading Solutions
          </h1>

          <p className="anim-zoom mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base mx-auto text-center">
            MULIARAYA provides reliable sourcing, supply,
            and distribution of high-quality agricultural products.
          </p>
          <p className="anim-zoom mt-2 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base mx-auto text-center">
            We connect farmers, producers, and global markets through efficient
            and sustainable trading solutions.
          </p>
        </div>
      </div>
    </section>
  );
}