"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitProjectOnboarding(data: {
  title: string;
  company_name: string;
  project_goals: string;
  solution_category: string;
  specific_type: string;
  industry: string;
  client_segment: string;
  target_market_details: any;
  competitors_list: any[];
  additional_notes: string;
  budget_currency: string;
  budget_amount: number;
  budget_description: string;
  payment_policy_accepted: boolean;
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

  if (projectError) {
    console.error("Project Error:", projectError);
    throw new Error(projectError.message);
  }

  const projectId = project.id;

  // 2. Create the project brief
  const { error: briefError } = await supabase.from("project_briefs").insert({
    project_id: projectId,
    company_name: data.company_name,
    project_goals: data.project_goals,
    solution_category: data.solution_category,
    specific_type: data.specific_type,
    industry: data.industry,
    client_segment: data.client_segment,
    target_market_details: data.target_market_details,
    competitors_list: data.competitors_list,
    additional_notes: data.additional_notes,
    payment_policy_accepted: data.payment_policy_accepted,
  });

  if (briefError) {
    console.error("Brief Error:", briefError);
    throw new Error(briefError.message);
  }

  // 3. Create budget proposal
  if (data.budget_amount > 0 || data.budget_description) {
    const { error: budgetError } = await supabase.from("project_financials").insert({
      project_id: projectId,
      client_id: clientId,
      type: "budget_proposal",
      amount: data.budget_amount,
      currency: data.budget_currency,
      description: data.budget_description,
    });
    if (budgetError) {
      console.error("Budget Error:", budgetError);
      throw new Error(budgetError.message);
    }
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

    if (assetsError) {
      console.error("Assets Error:", assetsError);
      throw new Error(assetsError.message);
    }
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

export async function updateProjectStatus(projectId: string, status: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");
  
  // Must be admin to update status, handled by RLS, but we can just update
  const { error } = await supabase.from("client_projects").update({ status }).eq("id", projectId);
  if (error) throw new Error(error.message);

  if (status === "Active") {
    const { data: existing } = await supabase.from("project_milestones").select("id").eq("project_id", projectId).limit(1);
    
    if (!existing || existing.length === 0) {
      const now = new Date();
      const addDays = (days: number) => {
        const d = new Date(now);
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
      };

      const presetMilestones = [
        { title: "Project Kickoff & Discovery", description: "Initial project onboarding and defining scope limits.", due_date: addDays(0), status: "pending", is_published: false, project_id: projectId },
        { title: "Requirements Gathering & Documentation", description: "Finalizing functional and non-functional requirements.", due_date: addDays(3), status: "pending", is_published: false, project_id: projectId },
        { title: "Architecture & Technical Specifications", description: "Database schema design, technology stack selection, and system architecture planning.", due_date: addDays(7), status: "pending", is_published: false, project_id: projectId },
        { title: "UI/UX Design Concept & Wireframes", description: "Low-fidelity layouts and user journey mapping.", due_date: addDays(14), status: "pending", is_published: false, project_id: projectId },
        { title: "High-Fidelity Prototyping & Design Approval", description: "Final interactive designs and client design sign-off.", due_date: addDays(21), status: "pending", is_published: false, project_id: projectId },
        { title: "Environment Setup & Database Configuration", description: "Provisioning servers, repositories, and setting up environments.", due_date: addDays(24), status: "pending", is_published: false, project_id: projectId },
        { title: "Core Feature Development (Alpha)", description: "Building out the primary functional components of the application.", due_date: addDays(35), status: "pending", is_published: false, project_id: projectId },
        { title: "Full System Integration (Beta)", description: "Connecting front-end with back-end, integrating APIs.", due_date: addDays(45), status: "pending", is_published: false, project_id: projectId },
        { title: "Quality Assurance & User Acceptance Testing (UAT)", description: "Internal bug testing followed by client hands-on testing.", due_date: addDays(55), status: "pending", is_published: false, project_id: projectId },
        { title: "Deployment & Go-Live", description: "Pushing the code to production and performing live environment smoke tests.", due_date: addDays(60), status: "pending", is_published: false, project_id: projectId },
        { title: "Post-Launch Handover & Support Initiation", description: "Delivering credentials, documentation, and transitioning into maintenance.", due_date: addDays(65), status: "pending", is_published: false, project_id: projectId },
      ];

      await supabase.from("project_milestones").insert(presetMilestones);

      const addTime = (days: number, timeStr: string) => {
        const d = new Date(now);
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0] + timeStr;
      };

      const presetMeetings = [
        { title: "Kickoff Meeting", description: "Welcome and project introduction.", meeting_date: addTime(0, "T10:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Requirements Review & Sign-off", description: "Reviewing documentation before development starts.", meeting_date: addTime(5, "T14:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Design Approval Walkthrough", description: "Reviewing the high-fidelity designs for approval.", meeting_date: addTime(21, "T11:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Alpha Progress Demo", description: "Showcasing core feature functionality.", meeting_date: addTime(35, "T15:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Beta Handover & UAT Instructions", description: "Teaching you how to test the application.", meeting_date: addTime(45, "T13:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Go-Live Readiness Check", description: "Final checklist review before launch.", meeting_date: addTime(58, "T10:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
        { title: "Project Handover & Retrospective", description: "Handing over credentials and discussing the project.", meeting_date: addTime(65, "T14:00:00Z"), meeting_link: "https://meet.google.com/new", status: "scheduled", is_published: false, project_id: projectId },
      ];

      await supabase.from("project_meetings").insert(presetMeetings);
    }
  }

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/admin/projects`);
}

export async function addMilestone(projectId: string, title: string, description: string, due_date: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");

  const { error } = await supabase.from("project_milestones").insert({
    project_id: projectId,
    title,
    description: description || null,
    due_date: due_date || null,
    status: 'pending'
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updateMilestoneStatus(milestoneId: string, status: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_milestones").update({ status }).eq("id", milestoneId);
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}


export async function scheduleMeeting(projectId: string, title: string, description: string, meeting_date: string, meeting_link: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Unauthorized");

  const { error } = await supabase.from("project_meetings").insert({
    project_id: projectId,
    title,
    description: description || null,
    meeting_date,
    meeting_link,
    status: 'scheduled'
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updateMeetingStatus(meetingId: string, status: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_meetings").update({ status }).eq("id", meetingId);
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updateMilestonePublish(milestoneId: string, is_published: boolean, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_milestones").update({ is_published }).eq("id", milestoneId);
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function uploadMilestoneReport(milestoneId: string, projectId: string, file_url: string, file_name: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_milestones").update({ report_file_url: file_url, report_file_name: file_name }).eq("id", milestoneId);
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function editMilestone(milestoneId: string, projectId: string, title: string, description: string, due_date: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_milestones").update({
    title,
    description: description || null,
    due_date: due_date || null,
  }).eq("id", milestoneId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function deleteMilestone(milestoneId: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_milestones").delete().eq("id", milestoneId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function editMeeting(meetingId: string, projectId: string, title: string, description: string, meeting_date: string, meeting_link: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_meetings").update({
    title,
    description: description || null,
    meeting_date,
    meeting_link,
  }).eq("id", meetingId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function deleteMeeting(meetingId: string, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_meetings").delete().eq("id", meetingId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function updateMeetingPublish(meetingId: string, is_published: boolean, projectId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_meetings").update({ is_published }).eq("id", meetingId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}
