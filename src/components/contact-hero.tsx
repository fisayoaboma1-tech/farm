"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function ContactHeroSection() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [wordCount, setWordCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const maxWords = 450;

  const handleMessageChange = (value: string) => {
    const words = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    if (words <= maxWords) {
      setFormState((prev) => ({ ...prev, message: value }));
      setWordCount(words);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
    setFormState({ fullName: "", email: "", phone: "", subject: "", message: "" });
    setWordCount(0);
  };

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
          <span className="text-white/50">Contact</span>
        </nav>

        {/* Share button */}
        <div className="mt-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-emerald-400/70">
            <span className="h-px w-6 bg-emerald-400/30" />
            Contact Us
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
          Contact Us
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
          Thank you for your interest in PT. Sultana Agro Lestari. Please contact
          us for inquiries regarding agricultural products, bulk orders, or
          partnerships. Our team will respond promptly.
        </p>

        {/* ── Contact Details + Form grid ── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Contact Details Card (clean, no border) ── */}
          <div className="rounded-2xl bg-white/[0.02] overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
              <h2 className="text-sm font-semibold text-white/90">
                Our Location
              </h2>
            </div>

            <div className="space-y-px">
              <div className="flex items-start gap-4 px-6 sm:px-8 py-5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/40">Address</span>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/50">
                    Eightyeight@Kasablanka Office Tower Lantai 10 Unit E Jalan Casablanca Kaveling 88 in SOUTH JAKARTA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 px-6 sm:px-8 py-5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/40">Phone</span>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[13px] text-white/50">+62-031 8521230</p>
                    <p className="text-[13px] text-white/50">+62 816-868-92024</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 px-6 sm:px-8 py-5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/40">Email</span>
                  <p className="mt-1 text-[13px] text-white/50">support@pt-sultanagrolestari.id</p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-5">
              <a
                href="mailto:support@pt-sultanagrolestari.id"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>

          {/* ── Contact Form Card ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-white/[0.04]">
              <h2 className="text-sm font-semibold text-white/90">
                Send us a Message
              </h2>
            </div>

            {submitted ? (
              <div className="px-6 sm:px-8 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 mb-4">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/80">Thank you for your message!</p>
                <p className="mt-1 text-[13px] text-white/40">We will get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-300 ring-1 ring-white/[0.06]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-5 space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-[11px] font-semibold tracking-wider uppercase text-white/40 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-emerald-500/[0.03] focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[11px] font-semibold tracking-wider uppercase text-white/40 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-emerald-500/[0.03] focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="Product Inquiry, Partnership, etc."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold tracking-wider uppercase text-white/40 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-emerald-500/[0.03] focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[11px] font-semibold tracking-wider uppercase text-white/40 mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-emerald-500/[0.03] focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="+62-031 8521230"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="message" className="text-[11px] font-semibold tracking-wider uppercase text-white/40">
                      Message
                    </label>
                    <span className={`text-[10px] font-medium ${wordCount >= maxWords ? "text-red-400" : "text-white/30"}`}>
                      {wordCount} / {maxWords} words
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-emerald-500/30 focus:bg-emerald-500/[0.03] focus:ring-1 focus:ring-emerald-500/20 resize-y min-h-[140px]"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}