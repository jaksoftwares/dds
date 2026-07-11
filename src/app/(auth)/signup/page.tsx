"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSuccess(true);
      toast.success("Account created! Please check your email to verify.");
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
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Verify your email</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We've sent a secure verification link to <strong className="text-slate-800">{email}</strong>. Please click the link to activate your account and access your dashboard.
          </p>
          <div className="pt-4">
            <Button asChild variant="outline" className="w-full h-12 rounded-lg border-slate-200 hover:bg-slate-50">
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
        
        <div className="text-center space-y-3">
          <Image 
            src="/core/logo-base.png" 
            alt="DovePeak" 
            width={120} 
            height={40} 
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create an Account</h1>
          <p className="text-sm text-slate-500">Join {SITE_CONFIG.name} to track your projects and communicate directly with our team.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customOrange"
                />
              </div>
            </div>

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

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customOrange"
                />
              </div>
              <p className="text-xs text-slate-400">Must be at least 6 characters long.</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-customOrange text-white hover:bg-orange-600 transition-all text-base font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up Free"}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-600 pt-4 border-t border-slate-100">
          Already have an account?{" "}
          <Link href="/login" className="text-customOrange font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
