import { createClient } from "@/lib/supabase/server";
import { UpdatesClient } from "./UpdatesClient";

export default async function AdminUpdatesPage() {
  const supabase = await createClient();

  const { data: updates } = await supabase
    .from("updates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-customBlueExtraDark">
          Updates & News
        </h1>
        <p className="text-sm text-slate-600">
          Publish blogs, news articles, and events to keep your audience engaged.
        </p>
      </header>

      <UpdatesClient initialData={updates || []} />
    </div>
  );
}
