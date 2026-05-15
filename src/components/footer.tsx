"use client";

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
  "PT. Sultana Agro Lestari, a Limited Liability Company incorporated in Indonesia with business registration number 1094914 is based in Eightyeight@Kasablanka Office Tower Lantai 10 Unit E Jalan Casablanca Kaveling 88 in SOUTH JAKARTA.";

const defaultColumns: FooterColumn[] = [
  {
    title: "Useful Links",
    links: [{ label: "Contact Us", href: "#" }],
  },
  {
    title: "Information",
    links: [
      { label: "About us", href: "#" },
      { label: "Products", href: "#" },
    ],
  },
];

const defaultContact: FooterContact = {
  address:
    "Eightyeight@Kasablanka Office Tower Lantai 10 Unit E Jalan Casablanca Kaveling 88 in SOUTH JAKARTA.",
  phones: ["+62-031 8521230", "+62 816-868-92024"],
  email: "support@pt-sultanagrolestari.id",
};

/* ── SVG Icon Components ───────────────────────────── */
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

/* ── Background Decorations ────────────────────────── */
function FooterBackground() {
  return (
    <>
      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCMfikiIG9wYWNpdHk9IjAiIC8+PC9zdmc+')]" />
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[250px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-[120px]" />
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
    <footer className="relative overflow-hidden bg-gray-950 border-t border-white/[0.04]">
      <FooterBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* ── Top grid: Brand + Link columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand / Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              {logo}
              <h3 className="text-base font-semibold tracking-tight text-white">
                {companyName}
              </h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/40 max-w-md">
              {description}
            </p>
          </div>

          {/* Dynamic columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white/50 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/40 hover:text-emerald-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Contact details row ── */}
        <div className="mt-12 pt-8 border-t border-white/[0.04]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Address */}
            <div className="flex items-start gap-3">
              <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" />
              <p className="text-[13px] leading-relaxed text-white/40">
                {contact.address}
              </p>
            </div>

            {/* Phones */}
            <div className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" />
              <div className="space-y-1">
                {contact.phones.map((phone) => (
                  <p key={phone} className="text-[13px] text-white/40">
                    {phone}
                  </p>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <EmailIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" />
              <a
                href={`mailto:${contact.email}`}
                className="text-[13px] text-white/40 hover:text-emerald-400 transition-colors duration-300"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[12px] text-white/30">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}