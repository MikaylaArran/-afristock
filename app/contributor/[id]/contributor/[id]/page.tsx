import { supabase } from "@/lib/supabase";
import { MOCK_ASSETS } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Grid2X2, Download } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

async function getContributor(id: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

async function getContributorAssets(contributorId: string) {
  try {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .eq("contributor_id", contributorId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_ASSETS.filter((a) => a.contributorId === contributorId);
    }
    return data;
  } catch {
    return MOCK_ASSETS.filter((a) => a.contributorId === contributorId);
  }
}

export default async function ContributorPage({ params }: Props) {
  const { id } = await params;
  const contributor = await getContributor(id);

  const mockContributor = MOCK_ASSETS.find((a) => a.contributorId === id);
  if (!contributor && !mockContributor) notFound();

  const name = contributor?.full_name || contributor?.username || mockContributor?.contributorName || "Contributor";
  const country = contributor?.country || mockContributor?.country || "";
  const bio = contributor?.bio || "Passionate African photographer sharing stories through the lens.";
  const assets = await getContributorAssets(id);

  const totalDownloads = assets.reduce((sum: number, a: any) => sum + (a.downloads || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 p-6 bg-white rounded-2xl border border-[#E2D8C8]">
        <div className="w-20 h-20 rounded-full bg-[#E2C89E] flex items-center justify-center text-2xl font-bold text-[#7A5025] shrink-0">
          {name.split(" ").map((n: string) => n[0]).join("")}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#2C1A0E]">
            {name}
          </h1>
          {country && (
            <p className="flex items-center justify-center sm:justify-start gap-1 text-sm text-[#A08060] mt-1">
              <MapPin size={13} /> {country}
            </p>
          )}
          <p className="text-sm text-[#7A6050] mt-3 max-w-lg">{bio}</p>
        </div>
        {/* Stats */}
        <div className="flex sm:flex-col gap-6 sm:gap-3 text-center shrink-0">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#2C1A0E]">
              {assets.length}
            </p>
            <p className="text-xs text-[#A08060] flex items-center gap-1 justify-center">
              <Grid2X2 size={11} /> Photos
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#2C1A0E]">
              {totalDownloads}
            </p>
            <p className="text-xs text-[#A08060] flex items-center gap-1 justify-center">
              <Download size={11} /> Downloads
            </p>
          </div>
        </div>
      </div>

      {/* Assets grid */}
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2C1A0E] mb-6">
        Portfolio
      </h2>

      {assets.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {assets.map((asset: any) => (
            <Link
              key={asset.id}
              href={`/browse/${asset.id}`}
              className="group rounded-xl overflow-hidden border border-[#E2D8C8] bg-white hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 bg-[#E8DECE]">
                <Image
                  src={asset.previewUrl || asset.preview_url || ""}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-[#2C1A0E] truncate">{asset.title}</p>
                <p className="text-[10px] text-[#A08060] mt-0.5">{asset.downloads || 0} downloads</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#A08060]">
          <p className="text-4xl mb-3">📷</p>
          <p className="text-sm">No photos yet</p>
        </div>
      )}
    </div>
  );
}