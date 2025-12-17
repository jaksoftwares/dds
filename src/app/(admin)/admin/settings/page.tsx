import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/lib/site-config";

const AdminSettingsPage = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Site configuration
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Maintain core information and integration settings that power
          {" "}
          {SITE_CONFIG.name}.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1.2fr] gap-4 md:gap-6">
        <Card className="p-4 md:p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Brand details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Site name
              </label>
              <Input defaultValue={SITE_CONFIG.name} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Primary contact email
              </label>
              <Input placeholder="hello@dovepeak.co.ke" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                Short description
              </label>
              <Textarea rows={3} placeholder="Brief description for meta tags." />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button className="bg-customBlueExtraDark text-white">
              Save changes
            </Button>
          </div>
        </Card>

        <Card className="p-4 md:p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Integrations
          </h2>
          <div className="space-y-3 text-xs md:text-sm text-slate-600">
            <p>
              This panel is the ideal place to surface configuration for
              external tools such as analytics, live chat, or automation
              workflows.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>WhatsApp and Tawk.to chat configuration.</li>
              <li>Analytics IDs (Google Analytics, Meta Pixel, etc.).</li>
              <li>Payment gateway and invoicing settings.</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminSettingsPage;
