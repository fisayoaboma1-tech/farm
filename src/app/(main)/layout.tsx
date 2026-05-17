import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Providers from "@/lib/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "MULIARAYA — Agricultural Trading & Supply",
  description:
    "MULIARAYA provides reliable agricultural trading solutions focused on sourcing, quality assurance, and efficient distribution to meet global market demands.",
  icons: {
    icon: [
      { url: "/sprout.svg", type: "image/svg+xml" },
    ],
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ScrollToTop />
      <Loader />
      <Header />
      <div className="flex-1 pt-12 sm:pt-14">{children}</div>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#0f172a",
            color: "#e2e8f0",
            border: "1px solid rgba(148, 163, 184, 0.12)",
            borderRadius: "8px",
            padding: "14px 22px",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.01em",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          },
        }}
      />
    </Providers>
  );
}