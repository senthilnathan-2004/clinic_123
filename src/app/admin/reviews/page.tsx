"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Star, Check, X, Trash2, Plus, StarOff } from "lucide-react";

export default function ReviewsManager() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchReviews();
    }
  }, [status]);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews(reviews.map((rev) => (rev._id === id ? updated : rev)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReviews(reviews.filter((rev) => rev._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, rating, reviewText, photoUrl, isApproved: true };

    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchReviews();
        setIsOpen(false);
        setName("");
        setReviewText("");
        setPhotoUrl("");
        setRating(5);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading reviews...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="text-primary" /> Testimonial Reviews
          </h1>
          <p className="text-sm text-slate-500 font-inter">Moderate patient feedback displayed on the public landing page.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus size={16} /> Add Custom Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm relative"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                {rev.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{rev.name}</h4>
                <div className="flex gap-0.5 text-amber-500 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < rev.rating ? "fill-current" : "opacity-35"} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-405 leading-relaxed font-inter italic mt-1">
              "{rev.reviewText}"
            </p>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                rev.isApproved 
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400" 
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
              }`}>
                {rev.isApproved ? "Approved" : "Pending Approval"}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => handleToggleApproval(rev._id, rev.isApproved)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                  title="Toggle Approval Status"
                >
                  {rev.isApproved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Review Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
            <header className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-sm font-extrabold font-outfit text-slate-900 dark:text-white">
                Add Custom Review
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Close</button>
            </header>

            <form onSubmit={handleAddReview} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Patient Name</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abhishek Raman"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Rating (1 to 5 Stars)</label>
                  <select
                    value={rating} onChange={(e) => setRating(parseInt(e.target.value))}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Review Comment</label>
                <textarea
                  rows={4} required value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Paste patient review text..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer text-xs mt-2"
              >
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
