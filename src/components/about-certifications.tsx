"use client";

const certifications = [
  "Ministry of Trade, Indonesia – Registered Agricultural Trading Company",
  "Indonesian Chamber of Commerce and Industry (KADIN) – Member",
  "International Trade Compliance – Adherence to global import/export regulations",
  "Food Safety Standards – Compliance with international food safety requirements",
  "Agricultural Export Certification – Certified for international commodity trading",
  "Sustainable Sourcing Practices – Commitment to responsible and ethical sourcing",
  "Quality Assurance Standards – Strict inspection and quality control procedures",
  "Global Logistics & Supply Chain Network – Reliable international distribution partnerships",
];

export default function AboutCertificationsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
            <span className="h-px w-6 bg-emerald-400/30" />
            Certifications & Industry Standards
            <span className="h-px w-6 bg-emerald-400/30" />
          </span>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
            >
              {/* Checkmark */}
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <svg
                  className="h-3 w-3 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                {cert}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}