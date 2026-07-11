import { createClient } from "@/lib/supabase/server";
import { PortfolioClient } from "./PortfolioClient";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-customBlueExtraDark">
          Portfolio CMS
        </h1>
        <p className="text-sm text-slate-600">
          Manage your published projects and case studies.
        </p>
      </header>

      <PortfolioClient initialData={portfolio || []} />
    </div>
  );
}
