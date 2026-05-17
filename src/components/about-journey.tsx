"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bgImage =
  "https://res.cloudinary.com/dahp1ngcc/image/upload/v1778959637/WhatsApp_Image_2026-05-16_at_8.19.31_PM_1_ycstpx.jpg";

const milestones = [
  {
    year: "2018",
    title: "Company Established",
    description:
      "Company established with focus on agricultural sourcing and local distribution.",
  },
  {
    year: "2020",
    title: "Expanded Operations",
    description:
      "Expanded supplier network and introduced bulk commodity trading operations.",
  },
  {
    year: "2022",
    title: "International Export",
    description:
      "Entered international export markets and strengthened logistics capabilities.",
  },
  {
    year: "2024",
    title: "Global Trust Partner",
    description:
      "Established as a trusted partner in global agricultural trade with growing client base.",
  },
  {
    year: "2026",
    title: "Innovation & Expansion",
    description:
      "Continued growth through digital innovation, expanded product lines, and strengthened global partnerships.",
  },
];

export default function AboutJourneySection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 sm:py-28">
      {/* Background image with fade-in */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-[2000ms]"
        style={{ opacity: loaded ? 0.25 : 0 }}
      >
        <img
          src={bgImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-gray-950/90 via-gray-950/60 to-gray-950/90" />
      <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      <div className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70"
          >
            <span className="h-px w-6 bg-emerald-400/30" />
            Our Journey
            <span className="h-px w-6 bg-emerald-400/30" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Our Journey
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-14 sm:mt-20">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent" />

          <div className="space-y-10 sm:space-y-14">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                className="relative pl-12 sm:pl-14"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center">
                  <div className="h-[38px] w-[38px] rounded-full border-2 border-emerald-500/30 bg-gray-950 flex items-center justify-center transition-all duration-500 group-hover:border-emerald-400/60">
                    <span className="text-xs font-bold text-emerald-400/80">
                      {m.year.slice(2)}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]">
                  <span className="text-[11px] font-semibold tracking-wider text-emerald-400/70">
                    {m.year}
                  </span>
                  <h3 className="mt-1.5 text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}