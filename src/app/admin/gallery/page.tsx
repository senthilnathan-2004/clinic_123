"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Upload, Trash2, Image as ImageIcon, Link2, Copy, Check } from "lucide-react";
import { uploadToImageKit } from "@/lib/upload";

export default function GalleryManager() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category selection states
  const [selectedCategory, setSelectedCategory] = useState("gallery");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [existingCategories, setExistingCategories] = useState<string[]>(["gallery", "doctors", "services", "about"]);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
        
        // Populate existing categories
        const cats = Array.from(new Set(data.map((img: any) => img.category))).filter(Boolean) as string[];
        const merged = Array.from(new Set(["gallery", "doctors", "services", "about", ...cats]));
        setExistingCategories(merged);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchGallery();
    }
  }, [status]);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToImageKit(file);

      const targetCategory = isCustom ? customCategory.trim().toLowerCase() : selectedCategory;
      if (!targetCategory) {
        alert("Please specify a category before uploading.");
        setUploading(false);
        return;
      }

      // Save reference in MongoDB
      const saveRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
          category: targetCategory,
          alt: file.name,
        }),
      });

      if (saveRes.ok) {
        fetchGallery();
        setCustomCategory("");
        setIsCustom(false);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages(images.filter((img) => img._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading gallery...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
          <ImageIcon className="text-primary" /> Media & Gallery Library
        </h1>
        <p className="text-sm text-slate-500 font-inter">Upload clinic photos, select categories, and manage static assets dynamically.</p>
      </div>

      {/* Upload settings control card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-700 dark:text-slate-350">Target Category</span>
            <select
              value={isCustom ? "custom" : selectedCategory}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  setIsCustom(true);
                } else {
                  setIsCustom(false);
                  setSelectedCategory(e.target.value);
                }
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none font-bold"
            >
              {existingCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
              <option value="custom">+ Create New Category...</option>
            </select>
          </div>

          {isCustom && (
            <div className="flex flex-col gap-1">
              <span className="font-bold text-slate-700 dark:text-slate-350">New Category Name</span>
              <input
                type="text"
                placeholder="e.g. equipment"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <label className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer">
          <Upload size={16} /> {uploading ? "Uploading Image..." : "Upload Target Photo"}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Grid Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative group"
          >
            <div className="h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt || "Gallery Image"} className="w-full h-full object-cover" />
            </div>

            {/* Quick Actions Panel */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{img.category}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleCopyLink(img.url, img._id)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-250 p-1.5 rounded-lg"
                  title="Copy Image URL"
                >
                  {copiedId === img._id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                  title="Delete Image"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 py-16 text-center rounded-2xl">
            <ImageIcon size={44} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-500 font-outfit">Media Library Empty</p>
            <p className="text-xs text-slate-400 mt-1 font-inter">Click the Upload button above to add clinic photos.</p>
          </div>
        )}
      </div>

    </div>
  );
}
