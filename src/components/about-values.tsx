"use client";

const values = [
  {
    title: "Reliable Sourcing",
    description:
      "We partner with trusted farmers and suppliers to ensure consistent quality and sustainable agricultural production.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description:
      "Every product undergoes strict quality checks to meet international standards and customer expectations.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Global Distribution",
    description:
      "We ensure efficient logistics and timely delivery to clients across domestic and international markets.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function AboutValuesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-green-950/80 to-gray-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-500/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
            <span className="h-px w-6 bg-emerald-400/30" />
            Our Core Values
            <span className="h-px w-6 bg-emerald-400/30" />
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What Drives Us
          </h2>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.10]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] transition-all duration-500 group-hover:bg-emerald-500/10 group-hover:ring-emerald-500/20">
                <span className="text-white/40 transition-colors duration-500 group-hover:text-emerald-400">
                  {v.icon}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/50">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}