import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SettingsForm } from "./SettingsForm";
import { Settings as SettingsIcon } from "lucide-react";

export default async function ClientSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Account Settings
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Manage your personal information and security preferences.
        </p>
      </header>

      <div className="max-w-3xl">
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-200 rounded-lg text-slate-600">
                <SettingsIcon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Profile Configuration</CardTitle>
                <CardDescription>
                  Your account is registered to <strong>{profile?.email}</strong>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <SettingsForm initialName={profile?.full_name || ""} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
