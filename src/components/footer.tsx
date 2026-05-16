"use client";

import { Sprout } from "lucide-react";
import { type ReactNode } from "react";

/* ── Types ─────────────────────────────────────────── */
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterContact {
  address: string;
  phones: string[];
  email: string;
}

export interface FooterProps {
  companyName?: string;
  description?: string;
  columns?: FooterColumn[];
  contact?: FooterContact;
  copyright?: string;
  logo?: ReactNode;
}

/* ── Default props for PT. Sultana Agro Lestari ────── */
const defaultDescription =
  "PT. Sultana Agro Lestari is a Limited Liability Company incorporated in Indonesia (Business Registration No. 1094914), headquartered at Eightyeight@Kasablanka Office Tower, Jakarta. We specialize in reliable agricultural trading, sourcing, quality assurance, and global distribution.";

const defaultColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Certifications", href: "/about" },
      { label: "Quality Assurance", href: "/about" },
      { label: "Supply Chain", href: "/about" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const defaultContact: FooterContact = {
  address:
    "Eightyeight@Kasablanka Office Tower, Lantai 10 Unit E, Jalan Casablanca Kaveling 88, South Jakarta, Indonesia",
  phones: ["+62-31 8521230", "+62 816-868-92024"],
  email: "support@pt-sultanagrolestari.id",
};

/* ── SVG Icon Components ───────────────────────────── */
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

/* ── Background Decorations ────────────────────────── */
function FooterBackground() {
  return (
    <>
      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Dual ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 z-0 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 z-0 h-[250px] w-[350px] translate-y-1/3 rounded-full bg-emerald-400/4 blur-[100px]" />
    </>
  );
}

/* ── Main Component ────────────────────────────────── */
export default function Footer({
  companyName = "PT. Sultana Agro Lestari",
  description = defaultDescription,
  columns = defaultColumns,
  contact = defaultContact,
  copyright = "© 2026 PT. Sultana Agro Lestari. All Rights Reserved.",
  logo,
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-gray-950 border-t border-white/[0.05]">
      <FooterBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Main Grid: Brand | Quick Links | Resources ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 pt-14 sm:pt-18 pb-12">
          {/* Brand Column - spans 2 on large screens */}
          <div className="lg:col-span-2 max-w-lg">
            {/* Logo - matches header style exactly */}
            <div className="flex items-center gap-2.5">
              {logo ?? (
                <Sprout className="h-5 w-5 text-emerald-400 shrink-0" />
              )}
              <span
                className="font-display text-base font-semibold tracking-wide transition-colors duration-300"
                style={{ color: "var(--header-text-hover, rgba(255,255,255,0.7))" }}
              >
                S̴u̴l̴t̴a̴n̴a̴ ̴A̴g̴r̴o̴
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-white/55 max-w-md">
              {description}
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/50 hover:text-emerald-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Contact Details Bar ── */}
        <div className="py-8 border-t border-white/[0.05]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/8 ring-1 ring-emerald-500/15">
                <LocationIcon className="h-4 w-4 text-emerald-400/70" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-white/30 mb-1">Address</span>
                <p className="text-[13px] leading-relaxed text-white/55">
                  {contact.address}
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/8 ring-1 ring-emerald-500/15">
                <PhoneIcon className="h-4 w-4 text-emerald-400/70" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-white/30 mb-1">Phone</span>
                <div className="space-y-1">
                  {contact.phones.map((phone) => (
                    <p key={phone} className="text-[13px] text-white/55">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/8 ring-1 ring-emerald-500/15">
                <EmailIcon className="h-4 w-4 text-emerald-400/70" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wider uppercase text-white/30 mb-1">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[13px] text-white/55 hover:text-emerald-400 transition-colors duration-300"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Copyright Bar ── */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-white/30">{copyright}</p>
          <p className="text-[11px] text-white/20">
            Built with care for global agricultural excellence
          </p>
        </div>
      </div>
    </footer>
  );
}