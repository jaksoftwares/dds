"use client";

import { useState } from "react";
import { submitFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("review");
  const [rating, setRating] = useState(5);

  async function handleSubmit(formData: FormData) {
    formData.set("type", type);
    if (type === "review") {
      formData.set("rating", rating.toString());
    }

    setLoading(true);
    const result = await submitFeedback(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Thank you for your feedback!");
      const formElement = document.getElementById("feedback-form") as HTMLFormElement;
      if (formElement) formElement.reset();
      setRating(5);
    }
  }

  return (
    <form id="feedback-form" action={handleSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label htmlFor="type">Feedback Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="suggestion">Suggestion</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === "review" && (
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={cn(
                  "p-1 hover:scale-110 transition-transform",
                  star <= rating ? "text-yellow-400" : "text-slate-200"
                )}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder={
            type === "review" ? "Tell us about your experience..." :
            type === "suggestion" ? "How can we improve?" :
            "What went wrong?"
          }
          rows={5}
          required 
        />
      </div>

      <Button type="submit" className="w-full bg-customOrange hover:bg-customOrange/90 text-white" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Submit Feedback
      </Button>
    </form>
  );
}
