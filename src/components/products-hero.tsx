"use client";

import Link from "next/link";

export default function ProductsHeroSection() {
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
          <span className="text-white/50">Products & Services</span>
        </nav>

        {/* Share button */}
        <div className="mt-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
            <span className="h-px w-6 bg-emerald-400/30" />
            Our Agricultural Products & Services
          </span>
          <button
            onClick={() => {
              if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/40 hover:text-emerald-400 hover:bg-white/[0.06] transition-all duration-300 ring-1 ring-white/[0.06]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share
          </button>
        </div>

        <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Agricultural Products & Trading Solutions
        </h1>

        <div className="mt-8 max-w-2xl space-y-4">
          <p className="text-sm leading-relaxed text-white/50 sm:text-base">
            PT. Sultana Agro Lestari provides reliable sourcing, supply,
            and distribution of high-quality agricultural products.
          </p>
          <p className="text-sm leading-relaxed text-white/40 sm:text-base">
            We connect farmers, producers, and global markets through efficient
            and sustainable trading solutions.
          </p>
        </div>
      </div>
    </section>
  );
}