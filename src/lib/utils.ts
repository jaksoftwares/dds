import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjectStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "pending onboarding":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "active":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "in review":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "archived":
      return "bg-slate-100 text-slate-700 border-slate-300";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

export function getMilestoneStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "in_progress":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "pending":
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

export function getMeetingStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

