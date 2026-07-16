"use client";

import { useState } from "react";
import { createTicket } from "@/actions/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SupportForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createTicket(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Support ticket created successfully");
      const formElement = document.getElementById("support-form") as HTMLFormElement;
      if (formElement) formElement.reset();
    }
  }

  return (
    <form id="support-form" action={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Briefly describe your issue" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select name="priority" defaultValue="normal">
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Provide more details about your inquiry or issue..." 
          rows={5}
          required 
        />
      </div>

      <Button type="submit" className="w-full bg-customOrange hover:bg-customOrange/90 text-white" isLoading={loading}>
        Submit Ticket
      </Button>
    </form>
  );
}
