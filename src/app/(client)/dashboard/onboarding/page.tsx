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
import { Check, ChevronRight, ChevronLeft, Building2, Target, DollarSign, UploadCloud, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STEPS = [
  { id: 1, title: "General", icon: Building2 },
  { id: 2, title: "Details", icon: Target },
  { id: 3, title: "Budget", icon: DollarSign },
  { id: 4, title: "Assets", icon: UploadCloud },
];

const TAXONOMY: Record<string, string[]> = {
  "Enterprise Software Solutions": ["CRM (Customer Relationship Management)", "ERP (Enterprise Resource Planning)", "LMS (Learning Management Systems)", "HMS (Hospital Management Systems)", "HRMS (Human Resources Management)"],
  "Web & Mobile Applications": ["E-Commerce Platform", "SaaS Platform", "Customer Portal / Dashboard", "Native iOS App", "Native Android App", "Cross-Platform App (iOS & Android)"],
  "IT Infrastructure & Security": ["Cyber Security Support & Auditing", "Network Setup & Architecture", "Cloud Migration & Hosting"],
  "Digital Marketing & SEO": ["SEO Optimization", "Branding & Identity", "Social Media Management"]
};

const INDUSTRIES = ["Education & E-Learning", "Healthcare & Medical", "Real Estate & Property Management", "Non-Governmental Organizations (NGOs)", "Finance & FinTech", "Retail & E-Commerce", "Logistics & Supply Chain", "Manufacturing", "Technology & Software"];
const CLIENT_SEGMENTS = ["MSMEs (Micro, Small & Medium)", "SMEs (Small & Medium)", "Enterprise Organizations", "Startups & Entrepreneurs", "Government & Public Sector", "Direct Consumers (B2C)"];
const CURRENCIES = ["USD", "EUR", "GBP", "KES"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    project_goals: "",
    solution_category: "",
    specific_type: "",
    industry: "",
    client_segment: "",
    additional_notes: "",
    budget_currency: "USD",
    budget_amount: 0,
    budget_description: "",
    payment_policy_accepted: false,
  });
  
  // Structured state
  const [targetMarket, setTargetMarket] = useState({ market: "", demographics: "", characteristics: "" });
  const [competitors, setCompetitors] = useState<{name: string, link: string}[]>([{ name: "", link: "" }]);
  const [assets, setAssets] = useState<{ file_url: string; file_name: string; file_type: string }[]>([]);

  const handleUploadSuccess = (file_url: string, file_name: string, file_type: string) => {
    setAssets((prev) => [...prev, { file_url, file_name, file_type }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: name === "budget_amount" ? parseFloat(value) || 0 : value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const updates = { ...prev, [name]: value };
      if (name === "solution_category") updates.specific_type = ""; // Reset child if parent changes
      return updates;
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.title || !formData.company_name || !formData.solution_category || !formData.specific_type || !formData.industry || !formData.client_segment)) {
      toast.error("Please fill in all required general fields");
      return;
    }
    if (step === 2 && (!formData.project_goals)) {
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
    if (!formData.payment_policy_accepted) {
      toast.error("You must accept the payment policies to submit.");
      return;
    }

    try {
      setIsSubmitting(true);
      const projectId = await submitProjectOnboarding({
        ...formData,
        target_market_details: targetMarket,
        competitors_list: competitors.filter(c => c.name.trim() !== ""),
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
    <div className="w-full flex flex-col justify-start pt-4 sm:pt-8 pb-10">
      <div className="mb-10 text-left space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Tell us about your project</h1>
        <p className="text-slate-500 text-lg">Select the options that best describe your vision.</p>
      </div>

      <div className="mb-12 relative w-full max-w-3xl">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0 hidden sm:block"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-customOrange -translate-y-1/2 transition-all duration-500 rounded-full z-0 hidden sm:block"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        ></div>
        <div className="relative z-10 flex justify-between items-center max-w-2xl mx-auto">
          {STEPS.map((s) => {
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

      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-customOrange to-orange-400"></div>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 sm:p-14 min-h-[500px]">
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">General Information</h2>
                  <p className="text-sm text-slate-500">Let's establish the exact scope of your project.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-700">Project Title <span className="text-red-500">*</span></Label>
                    <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. CRM System Upgrade" className="h-12 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_name" className="text-slate-700">Company Name <span className="text-red-500">*</span></Label>
                    <Input id="company_name" name="company_name" required value={formData.company_name} onChange={handleChange} placeholder="Your organization" className="h-12 bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Primary Solution Category <span className="text-red-500">*</span></Label>
                    <Select value={formData.solution_category} onValueChange={(v) => handleSelectChange("solution_category", v)}>
                      <SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select Category" /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(TAXONOMY).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-700">Specific Type / Platform <span className="text-red-500">*</span></Label>
                    <Select value={formData.specific_type} onValueChange={(v) => handleSelectChange("specific_type", v)} disabled={!formData.solution_category}>
                      <SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select Type" /></SelectTrigger>
                      <SelectContent>
                        {formData.solution_category && TAXONOMY[formData.solution_category].map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Industry / Sector <span className="text-red-500">*</span></Label>
                    <Select value={formData.industry} onValueChange={(v) => handleSelectChange("industry", v)}>
                      <SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select Industry" /></SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-700">Target Client Segment <span className="text-red-500">*</span></Label>
                    <Select value={formData.client_segment} onValueChange={(v) => handleSelectChange("client_segment", v)}>
                      <SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select Segment" /></SelectTrigger>
                      <SelectContent>
                        {CLIENT_SEGMENTS.map(seg => <SelectItem key={seg} value={seg}>{seg}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-semibold text-slate-800">Deep Details</h2>
                  <p className="text-sm text-slate-500">Help us understand the specifics of your market.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project_goals" className="text-slate-700">Project Goals & Objectives <span className="text-red-500">*</span></Label>
                  <Textarea id="project_goals" name="project_goals" required rows={3} value={formData.project_goals} onChange={handleChange} placeholder="What are the main outcomes you are trying to achieve?" className="resize-none bg-white" />
                </div>

                <div className="border rounded-lg p-5 bg-slate-50/50 space-y-4">
                  <h3 className="font-semibold text-slate-800 text-sm">Target Market Specifics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Core Market</Label>
                      <Input value={targetMarket.market} onChange={e => setTargetMarket(p => ({...p, market: e.target.value}))} placeholder="e.g. Local Gen Z" className="h-10 bg-white text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Demographics</Label>
                      <Input value={targetMarket.demographics} onChange={e => setTargetMarket(p => ({...p, demographics: e.target.value}))} placeholder="e.g. Age 18-25, Students" className="h-10 bg-white text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Characteristics</Label>
                      <Input value={targetMarket.characteristics} onChange={e => setTargetMarket(p => ({...p, characteristics: e.target.value}))} placeholder="e.g. Tech-savvy" className="h-10 bg-white text-sm" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-5 bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 text-sm">Competitor Analysis</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => setCompetitors(p => [...p, {name: "", link: ""}])} className="h-8 text-xs"><Plus className="w-3 h-3 mr-1"/> Add Competitor</Button>
                  </div>
                  {competitors.map((comp, idx) => (
                    <div key={idx} className="flex gap-3 items-end">
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-slate-500">Competitor Name</Label>
                        <Input value={comp.name} onChange={e => setCompetitors(p => { const n = [...p]; n[idx].name = e.target.value; return n; })} placeholder="Name" className="h-10 bg-white text-sm" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-slate-500">Website URL</Label>
                        <Input value={comp.link} onChange={e => setCompetitors(p => { const n = [...p]; n[idx].link = e.target.value; return n; })} placeholder="https://" className="h-10 bg-white text-sm" />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => setCompetitors(p => p.filter((_, i) => i !== idx))} disabled={competitors.length === 1} className="h-10 w-10 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional_notes" className="text-slate-700">Technical Constraints / Notes</Label>
                  <Textarea id="additional_notes" name="additional_notes" rows={2} value={formData.additional_notes} onChange={handleChange} placeholder="Any specific requirements?" className="resize-none bg-white" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800">Budget Proposal</h2>
                  <p className="text-sm text-slate-500">Define your financial expectations.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="space-y-2 sm:col-span-1">
                    <Label className="text-slate-700">Currency</Label>
                    <Select value={formData.budget_currency} onValueChange={(v) => handleSelectChange("budget_currency", v)}>
                      <SelectTrigger className="h-12 bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-3">
                    <Label htmlFor="budget_amount" className="text-slate-700">Proposed Budget <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <Input id="budget_amount" name="budget_amount" type="number" min="0" required value={formData.budget_amount} onChange={handleChange} className="pl-10 h-12 text-lg font-medium bg-white" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget_description" className="text-slate-700">Budget Details / Payment Terms <span className="text-red-500">*</span></Label>
                  <Textarea id="budget_description" name="budget_description" required rows={3} value={formData.budget_description} onChange={handleChange} placeholder="e.g. 50% upfront, 50% upon completion" className="resize-none bg-white" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col min-h-[400px]">
                <div className="space-y-1 mb-6">
                  <h2 className="text-2xl font-semibold text-slate-800">Final Assets & Submission</h2>
                  <p className="text-sm text-slate-500">Upload any supporting documents, wireframes, or brand guides.</p>
                </div>
                
                <div className="flex-1 min-h-0 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center p-6 relative group overflow-hidden">
                   <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                     <span className="bg-customBlueBase text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">Upload Files</span>
                   </div>
                   <FileUpload 
                     onUploadSuccess={handleUploadSuccess}
                   />
                   
                   {assets.length > 0 && (
                     <div className="absolute bottom-4 left-4 right-4 z-20">
                       <div className="bg-white p-3 rounded-lg border shadow-sm flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                         {assets.map((a, i) => (
                           <div key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600 border flex items-center gap-2">
                             <Check className="w-3 h-3 text-green-500" />
                             {a.file_name}
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                </div>

                <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex items-start gap-3 mt-4">
                  <input type="checkbox" id="payment_policy_accepted" name="payment_policy_accepted" checked={formData.payment_policy_accepted} onChange={handleChange} className="mt-1 w-4 h-4 rounded border-slate-300 text-customOrange focus:ring-customOrange" />
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <label htmlFor="payment_policy_accepted" className="font-medium text-slate-900 cursor-pointer block mb-1">Accept Payment Policies</label>
                    I acknowledge and agree to DovePeak Digital's standard billing and payment policies. I understand that project initiation requires a formally signed agreement and initial deposit as structured in the final quotation.
                  </div>
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="px-8 sm:px-14 pb-10 pt-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting} className="w-[120px] h-12 rounded-xl text-slate-600 bg-white">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            {step < 4 ? (
              <Button type="button" onClick={handleNext} className="w-[120px] h-12 rounded-xl bg-customBlueExtraDark hover:bg-customBlueBase transition-all shadow-lg hover:shadow-customBlueBase/20 text-white">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || !formData.payment_policy_accepted} className="w-[160px] h-12 rounded-xl bg-customOrange hover:bg-[#e64700] transition-all shadow-lg hover:shadow-customOrange/20 text-white font-semibold">
                {isSubmitting ? "Submitting..." : "Submit Project"} <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
