import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: {
    default: "AfriStock — Authentic African Visuals",
    template: "%s | AfriStock",
  },
  description:
    "Thousands of free images, vectors & footage from across 54 African countries — licensed and ready to use.",
  keywords: [
    "African stock photos",
    "free African images",
    "Africa photography",
    "African visuals",
    "stock photos Africa",
    "African culture photos",
  ],
  openGraph: {
    title: "AfriStock — Authentic African Visuals",
    description: "Thousands of free images from across 54 African countries.",
    type: "website",
    url: "https://afristock-lemon.vercel.app",
    siteName: "AfriStock",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriStock — Authentic African Visuals",
    description: "Thousands of free images from across 54 African countries.",
  },
  metadataBase: new URL("https://afristock-lemon.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1A1A1A] antialiased" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[#D0DBE8] mt-20 py-10 text-center text-sm text-[#6B7280]">
          <p>© {new Date().getFullYear()} AfriStock. Empowering African creators worldwide.</p>
        </footer>
      </body>
    </html>
  );
}