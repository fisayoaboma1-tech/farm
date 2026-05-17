"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sprout,
  Truck,
  ShieldCheck,
  Globe,
  Compass,
} from "lucide-react";

const services = [
  {
    name: "Product Sourcing",
    description:
      "We source high-quality agricultural products directly from trusted farmers and suppliers. Our strong network ensures consistent access to grains, oilseeds, spices, and other farm produce while maintaining competitive pricing and dependable supply chains.",
    icon: Sprout,
  },
  {
    name: "Supply Chain Management",
    description:
      "Our supply chain solutions ensure smooth handling, storage, and transportation of agricultural goods. We coordinate logistics efficiently to deliver products on time while preserving quality and minimizing delays across local and international markets.",
    icon: Truck,
  },
  {
    name: "Quality Assurance",
    description:
      "Quality is at the core of our operations. We implement strict inspection and control processes to ensure all agricultural products meet industry standards and customer expectations, from sourcing to final delivery.",
    icon: ShieldCheck,
  },
  {
    name: "Import & Distribution",
    description:
      "We specialize in the global import and distribution of agricultural commodities. Our team ensures compliance with international trade regulations while delivering products efficiently to clients across different regions.",
    icon: Globe,
  },
  {
    name: "Agricultural Consulting",
    description:
      "We provide expert guidance on agricultural markets, sourcing strategies, and trade opportunities. Our insights help clients make informed decisions, optimize procurement, and expand their reach in the global agricultural sector.",
    icon: Compass,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 } as const,
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.15 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 py-20 sm:py-28">
      {/* ── Full-bleed background image layer ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/sprout.svg"
          alt=""
          fill
          className="object-cover opacity-[0.04] scale-150"
        />
      </div>

      {/* ── Grain texture overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />

      {/* ── Subtle ambient glow ── */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

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
              What We Do
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400/40" />
            </motion.span>
            <motion.h2
              className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
              variants={headingVariants}
            >
              Our Agricultural Services
            </motion.h2>
            <motion.p
              className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base"
              variants={paragraphVariants}
            >
            We provide reliable agricultural trading solutions focused on
            sourcing, quality assurance, and efficient distribution to meet
            global market demands and support sustainable growth.
          </motion.p>
        </motion.div>

        {/* ── Services list ── */}
        <motion.div
          className="mt-14 sm:mt-20 space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 shadow-sm sm:px-6 sm:py-5 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
            >
              {/* Decorative background icon */}
              <div className="pointer-events-none absolute -right-4 -top-4 z-0 opacity-[0.04] transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-110">
                <service.icon className="h-28 w-28 text-white sm:h-36 sm:w-36" />
              </div>

              <div className="flex items-start gap-4 sm:gap-6 relative z-[1]">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] transition-all duration-500 group-hover:bg-emerald-500/10 group-hover:ring-emerald-500/20">
                  <service.icon className="h-5 w-5 text-white/40 transition-colors duration-500 group-hover:text-emerald-400" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                    {service.description}
                  </p>
                </div>

                {/* Subtle arrow indicator */}
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center opacity-0 translate-x-[-4px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg
                    className="h-4 w-4 text-emerald-400/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}