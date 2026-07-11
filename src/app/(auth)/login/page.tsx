"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        // Fetch role to determine redirection
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        toast.success("Successfully logged in!");
        
        if (profile?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-xl border-none rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-customBlueDark" />
        
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-customBlueExtraDark text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
            <span className="font-bold text-xl tracking-tighter">DDS</span>
          </div>
          <h1 className="text-3xl font-bold text-customBlueExtraDark tracking-tight">Welcome Back</h1>
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
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customBlueDark"
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
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customBlueDark"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-customBlueExtraDark text-white hover:bg-customBlueDark transition-all text-base font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-600 pt-4 border-t border-slate-100">
          Don't have an account?{" "}
          <Link href="/signup" className="text-customBlueDark font-semibold hover:underline">
            Sign up now
          </Link>
        </div>
      </Card>
    </div>
  );
}
