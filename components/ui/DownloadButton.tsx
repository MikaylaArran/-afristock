"use client";
import { Download } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DownloadButton({ url, title, assetId }: { url: string; title: string; assetId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      await supabase.rpc("increment_downloads", { asset_id: assetId });
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-[#0057B8] hover:bg-[#004A9E] disabled:opacity-60 text-white py-3.5 rounded-xl font-medium transition-colors"
    >
      <Download size={16} />
      {loading ? "Downloading..." : "Download Free"}
    </button>
  );
}