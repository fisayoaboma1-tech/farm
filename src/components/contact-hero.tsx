"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

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
  const [loaded, setLoaded] = useState(false);
  const maxWords = 450;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
    <section className={`relative overflow-hidden bg-gray-950 ${loaded ? "anim-ready" : ""}`}>
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomInOut {
          0%   { opacity: 0; transform: scale(0.8); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-ready .anim-left  { animation: slideInLeft 0.7s ease-out both; }
        .anim-ready .anim-right { animation: slideInRight 0.7s ease-out both; }
        .anim-ready .anim-zoom  { animation: zoomInOut 0.8s ease-out both; }
        .anim-delay-1 { animation-delay: 0.15s; }
        .anim-delay-2 { animation-delay: 0.45s; }
        .anim-delay-3 { animation-delay: 0.8s; }
      `}</style>
      {/* ── Subtle glow overlays ── */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.06)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 sm:pt-24 pb-20 sm:pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/25">
          <Link href="/" className="hover:text-emerald-400 transition-colors duration-300">
            Home
          </Link>
          <span className="text-white/15">/</span>
          <span className="text-emerald-400/80 font-medium">Contact</span>
        </nav>

        {/* Header */}
        <div className="mt-10 sm:mt-12 max-w-2xl">
          <span className="anim-left anim-delay-1 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400/60">
            <span className="h-px w-8 bg-emerald-400/40" />
            Get in touch
          </span>
          <h1 className="anim-right anim-delay-2 mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let's start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
              conversation
            </span>
          </h1>
          <p className="anim-zoom anim-delay-3 mt-4 text-base leading-relaxed text-white/45 sm:text-lg max-w-xl">
            Whether you have a question about our products, want to discuss a partnership, or need
            bulk pricing — our team is ready to help.
          </p>
        </div>

        {/* ── Form + Details grid ── */}
        <div className="anim-zoom anim-delay-3 mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Form Card (3/5) ── */}
          <div className="lg:col-span-3 rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-gray-900/80 to-gray-900/50 overflow-hidden shadow-lg shadow-emerald-900/10">
            {/* Accent header bar */}
            <div className="relative px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-emerald-500/10">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              <h2 className="text-base font-semibold text-white">
                Send us a Message
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="px-6 sm:px-8 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 mb-5">
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-white/90">Message sent successfully!</p>
                <p className="mt-1.5 text-sm text-white/50">We will get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-500/15 transition-all duration-300 ring-1 ring-emerald-500/20"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold tracking-wider uppercase text-emerald-400/70 mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full rounded-xl border border-emerald-500/10 bg-gray-800/60 px-4 py-3 text-sm text-white/90 placeholder:text-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-gray-800/90 focus:ring-1 focus:ring-emerald-500/20 focus:shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold tracking-wider uppercase text-emerald-400/70 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState((prev) => ({ ...prev, subject: e.target.value }))}
                      className="w-full rounded-xl border border-emerald-500/10 bg-gray-800/60 px-4 py-3 text-sm text-white/90 placeholder:text-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-gray-800/90 focus:ring-1 focus:ring-emerald-500/20 focus:shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-emerald-400/70 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-emerald-500/10 bg-gray-800/60 px-4 py-3 text-sm text-white/90 placeholder:text-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-gray-800/90 focus:ring-1 focus:ring-emerald-500/20 focus:shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold tracking-wider uppercase text-emerald-400/70 mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border border-emerald-500/10 bg-gray-800/60 px-4 py-3 text-sm text-white/90 placeholder:text-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-gray-800/90 focus:ring-1 focus:ring-emerald-500/20 focus:shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase text-emerald-400/70">
                      Message
                    </label>
                    <span className={`text-[11px] font-medium ${wordCount >= maxWords ? "text-red-400" : "text-emerald-400/40"}`}>
                      {wordCount} / {maxWords} words
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/10 bg-gray-800/60 px-4 py-3 text-sm text-white/90 placeholder:text-emerald-400/20 outline-none transition-all duration-300 focus:border-emerald-500/40 focus:bg-gray-800/90 focus:ring-1 focus:ring-emerald-500/20 focus:shadow-[0_0_12px_rgba(16,185,129,0.08)] resize-y min-h-[130px]"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-500 hover:to-emerald-400 active:from-emerald-700 active:to-emerald-600 transition-all duration-300 active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Location Card (2/5) ── */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-emerald-900/70 via-emerald-950/60 to-emerald-950/50 overflow-hidden self-start shadow-lg shadow-emerald-950/30">
            <div className="relative px-6 sm:px-7 pt-6 sm:pt-7 pb-4 border-b border-emerald-500/10">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/25 flex items-center justify-center ring-1 ring-emerald-400/20">
                  <svg className="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-emerald-50">
                    Our Location
                  </h2>
                  <p className="text-xs text-emerald-400/60">Visit or reach us anytime</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-emerald-500/10">
              {/* Address */}
              <div className="flex items-start gap-4 px-6 sm:px-7 py-5 hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="mt-0.5 h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 ring-1 ring-emerald-400/15">
                  <svg className="h-4 w-4 text-emerald-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400/60">Address</span>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-100/60">
                    Jl. Peternakan Raya, Jembatan Genit, Gang Semut, No. 12, Kapuk, Cengkareng, Jakarta Barat, Indonesia.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/MJWdDPVRJ9YR3g669?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-400/60 hover:text-emerald-300 transition-colors duration-200"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 px-6 sm:px-7 py-5 hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="mt-0.5 h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 ring-1 ring-emerald-400/15">
                  <svg className="h-4 w-4 text-emerald-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400/60">Phone</span>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-emerald-100/60 hover:text-emerald-200 transition-colors duration-200">(+62) 21 5436 7571</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 px-6 sm:px-7 py-5 hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="mt-0.5 h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 ring-1 ring-emerald-400/15">
                  <svg className="h-4 w-4 text-emerald-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400/60">Email</span>
                  <a
                    href="mailto:marketing@muliaraya.co.id"
                    className="mt-1 block text-sm text-emerald-100/60 hover:text-emerald-200 transition-colors duration-200"
                  >
                    marketing@muliaraya.co.id
                  </a>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-7 py-5 border-t border-emerald-500/10">
              <a
                href="mailto:marketing@muliaraya.co.id"
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-400/20 hover:bg-emerald-500/30 hover:ring-emerald-400/30 transition-all duration-300 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}