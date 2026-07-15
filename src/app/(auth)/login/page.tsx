"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Lock, ArrowRight, ExternalLink, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleResendVerification = async () => {
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification email resent! Please check your inbox.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setResending(false);
    }
  };

  const getMailboxUrl = (email: string) => {
    const lower = email.toLowerCase();
    if (lower.endsWith("@gmail.com")) return "https://mail.google.com";
    if (lower.endsWith("@outlook.com") || lower.endsWith("@hotmail.com")) return "https://outlook.live.com";
    if (lower.endsWith("@yahoo.com")) return "https://mail.yahoo.com";
    return null;
  };
  
  const mailboxUrl = getMailboxUrl(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setShowVerificationModal(true);
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        toast.success("Successfully logged in! Redirecting...");
        router.push("/dashboard");
        router.refresh();
        // Intentionally not setting loading to false here so the button stays disabled while routing
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to your {SITE_CONFIG.name} account to manage your projects.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <Link href="/forgot-password" className="text-xs text-customOrange font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customOrange"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-customOrange text-white hover:bg-orange-600 transition-all text-base font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-600 pt-4 border-t border-slate-100">
          Don't have an account?{" "}
          <Link href="/signup" className="text-customOrange font-semibold hover:underline">
            Sign up now
          </Link>
        </div>
      </Card>

      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Verify your email</DialogTitle>
            <DialogDescription className="pt-2 text-slate-600">
              Your email <span className="font-medium text-slate-900">{email}</span> needs to be verified before you can log in. 
              Please check your inbox for the verification link.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            {mailboxUrl && (
              <Button 
                variant="outline" 
                className="w-full sm:w-auto" 
                onClick={() => window.open(mailboxUrl, "_blank")}
                type="button"
              >
                Access Mailbox
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Button 
              className="w-full sm:w-auto bg-customOrange text-white hover:bg-orange-600"
              onClick={handleResendVerification}
              disabled={resending}
              type="button"
            >
              {resending ? "Resending..." : "Resend Verification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
