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
import { Check, ChevronRight, ChevronLeft, Building2, Target, DollarSign, UploadCloud } from "lucide-react";

const STEPS = [
  { id: 1, title: "General", icon: Building2 },
  { id: 2, title: "Details", icon: Target },
  { id: 3, title: "Budget", icon: DollarSign },
  { id: 4, title: "Assets", icon: UploadCloud },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    // Validate current step
    if (step === 1 && (!formData.title || !formData.company_name)) {
      toast.error("Please fill in the required fields");
      return;
    }
    if (step === 2 && !formData.project_goals) {
      toast.error("Project goals are required");
      return;
    }
    if (step === 3 && (!formData.budget_amount || !formData.budget_description)) {
      toast.error("Please provide a budget proposal");
      return;
    }
    
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 4) {
      handleNext();
      return;
    }

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
    <div className="w-full h-full flex flex-col justify-start pt-4 sm:pt-8">
      <div className="mb-10 text-left space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Tell us about your project idea</h1>
        <p className="text-slate-500 text-lg">We'd love to hear more about your vision. Fill out the details below so we can hit the ground running.</p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-12 relative w-full max-w-3xl">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0 hidden sm:block"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-customOrange -translate-y-1/2 transition-all duration-500 rounded-full z-0 hidden sm:block"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        ></div>
        <div className="relative z-10 flex justify-between items-center max-w-2xl mx-auto">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isActive ? "bg-customOrange border-customOrange text-white shadow-md shadow-orange-200" : 
                  isCompleted ? "bg-customBlueDark border-customBlueDark text-white" : "bg-white border-slate-200 text-slate-400"
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider hidden sm:block ${
                  isActive ? "text-customOrange" : isCompleted ? "text-customBlueDark" : "text-slate-400"
                }`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm relative overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-customOrange to-orange-400"></div>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 sm:p-14 min-h-[500px]">
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">General Information</h2>
                  <p className="text-sm text-slate-500">Let's start with the basic details of your project.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-700">Project Title <span className="text-red-500">*</span></Label>
                    <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Enterprise ERP System, Custom Software Solution" className="h-12 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_name" className="text-slate-700">Company / Brand Name <span className="text-red-500">*</span></Label>
                    <Input id="company_name" name="company_name" required value={formData.company_name} onChange={handleChange} placeholder="Your organization name" className="h-12 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">Project Details</h2>
                  <p className="text-sm text-slate-500">Help us understand your objectives and market.</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="project_goals" className="text-slate-700">Project Goals & Objectives <span className="text-red-500">*</span></Label>
                    <Textarea id="project_goals" name="project_goals" required rows={4} value={formData.project_goals} onChange={handleChange} placeholder="What are the main outcomes you are trying to achieve?" className="resize-none bg-white" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="target_audience" className="text-slate-700">Target Audience</Label>
                      <Input id="target_audience" name="target_audience" value={formData.target_audience} onChange={handleChange} placeholder="Who are your primary customers?" className="h-12 bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="competitors" className="text-slate-700">Competitors</Label>
                      <Input id="competitors" name="competitors" value={formData.competitors} onChange={handleChange} placeholder="List any competitors for reference" className="h-12 bg-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additional_notes" className="text-slate-700">Additional Notes</Label>
                    <Textarea id="additional_notes" name="additional_notes" rows={2} value={formData.additional_notes} onChange={handleChange} placeholder="Any specific requirements or technical constraints?" className="resize-none bg-white" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">Budget Proposal</h2>
                  <p className="text-sm text-slate-500">Define your financial expectations for this project.</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="budget_amount" className="text-slate-700">Proposed Budget (USD) <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <Input id="budget_amount" name="budget_amount" type="number" min="0" required value={formData.budget_amount} onChange={handleChange} className="pl-10 h-12 text-lg font-medium bg-white" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget_description" className="text-slate-700">Budget Details / Payment Terms Request <span className="text-red-500">*</span></Label>
                    <Textarea id="budget_description" name="budget_description" required rows={3} value={formData.budget_description} onChange={handleChange} placeholder="e.g. 50% upfront, 50% upon completion, or specific funding constraints." className="resize-none bg-white" />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">Brand Assets & Documentation</h2>
                  <p className="text-sm text-slate-500">Upload brand guidelines, RFP documents, or references.</p>
                </div>
                <div className="space-y-6">
                  
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud className="w-6 h-6 text-customOrange" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 mb-1">Upload relevant files</h3>
                    <p className="text-xs text-slate-500 mb-4">PDF, DOCX, ZIP, PNG, JPG (All formats supported)</p>
                    <FileUpload onUploadSuccess={handleUploadSuccess} buttonText="Browse Files" />
                  </div>
                  
                  {assets.length > 0 && (
                    <div className="space-y-3">
                      <Label>Attached Files ({assets.length})</Label>
                      <ul className="space-y-2">
                        {assets.map((asset, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm bg-white border border-slate-200 shadow-sm p-3 rounded-lg animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{asset.file_type.substring(0, 3)}</span>
                              </div>
                              <span className="font-medium text-slate-700 truncate">{asset.file_name}</span>
                            </div>
                            <span className="text-xs text-customOrange font-medium px-2 py-1 bg-orange-50 rounded-full shrink-0">Attached</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="p-6 sm:px-10 sm:pb-10 pt-0 flex justify-between border-t border-slate-50 mt-6 bg-slate-50/30 rounded-b-2xl">
            <Button 
              type="button" 
              variant="outline" 
              onClick={step === 1 ? () => router.back() : handleBack}
              className="h-11 px-6 font-medium text-slate-600 hover:text-slate-900 border-slate-200"
            >
              {step === 1 ? "Cancel" : <><ChevronLeft className="w-4 h-4 mr-1" /> Back</>}
            </Button>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-11 px-8 font-medium bg-customOrange hover:bg-orange-600 text-white shadow-md shadow-orange-200"
            >
              {step === 4 ? (
                isSubmitting ? "Submitting..." : "Submit Project"
              ) : (
                <span className="flex items-center">Continue <ChevronRight className="w-4 h-4 ml-1" /></span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
