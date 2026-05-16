import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Providers from "@/lib/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import ScrollToTop from "@/components/scroll-to-top";
import "./globals.css";

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
  title: "Sultana Agro — Agricultural Trading & Supply",
  description:
    "PT. Sultana Agro Lestari provides reliable agricultural trading solutions focused on sourcing, quality assurance, and efficient distribution to meet global market demands.",
  icons: {
    icon: [
      { url: "/sprout.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100 antialiased">
        <Providers>
          <ScrollToTop />
          <Loader />
          <Header />
          <div className="flex-1 pt-12 sm:pt-14">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
