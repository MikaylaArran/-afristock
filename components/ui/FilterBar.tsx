"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { REGIONS, ASSET_TYPES } from "@/lib/mock-data";

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const currentRegion = params.get("region") ?? "all";
  const currentType = params.get("type") ?? "all";

  const update = (key: string, value: string) => {
    const p = new URLSearchParams(params.toString());
    if (value === "all") {
      p.delete(key);
    } else {
      p.set(key, value);
    }
    startTransition(() => router.push(`/browse?${p.toString()}`));
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Region filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Region</span>
        <div className="flex gap-1.5 flex-wrap">
          {REGIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => update("region", r.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${currentRegion === r.value
                  ? "bg-[#0057B8] text-white"
                  : "bg-white border border-[#D0DBE8] text-[#1A1A1A] hover:border-[#0057B8] hover:text-[#0057B8]"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Type</span>
        <div className="flex gap-1.5 flex-wrap">
          {ASSET_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => update("type", t.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${currentType === t.value
                  ? "bg-[#003366] text-white"
                  : "bg-white border border-[#D0DBE8] text-[#1A1A1A] hover:border-[#003366] hover:text-[#003366]"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}