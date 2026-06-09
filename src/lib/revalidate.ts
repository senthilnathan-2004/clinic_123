import { revalidatePath, revalidateTag } from "next/cache";

export function revalidatePublicCache() {
  revalidateTag("clinic-settings");
  revalidateTag("home-page-data");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/blogs");
  revalidatePath("/gallery");
}
