import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Alex Mercer — Creative Developer",
  description:
    "Portfolio of Alex Mercer, a creative developer crafting elegant digital experiences with modern web technologies.",
  keywords: ["developer", "portfolio", "web design", "creative", "frontend"],
  authors: [{ name: "Alex Mercer" }],
  openGraph: {
    title: "Alex Mercer — Creative Developer",
    description: "Crafting elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#0f0f0f] text-white antialiased font-inter selection:bg-purple-500/30 selection:text-purple-200">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}