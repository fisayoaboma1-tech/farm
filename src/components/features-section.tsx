"use client";

import { motion } from "framer-motion";
import { Sprout, ShieldCheck, Globe } from "lucide-react";

const features = [
  {
    title: "Reliable Sourcing",
    description:
      "We partner with trusted farmers and suppliers to ensure consistent quality and sustainable agricultural production.",
    icon: Sprout,
    direction: "right" as const,
  },
  {
    title: "Quality Assurance",
    description:
      "Every product undergoes strict quality checks to meet international standards and customer expectations.",
    icon: ShieldCheck,
    direction: "left" as const,
  },
  {
    title: "Global Distribution",
    description:
      "We ensure efficient logistics and timely delivery to clients across domestic and international markets.",
    icon: Globe,
    direction: "right" as const,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.45,
    },
  },
};

const createCardVariants = (direction: "left" | "right") => ({
  hidden: {
    opacity: 0,
    x: direction === "right" ? 120 : -120,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
});

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-emerald-950/70 to-gray-950 py-20 sm:py-28">
      {/* ── Grain texture overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Subtle ambient glow ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── Section header ── */}
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70"
            variants={tagVariants}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/40" />
            Why Choose Us
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400/40" />
          </motion.span>
          <motion.h2
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            variants={headingVariants}
          >
            Built on Trust & Excellence
          </motion.h2>
        </motion.div>

        {/* ── Feature cards ── */}
        <motion.div
          className="mt-14 sm:mt-20 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={createCardVariants(feature.direction)}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-6 shadow-sm sm:px-8 sm:py-7 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
            >
              <div className="flex items-start gap-5 sm:gap-7">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06] transition-all duration-500 group-hover:bg-emerald-500/10 group-hover:ring-emerald-500/20">
                  <feature.icon className="h-6 w-6 text-white/40 transition-colors duration-500 group-hover:text-emerald-400" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                    {feature.description}
                  </p>
                </div>

                {/* Stagger index indicator */}
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center">
                  <span className="text-xs font-bold tracking-wider text-white/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}