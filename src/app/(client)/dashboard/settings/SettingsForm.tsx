"use client";

import { useState } from "react";
import { updateProfile, updatePassword } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SettingsForm({ initialName }: { initialName: string }) {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  async function handleProfileSubmit(formData: FormData) {
    setLoadingProfile(true);
    const result = await updateProfile(formData);
    setLoadingProfile(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully");
    }
  }

  async function handlePasswordSubmit(formData: FormData) {
    const pwd1 = formData.get("password") as string;
    const pwd2 = formData.get("confirmPassword") as string;
    
    if (pwd1 !== pwd2) {
      toast.error("Passwords do not match");
      return;
    }

    setLoadingPassword(true);
    const result = await updatePassword(formData);
    setLoadingPassword(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Password updated successfully");
      const formElement = document.getElementById("password-form") as HTMLFormElement;
      if (formElement) formElement.reset();
    }
  }

  return (
    <div className="space-y-8 mt-4">
      <form action={handleProfileSubmit} className="space-y-4">
        <h3 className="font-medium text-slate-800 border-b border-slate-100 pb-2">Personal Information</h3>
        <div className="space-y-2 max-w-md">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" defaultValue={initialName} required />
        </div>
        <Button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white" disabled={loadingProfile}>
          {loadingProfile ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Save Profile
        </Button>
      </form>

      <form id="password-form" action={handlePasswordSubmit} className="space-y-4">
        <h3 className="font-medium text-slate-800 border-b border-slate-100 pb-2">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} />
          </div>
        </div>
        <Button type="submit" className="bg-customOrange hover:bg-customOrange/90 text-white" disabled={loadingPassword}>
          {loadingPassword ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Update Password
        </Button>
      </form>
    </div>
  );
}
