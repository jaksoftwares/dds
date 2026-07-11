import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FeedbackForm } from "./FeedbackForm";
import { MessageCircle, Star, AlertTriangle, Lightbulb } from "lucide-react";

export default async function ClientFeedbackPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Feedbacks
  const { data: feedbacks } = await supabase
    .from("client_feedbacks")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Feedback
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Share your experience, suggest improvements, or report issues.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="border-slate-200 sticky top-6">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Submit Feedback</CardTitle>
              <CardDescription>We value your input to serve you better.</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Your Past Feedback</h2>
          {feedbacks && feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="border-slate-200">
                  <CardHeader className="pb-2">
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
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {feedback.type === 'review' && feedback.rating && (
                        <div className="ml-auto flex text-yellow-400">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{feedback.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
              <MessageCircle className="w-12 h-12 text-slate-300" />
              <p>You haven't submitted any feedback yet.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
