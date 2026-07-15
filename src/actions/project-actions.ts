"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitProjectOnboarding(data: {
  title: string;
  company_name: string;
  project_goals: string;
  target_audience: string;
  competitors: string;
  additional_notes: string;
  budget_amount: number;
  budget_description: string;
  assets: { file_url: string; file_name: string; file_type: string }[];
}) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("Unauthorized");
  }

  const clientId = userData.user.id;

  // 1. Create the project
  const { data: project, error: projectError } = await supabase
    .from("client_projects")
    .insert({
      client_id: clientId,
      title: data.title,
      status: "Pending Onboarding",
    })
    .select()
    .single();

  if (projectError) throw new Error(projectError.message);

  const projectId = project.id;

  // 2. Create the project brief
  const { error: briefError } = await supabase.from("project_briefs").insert({
    project_id: projectId,
    company_name: data.company_name,
    project_goals: data.project_goals,
    target_audience: data.target_audience,
    competitors: data.competitors,
    additional_notes: data.additional_notes,
  });

  if (briefError) throw new Error(briefError.message);

  // 3. Create budget proposal
  if (data.budget_amount > 0 || data.budget_description) {
    const { error: budgetError } = await supabase.from("project_financials").insert({
      project_id: projectId,
      client_id: clientId,
      type: "budget_proposal",
      amount: data.budget_amount,
      description: data.budget_description,
    });
    if (budgetError) throw new Error(budgetError.message);
  }

  // 4. Attach assets
  if (data.assets && data.assets.length > 0) {
    const assetInserts = data.assets.map((asset) => ({
      project_id: projectId,
      client_id: clientId,
      file_url: asset.file_url,
      file_name: asset.file_name,
      file_type: asset.file_type,
      uploaded_by: clientId,
    }));

    const { error: assetsError } = await supabase
      .from("project_assets")
      .insert(assetInserts);

    if (assetsError) throw new Error(assetsError.message);
  }

  revalidatePath("/dashboard");
  return projectId;
}

export async function addProjectCommunication(projectId: string, message: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");

  const { error } = await supabase.from("project_communications").insert({
    project_id: projectId,
    sender_id: userData.user.id,
    message,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}
