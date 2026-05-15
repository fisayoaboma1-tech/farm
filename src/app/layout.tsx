import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Providers from "@/lib/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

export const metadata: Metadata = {
  title: "PT. Sultana Agro Lestari — Agricultural Trading & Supply",
  description:
    "PT. Sultana Agro Lestari provides reliable agricultural trading solutions focused on sourcing, quality assurance, and efficient distribution to meet global market demands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Providers>
          <Header />
          <div className="flex-1 pt-12 sm:pt-14">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
