import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Visura — Authentic African & Indian Visuals",
    template: "%s | Visura",
  },
  description:
    "Thousands of free images, vectors & footage from across Africa and India — licensed and ready to use.",
  keywords: [
    "African stock photos",
    "Indian stock photos",
    "free African images",
    "free Indian images",
    "Africa photography",
    "India photography",
    "cultural visuals",
    "free stock photos",
  ],
  openGraph: {
    title: "Visura — Authentic African & Indian Visuals",
    description: "Thousands of free images from across Africa and India.",
    type: "website",
    url: "https://visura.vercel.app",
    siteName: "Visura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visura — Authentic African & Indian Visuals",
    description: "Thousands of free images from across Africa and India.",
  },
  metadataBase: new URL("https://visura.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1A1A1A] antialiased" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[#D0DBE8] mt-20 py-10 text-center text-sm text-[#6B7280]">
          <p>© {new Date().getFullYear()} Visura. Empowering creators worldwide.</p>
        </footer>
      </body>
    </html>
  );
}