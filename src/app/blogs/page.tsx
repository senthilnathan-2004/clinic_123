import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { dbConnect } from "@/lib/db";
import { ClinicSettings, BlogPost } from "@/lib/models/schemas";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export const revalidate = 30;

export default async function AllBlogs() {
  await dbConnect();

  const settings = await ClinicSettings.findOne();
  const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();

  const safeSettings = JSON.parse(JSON.stringify(settings));
  const safePosts = JSON.parse(JSON.stringify(posts));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} />

      <main className="flex-grow pt-28 pb-20 bg-slate-50 dark:bg-slate-900/50 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with back button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/#blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-xl border border-primary/20 hover:border-transparent transition-all duration-300 self-start mb-2"
              >
                <ArrowLeft size={14} /> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
                Health Blogs & Advisories
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                Tips, medical updates, and health insights from our experienced clinical practitioners.
              </p>
            </div>
            <div className="text-xs bg-primary/10 text-primary px-4 py-2 rounded-2xl font-bold font-outfit self-start md:self-center">
              Total Articles: {safePosts.length}
            </div>
          </div>

          {/* Grid Layout */}
          {safePosts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-slate-550 dark:text-slate-400 font-semibold font-inter">No blog posts published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safePosts.map((post: any, idx: number) => (
                <div
                  key={post._id || idx}
                  className="bg-white dark:bg-slate-900 flex flex-col h-full rounded-3xl overflow-hidden shadow-sm border border-slate-150 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Blog Image */}
                  {post.imageUrl && (
                    <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  )}

                  {/* Content Panel */}
                  <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500 dark:text-slate-404 font-medium font-inter">
                        <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                      <h4 className="text-lg font-bold font-outfit text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-655 dark:text-slate-400 font-inter line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-inter leading-relaxed whitespace-pre-line italic line-clamp-4">
                        {post.content.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer settings={safeSettings} />
    </div>
  );
}
