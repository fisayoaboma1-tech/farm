"use client";

import { useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Sourcing",
    description:
      "We source high-quality agricultural products from trusted farmers, cooperatives, and verified suppliers.",
    image:
      "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959636/WhatsApp_Image_2026-05-16_at_8.19.31_PM_xe1hrp.jpg",
    alt: "CEO professional portrait",
  },
  {
    number: "02",
    title: "Quality Control",
    description:
      "All products undergo strict inspection and quality checks to meet international standards and customer requirements.",
    image:
      "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959637/WhatsApp_Image_2026-05-16_at_8.19.31_PM_1_ycstpx.jpg",
    alt: "Quality inspector portrait",
  },
  {
    number: "03",
    title: "Processing & Packaging",
    description:
      "We ensure proper handling, processing, and packaging to maintain product freshness and safety during transit.",
    image:
      "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959637/WhatsApp_Image_2026-05-16_at_8.19.32_PM_1_qxncvg.jpg",
    alt: "Processing worker portrait",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Efficient logistics and global distribution ensure timely delivery to local and international markets.",
    image:
      "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959637/WhatsApp_Image_2026-05-16_at_8.19.32_PM_b6eijl.jpg",
    alt: "Logistics team portrait",
  },
];

export default function OurProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const active = steps[activeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 py-20 sm:py-28">
      {/* ── Grid pattern overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Grain texture ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Large radial glow top ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/12 blur-[200px]" />

      {/* ── Secondary glow bottom-right ── */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-600/8 blur-[160px]" />

      {/* ── Accent glow top-right ── */}
      <div className="pointer-events-none absolute right-[10%] top-[15%] z-0 h-[200px] w-[200px] rounded-full bg-emerald-400/5 blur-[100px]" />

      {/* ── Floating decorative rings ── */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] z-0 h-32 w-32 rounded-full border border-white/[0.03]" />
      <div className="pointer-events-none absolute right-[8%] top-[40%] z-0 h-24 w-24 rounded-full border border-white/[0.02]" />
      <div className="pointer-events-none absolute left-[10%] bottom-[30%] z-0 h-40 w-40 rounded-full bg-emerald-500/3 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Section header ── */}
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/40" />
            Our Process
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400/40" />
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Our Trading Process
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
            A structured approach to sourcing, quality control, and delivering
            agricultural products worldwide.
          </p>
        </div>

        {/* ── Main slideshow card ── */}
        <div className="relative mx-auto mt-14 sm:mt-20 max-w-2xl">
          {/* Outer glow ring */}
          <div className="pointer-events-none absolute -inset-8 z-0 rounded-[32px] bg-emerald-500/6 blur-[80px] opacity-60" />
          <div className="pointer-events-none absolute -inset-3 z-0 rounded-[28px] bg-white/[0.02] blur-[40px]" />

          {/* Card */}
          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent shadow-[0_0_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            {/* ── Image area (top) ── */}
            <div className="relative h-[320px] sm:h-[380px] overflow-hidden bg-gray-900">
              {/* Background image layers with crossfade */}
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    index === activeIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                  }`}
                >
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="h-full w-full object-cover"
                  />
                  {/* Deep multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-gray-950/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-gray-950/20" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
                </div>
              ))}

              {/* Step number badge — glassmorphism over image */}
              <div className="absolute top-5 left-5 z-20">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 backdrop-blur-xl border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <span className="text-base font-bold tracking-tight text-emerald-400">
                    {active.number}
                  </span>
                </div>
              </div>

              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl drop-shadow-lg">
                  {active.title}
                </h3>
                <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-emerald-400/80 to-emerald-500/40 rounded-full" />
              </div>

              {/* Animated progress bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/[0.04]">
                <div
                  key={activeIndex}
                  className="h-full bg-gradient-to-r from-emerald-400/90 via-emerald-500/60 to-emerald-400/30"
                  style={{
                    animation: `progressShrink 4s linear forwards`,
                  }}
                />
              </div>
            </div>

            {/* ── Content area (below image) ── */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Description */}
              <p className="text-sm leading-relaxed text-white/50 sm:text-base sm:leading-relaxed">
                {active.description}
              </p>

              {/* ── Step indicator buttons ── */}
              <div className="mt-6 flex items-center gap-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative flex-1 rounded-lg px-3 py-2.5 text-center transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-emerald-500/10 ring-1 ring-emerald-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                        : "hover:bg-white/[0.03] hover:ring-1 hover:ring-white/[0.06]"
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  >
                    <span
                      className={`block text-[10px] font-bold tracking-wider transition-colors duration-300 ${
                        index === activeIndex
                          ? "text-emerald-400"
                          : "text-white/25 group-hover:text-white/40"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`block text-[10px] font-medium transition-colors duration-300 mt-0.5 ${
                        index === activeIndex
                          ? "text-white/70"
                          : "text-white/25 group-hover:text-white/35"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes progressShrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </section>
  );
}