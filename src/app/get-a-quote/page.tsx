import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuoteForm } from "./QuoteForm";

export default async function GetAQuotePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Let's Build Something Great
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the form below with details about your project, and our team will get back to you with a comprehensive proposal and quote.
          </p>
        </header>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-white border-b border-slate-100">
            <CardTitle className="text-2xl text-slate-800">Project Details</CardTitle>
            <CardDescription>We typically respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 bg-white">
            <QuoteForm user={user} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
