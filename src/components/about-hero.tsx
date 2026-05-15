"use client";

import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950">
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/10 blur-[200px]" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 sm:pt-36 pb-20 sm:pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-white/30">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white/50">About Us</span>
        </nav>

        {/* Tagline */}
        <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
          <span className="h-px w-6 bg-emerald-400/30" />
          About PT. Sultana Agro Lestari
        </span>

        <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Trusted Agricultural Trading Partner
        </h1>

        <div className="mt-8 max-w-2xl space-y-4">
          <p className="text-sm leading-relaxed text-white/50 sm:text-base">
            Incorporated under Indonesian law, PT. Sultana Agro Lestari, operates as a
            Limited Liability Company with registration number 430580, based in
            Atria@Sudirman, lantai 15, Jalan Jendral Sudirman Kavling. 33 A, JAKARTA
            PUSAT.
          </p>
          <p className="text-sm leading-relaxed text-white/40 sm:text-base">
            PT. Sultana Agro Lestari is a dedicated agricultural products trading and
            supply company focused on connecting farmers, producers, and global
            markets. We specialize in sourcing, processing, and distributing
            high-quality agricultural commodities such as rice, cocoa, sesame seeds,
            spices, and other farm produce. Our commitment to quality, sustainability,
            and efficient logistics allows us to meet the growing demand for
            agricultural products across local and international markets.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300"
          >
            Explore Our Products
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}