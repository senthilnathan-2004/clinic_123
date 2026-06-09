"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Edit3, Trash2, BookOpen, FileText } from "lucide-react";
import { uploadToImageKit } from "@/lib/upload";

export default function BlogManager() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Dr. Sugam");
  const [category, setCategory] = useState("Child Health");
  const [published, setPublished] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  const openAddModal = () => {
    setEditingPost(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setImageUrl("");
    setAuthor("Dr. Sugam");
    setCategory("Child Health");
    setPublished(true);
    setIsOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImageUrl(post.imageUrl || "");
    setAuthor(post.author || "Dr. Sugam");
    setCategory(post.category || "Child Health");
    setPublished(post.published !== false);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, excerpt, content, imageUrl, author, category, published };

    try {
      let url = "/api/admin/blogs";
      let method = "POST";
      if (editingPost) {
        url = `/api/admin/blogs?id=${editingPost._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchPosts();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading blogs...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-primary" /> Health Blog Posts
          </h1>
          <p className="text-sm text-slate-500 font-inter">Publish medical updates, nutrition tips, and general advice.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus size={16} /> Write New Post
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-sm relative overflow-hidden"
          >
            {p.imageUrl && (
              <div className="w-full h-40 bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="p-5 flex flex-col gap-2 flex-grow">
              <span className="text-[10px] font-bold text-primary uppercase">{p.category}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit line-clamp-2">{p.title}</h3>
              <p className="text-xs text-slate-500 font-inter line-clamp-3 leading-relaxed">{p.excerpt}</p>
              <div className="text-[10px] text-slate-400 font-medium mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                By {p.author} • {p.published ? "Published" : "Draft"}
              </div>
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-1">
              <button
                onClick={() => openEditModal(p)}
                className="bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 p-1.5 rounded-lg shadow-sm"
              >
                <Edit3 size={13} />
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg shadow-sm"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <header className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-sm font-extrabold font-outfit text-slate-900 dark:text-white">
                {editingPost ? "Edit Blog Post" : "Write Blog Post"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Close</button>
            </header>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Post Title</label>
                  <input
                    type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Healthy Eating Habits for Children"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Author Name</label>
                  <input
                    type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Category</label>
                  <input
                    type="text" required value={category} onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Child Care, Gastro Health"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Status</label>
                  <select
                    value={published ? "true" : "false"}
                    onChange={(e) => setPublished(e.target.value === "true")}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-700 dark:text-slate-350">Post Cover Image</label>
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-850 flex-shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste URL or select file below..."
                    className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const url = await uploadToImageKit(file);
                        setImageUrl(url);
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Short Summary / Excerpt</label>
                <textarea
                  rows={2} required value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Provide a short sentence snippet summarizing the blog..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-inter"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Post Content</label>
                <textarea
                  rows={6} required value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the detailed health post content here..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-inter"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer text-xs mt-2"
              >
                Publish Blog Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
