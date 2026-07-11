"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitQuoteRequest } from "@/actions/quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

export function QuoteForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const res = await submitQuoteRequest(formData);
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Quote request submitted successfully! We will contact you soon.");
      if (user) {
        router.push("/dashboard/quotes");
      } else {
        router.push("/");
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {!user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" name="name" required placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required placeholder="john@example.com" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="service">What service do you need?</Label>
        <Select name="service" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a service category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Custom Website Development">Custom Website Development</SelectItem>
            <SelectItem value="Digital Platform Development">Digital Platform / Web App</SelectItem>
            <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
            <SelectItem value="UI/UX Design & Branding">UI/UX Design & Branding</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Estimated Budget</Label>
          <Select name="budget" required>
            <SelectTrigger>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than $1k">Less than $1k</SelectItem>
              <SelectItem value="$1k - $5k">$1k - $5k</SelectItem>
              <SelectItem value="$5k - $10k">$5k - $10k</SelectItem>
              <SelectItem value="$10k+">$10k+</SelectItem>
              <SelectItem value="To be discussed">To be discussed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Select name="timeline" required>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASAP (Within 1 month)">ASAP (Within 1 month)</SelectItem>
              <SelectItem value="1 - 3 months">1 - 3 months</SelectItem>
              <SelectItem value="3 - 6 months">3 - 6 months</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency</Label>
          <Select name="urgency" required>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Exploring options</SelectItem>
              <SelectItem value="medium">Medium - Ready to start soon</SelectItem>
              <SelectItem value="high">High - Need this yesterday</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Details</Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder="Please describe your project goals, features you need, and any other relevant information..."
          className="h-32"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-customOrange hover:bg-customOrange/90 text-white gap-2">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        Submit Request <ArrowRight className="w-5 h-5" />
      </Button>
    </form>
  );
}
