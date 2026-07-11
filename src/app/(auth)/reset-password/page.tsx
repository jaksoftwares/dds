"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSuccess(true);
      toast.success("Password updated successfully!");
      
      // Redirect to login after a brief delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      
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
          <h2 className="text-2xl font-bold text-slate-800">Password Updated</h2>
          <p className="text-slate-600 text-sm">
            Your password has been successfully reset. Redirecting you to login...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-xl border-none rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-customOrange" />
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Set New Password</h1>
          <p className="text-slate-500 text-sm">
            Please enter your new password below. Make it strong and secure!
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">New Password</Label>
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
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-customOrange"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-lg bg-customOrange text-white hover:bg-orange-600 transition-all text-base font-medium shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
