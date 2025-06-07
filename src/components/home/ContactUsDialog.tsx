"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { z } from "zod";

// Local Storage Key
const LOCAL_STORAGE_KEY = "contactFormData";

// Services options
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "Digital Platform Development",
  "Software Development",
  "SaaS Solutions",
  "Cloud Solutions & Hosting",
  "Digital Marketing & SEO",
  "Training & Consultancy",
  "AI & Data Solutions",
  "IT Infrastructure & Support",
];

// Preferred contact methods
const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Other"];

// Zod Schema for Validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(7, "Phone number must be valid").optional().or(z.literal("")),
  reason: z.enum(["general", "quote", "consultation"]),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  urgency: z.enum(["low", "medium", "high"]).optional(),
  preferredContactMethod: z.string().optional(),
  preferredContactDetails: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactUsDialog = () => {
  const { isContactUsDialogOpen, closeContactUsDialog } = useContactUsDialog();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
    reason: "general",
    service: "",
    budget: "",
    timeline: "",
    urgency: "medium",
    preferredContactMethod: "Email",
    preferredContactDetails: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission status: idle | sending | sent
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Load form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes (only when idle or sending)
  useEffect(() => {
    if (status === "idle" || status === "sending") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, status]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle select change
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      date: "",
      phone: "",
      reason: "general",
      service: "",
      budget: "",
      timeline: "",
      urgency: "medium",
      preferredContactMethod: "Email",
      preferredContactDetails: "",
      message: "",
    });
    setErrors({});
  };

  // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus("sending");

    // Validate form using Zod
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/getQuote", {
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

      setStatus("sent");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again later.");
      setStatus("idle");
    }
  };

  return (
    <Dialog open={isContactUsDialogOpen} onOpenChange={closeContactUsDialog}>
      <DialogContent
        className="max-w-lg max-h-[80vh] overflow-y-auto p-6"
        style={{ scrollbarGutter: "stable" }}
      >
        <DialogHeader>
          <DialogTitle>Get a Quote / Contact Us</DialogTitle>
        </DialogHeader>

        {status === "sent" ? (
            <div className="text-center py-10 px-4">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                Thank you for contacting Dovepeak Digital Solutions!
              </h2>
              <p className="text-gray-700">
                Message sent successfully. Please check your email for confirmation.
              </p>
              <Button
                className="mt-6"
                onClick={() => {
                  closeContactUsDialog();
                  setStatus("idle");
                }}
              >
                Close
              </Button>
            </div>
          ) : (
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
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Reason for Contact */}
            <div className="space-y-2">
              <Label htmlFor="reason">
                Reason for Contact <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.reason}
                onValueChange={(value) => handleSelectChange("reason", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="quote">Request a Quote</SelectItem>
                  <SelectItem value="consultation">Schedule a Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service Selection - shown only if quote is selected */}
            {formData.reason === "quote" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="service">
                    Service Interested In <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleSelectChange("service", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-500 text-sm">{errors.service}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">
                    Estimated Budget <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter your estimated budget (e.g., KES 50,000)"
                    required
                  />
                  {errors.budget && (
                    <p className="text-red-500 text-sm">{errors.budget}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">
                    Expected Project Timeline (Optional)
                  </Label>
                  <Input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="E.g., 3 months, ASAP, Flexible"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Project Urgency Level</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleSelectChange("urgency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredContactMethod">
                    Preferred Contact Method
                  </Label>
                  <Select
                    value={formData.preferredContactMethod}
                    onValueChange={(value) =>
                      handleSelectChange("preferredContactMethod", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.preferredContactMethod !== "Email" && (
                  <div className="space-y-2">
                    <Label htmlFor="preferredContactDetails">
                      Preferred Contact Details
                    </Label>
                    <Input
                      id="preferredContactDetails"
                      type="text"
                      value={formData.preferredContactDetails}
                      onChange={handleChange}
                      placeholder="Enter your contact details (e.g., phone number)"
                    />
                  </div>
                )}
              </>
            )}

            {/* Consultation date */}
            {formData.reason === "consultation" && (
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Consultation Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows={4}
                required
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsDialog;
