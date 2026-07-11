import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default async function ClientQuotesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Quotes
  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Proposals & Quotes
          </h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            Track your requested services and active proposals.
          </p>
        </div>
        <Button asChild className="bg-customOrange hover:bg-customOrange/90 text-white gap-2">
          <Link href="/get-a-quote">
            <PlusCircle className="w-4 h-4" />
            Submit New Proposal
          </Link>
        </Button>
      </header>

      {quotes && quotes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-customOrange">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-800">
                        {quote.service || quote.reason}
                      </CardTitle>
                      <CardDescription className="text-sm mt-0.5">
                        Submitted on {new Date(quote.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={quote.status === "completed" ? "default" : quote.status === "reviewed" ? "secondary" : "outline"} 
                    className={
                      quote.status === "completed" ? "bg-green-600" : 
                      quote.status === "reviewed" ? "bg-blue-600 text-white" : 
                      "bg-white text-slate-600"
                    }
                  >
                    {quote.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</h4>
                      <p className="text-sm text-slate-800 font-medium mt-1">{quote.budget || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Timeline</h4>
                      <p className="text-sm text-slate-800 font-medium mt-1">{quote.timeline || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgency</h4>
                      <p className="text-sm text-slate-800 font-medium mt-1 capitalize">{quote.urgency || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</h4>
                      <p className="text-sm text-slate-700 mt-1 line-clamp-3">{quote.message}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
          <FileText className="w-12 h-12 text-slate-300" />
          <p>You haven't requested any quotes or submitted proposals yet.</p>
        </Card>
      )}
    </div>
  );
}
