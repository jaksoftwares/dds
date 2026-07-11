import { createClient } from "@/lib/supabase/server";
import { ServicesClient } from "./ServicesClient";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-customBlueExtraDark">
          Services CMS
        </h1>
        <p className="text-sm text-slate-600">
          Manage the services offered by DovePeak Digital Solutions.
        </p>
      </header>

      <ServicesClient initialData={services || []} />
    </div>
  );
}
