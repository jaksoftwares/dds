"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitProjectOnboarding } from "@/actions/project-actions";
import { FileUpload } from "@/components/shared/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    project_goals: "",
    target_audience: "",
    competitors: "",
    additional_notes: "",
    budget_amount: 0,
    budget_description: "",
  });
  
  const [assets, setAssets] = useState<{ file_url: string; file_name: string; file_type: string }[]>([]);

  const handleUploadSuccess = (file_url: string, file_name: string, file_type: string) => {
    setAssets((prev) => [...prev, { file_url, file_name, file_type }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "budget_amount" ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const projectId = await submitProjectOnboarding({
        ...formData,
        assets
      });
      toast.success("Project Onboarding Submitted Successfully");
      router.push(`/dashboard/projects/${projectId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit onboarding");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Project Onboarding</CardTitle>
          <p className="text-muted-foreground">Provide detailed information about your project to get started.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            
            {/* General Project Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. General Information</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. E-Commerce Website Redesign" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" name="company_name" required value={formData.company_name} onChange={handleChange} />
              </div>
            </div>

            <hr />

            {/* Deep Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">2. Project Details</h3>
              <div className="space-y-2">
                <Label htmlFor="project_goals">Project Goals</Label>
                <Textarea id="project_goals" name="project_goals" required rows={3} value={formData.project_goals} onChange={handleChange} placeholder="What are you trying to achieve?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_audience">Target Audience</Label>
                <Input id="target_audience" name="target_audience" value={formData.target_audience} onChange={handleChange} placeholder="Who are your customers?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitors">Competitors</Label>
                <Input id="competitors" name="competitors" value={formData.competitors} onChange={handleChange} placeholder="List any competitors for reference" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional_notes">Additional Notes</Label>
                <Textarea id="additional_notes" name="additional_notes" rows={2} value={formData.additional_notes} onChange={handleChange} />
              </div>
            </div>

            <hr />

            {/* Budget Proposal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">3. Budget Proposal</h3>
              <div className="space-y-2">
                <Label htmlFor="budget_amount">Proposed Budget ($)</Label>
                <Input id="budget_amount" name="budget_amount" type="number" min="0" required value={formData.budget_amount} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget_description">Budget Details / Payment Terms Request</Label>
                <Textarea id="budget_description" name="budget_description" required rows={2} value={formData.budget_description} onChange={handleChange} />
              </div>
            </div>

            <hr />

            {/* Assets */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">4. Brand Assets & Documentation</h3>
              <p className="text-sm text-muted-foreground">Upload brand guidelines, proposals, references, or any relevant documents (All formats supported).</p>
              
              <FileUpload onUploadSuccess={handleUploadSuccess} />
              
              {assets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {assets.map((asset, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-2 rounded-md">
                      <span className="font-medium truncate max-w-[200px]">{asset.file_name}</span>
                      <span className="text-xs px-2 py-1 bg-background rounded-full border">{asset.file_type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
