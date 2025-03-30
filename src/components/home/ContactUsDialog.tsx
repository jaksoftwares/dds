"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useContactUsDialog } from "@/context/useContactUsModal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Local Storage Key
const LOCAL_STORAGE_KEY = "contactFormData";

// Zod Schema for Validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  reason: z.enum(["general", "quote", "consultation"]),
  budget: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactUsDialog = () => {
  const { isContactUsDialogOpen, closeContactUsDialog } = useContactUsDialog();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "general",
    budget: "",
    date: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    // Validate form using Zod
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      console.log("Form Submitted Successfully");
      toast.success("Your message has been sent!");

      // Clear local storage and reset form
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setFormData({
        name: "",
        email: "",
        reason: "general",
        budget: "",
        date: "",
        message: "",
      });

      closeContactUsDialog();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <Dialog open={isContactUsDialogOpen} onOpenChange={closeContactUsDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
        </DialogHeader>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Contact Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for Contact <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.reason} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="quote">Request a Quote</SelectItem>
                <SelectItem value="consultation">
                  Schedule a Consultation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Fields Based on Selection */}
          {formData.reason === "quote" && (
            <div className="space-y-2">
              <Label htmlFor="budget">
                Estimated Budget <span className="text-red-500">*</span>
              </Label>
              <Input
                id="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                required
              />
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget}</p>
              )}
            </div>
          )}

          {formData.reason === "consultation" && (
            <div className="space-y-2">
              <Label htmlFor="date">
                Preferred Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Your Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsDialog;
