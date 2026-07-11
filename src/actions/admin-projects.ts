"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMilestone(formData: FormData) {
  const supabase = await createClient();
  const projectId = formData.get("project_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const preview_url = formData.get("preview_url") as string;

  if (!projectId || !title) {
    return { error: "Project ID and Title are required" };
  }

  const { error } = await supabase
    .from("project_milestones")
    .insert({
      project_id: projectId,
      title,
      description,
      status: status || "pending",
      preview_url: preview_url || null,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/projects/${projectId}`);
  return { success: true };
}

export async function updateProjectDetails(formData: FormData) {
  const supabase = await createClient();
  const projectId = formData.get("project_id") as string;
  const details = formData.get("details") as string;
  const progress_percentage = parseInt(formData.get("progress_percentage") as string);
  const status = formData.get("status") as string;

  if (!projectId) {
    return { error: "Project ID is required" };
  }

  const { error } = await supabase
    .from("client_projects")
    .update({
      details,
      progress_percentage: isNaN(progress_percentage) ? 0 : progress_percentage,
      status,
    })
    .eq("id", projectId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/admin/projects`);
  return { success: true };
}
