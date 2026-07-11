import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuoteForm } from "@/app/get-a-quote/QuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewDashboardQuotePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <Link href="/dashboard/quotes" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-customOrange transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Quotes
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Submit New Project
          </h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base max-w-2xl">
            Fill out the form below with details about your project, and our team will get back to you with a comprehensive proposal.
          </p>
        </div>
      </header>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-xl text-slate-800">Project Details</CardTitle>
          <CardDescription>We typically respond within 24 hours.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <QuoteForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
