import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Lightbulb, AlertTriangle } from "lucide-react";

export default async function AdminFeedbackPage() {
  const supabase = await createClient();

  const { data: feedbacks } = await supabase
    .from("client_feedbacks")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Client Feedback
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Review complaints, suggestions, and reviews from your clients.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks && feedbacks.length > 0 ? feedbacks.map((feedback: any) => (
          <Card key={feedback.id} className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="mt-0.5">
                    {feedback.type === 'review' ? (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    ) : feedback.type === 'suggestion' ? (
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-800 capitalize">
                      {feedback.type}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(feedback.created_at).toLocaleDateString()} by {feedback.profiles?.full_name || "Unknown"}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {feedback.type === 'review' && feedback.rating && (
                <div className="flex text-yellow-400 mb-2">
                  {Array.from({ length: feedback.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              )}
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{feedback.message}</p>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed rounded-xl bg-slate-50">
            No client feedback received yet.
          </div>
        )}
      </div>
    </div>
  );
}
