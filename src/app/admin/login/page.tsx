import { getClinicSettings } from "@/lib/data";
import { AdminLoginClient } from "./AdminLoginClient";

export default async function AdminLogin() {
  const settings = await getClinicSettings();
  return <AdminLoginClient settings={settings} />;
}
