"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSuccess(true);
      toast.success("Password reset link sent!");
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6 shadow-xl border-none rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-customOrange" />
          <div className="mx-auto w-16 h-16 bg-orange-50 text-customOrange rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Check your inbox</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We've sent a password reset link to <strong>{email}</strong>. Please check your email and click the link to reset your password.
          </p>
          <div className="pt-4">
            <Button asChild variant="outline" className="w-full h-12 rounded-lg border-slate-200">
              <Link href="/login">Return to Login</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-xl border-none rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-customOrange" />
        
        <div className="space-y-3">
          <Link href="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-customOrange transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Forgot Password</h1>
          <p className="text-slate-500 text-sm">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customOrange"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-customOrange text-white hover:bg-orange-600 transition-all text-base font-medium shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
