import { unstable_cache } from "next/cache";
import { dbConnect } from "@/lib/db";
import {
  ClinicSettings,
  Doctor,
  Service,
  FAQ,
  Review,
  BlogPost,
  Gallery,
} from "@/lib/models/schemas";

export const REVALIDATE_SECONDS = 60;

export const getClinicSettings = unstable_cache(
  async () => {
    await dbConnect();
    return ClinicSettings.findOne().lean();
  },
  ["clinic-settings"],
  { revalidate: REVALIDATE_SECONDS, tags: ["clinic-settings"] }
);

export const getHomePageData = unstable_cache(
  async () => {
    await dbConnect();

    const [settings, doctors, services, faqs, reviews, posts, gallery] =
      await Promise.all([
        ClinicSettings.findOne().lean(),
        Doctor.find().lean(),
        Service.find().lean(),
        FAQ.find().sort({ order: 1 }).lean(),
        Review.find({ isApproved: true }).lean(),
        BlogPost.find({ published: true })
          .select("_id title slug excerpt imageUrl author category createdAt")
          .sort({ createdAt: -1 })
          .limit(6)
          .lean(),
        Gallery.find()
          .select("_id url category alt")
          .sort({ createdAt: -1 })
          .limit(24)
          .lean(),
      ]);

    const safeGallery = gallery.filter(
      (img) =>
        typeof img.url === "string" &&
        (!img.url.startsWith("data:") || img.url.length < 8000)
    );

    return {
      settings,
      doctors,
      services,
      faqs,
      reviews,
      posts,
      gallery: safeGallery,
    };
  },
  ["home-page-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["home-page-data"] }
);
