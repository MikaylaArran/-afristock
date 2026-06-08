import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Users, Globe } from "lucide-react";
import { MOCK_ASSETS } from "@/lib/mock-data";

export default function HomePage() {
  const featured = MOCK_ASSETS.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#003366] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #0057B8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #004080 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="text-[#A8C4E0] text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            The African Visual Library
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Authentic African visuals,<br />
            <span className="text-[#5BA3D9]">built for creators.</span>
          </h1>
          <p className="text-[#A8C4E0] text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Thousands of images from across 54 countries — licensed and ready to use.
            Discover real Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-2 bg-[#0057B8] hover:bg-[#004A9E] text-white px-8 py-3.5 rounded-xl font-medium transition-colors"
            >
              Browse Images <ArrowRight size={16} />
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-medium transition-colors border border-white/20"
            >
              Become a Contributor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#D0DBE8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 gap-3 sm:gap-6 text-center">
          {[
            { icon: <Camera size={18} />, value: "48K+", label: "Assets" },
            { icon: <Users size={18} />, value: "1,200", label: "Contributors" },
            { icon: <Globe size={18} />, value: "54", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className="text-[#0057B8] mb-1">{s.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-[#003366]">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-[#6B7280]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003366]">
              Featured images
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base mt-1">Hand-picked by our editorial team</p>
          </div>
          <Link
            href="/browse"
            className="flex items-center gap-1.5 text-sm font-medium text-[#0057B8] hover:underline"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {featured.map((asset) => (
            <Link
              key={asset.id}
              href={`/browse/${asset.id}`}
              className="group block rounded-xl overflow-hidden border border-[#D0DBE8] bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-[#F0F4F8]">
                <Image
                  src={asset.previewUrl}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-[#1A1A1A] truncate">{asset.title}</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5 truncate">{asset.country} · {asset.contributorName}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet+: masonry */}
        <div className="hidden sm:block columns-2 lg:columns-3 gap-4 space-y-4">
          {featured.map((asset) => (
            <Link
              key={asset.id}
              href={`/browse/${asset.id}`}
              className="group break-inside-avoid block rounded-xl overflow-hidden border border-[#D0DBE8] bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-full overflow-hidden bg-[#F0F4F8]">
                <Image
                  src={asset.previewUrl}
                  alt={asset.title}
                  width={600}
                  height={400}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{asset.title}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{asset.country} · by {asset.contributorName}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 bg-[#003366] hover:bg-[#0057B8] text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Explore all images <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA — contribute */}
      <section className="bg-[#F0F4F8] border-y border-[#D0DBE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003366] mb-3 sm:mb-4">
            Are you an African photographer?
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
            Share your work with the world and earn from every download.
            Join 1,200+ contributors already on the platform.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center justify-center gap-2 bg-[#0057B8] hover:bg-[#004A9E] text-white px-8 py-3.5 rounded-xl font-medium transition-colors"
          >
            Start Contributing <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}