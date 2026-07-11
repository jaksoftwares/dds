import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import seedData from "@/data/seed-data.json";

// We use service role key for seeding to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: Request) {
  try {
    // 1. Seed Services
    if (seedData.services && seedData.services.length > 0) {
      const { error: servicesError } = await supabase.from("services").upsert(
        seedData.services,
        { onConflict: "slug" }
      );
      if (servicesError) throw new Error(`Services Seed Error: ${servicesError.message}`);
    }

    // 2. Seed Portfolio
    if (seedData.portfolio && seedData.portfolio.length > 0) {
      const { error: portfolioError } = await supabase.from("portfolio").upsert(
        seedData.portfolio,
        { onConflict: "slug" }
      );
      if (portfolioError) throw new Error(`Portfolio Seed Error: ${portfolioError.message}`);
    }

    // 3. Seed Updates
    if (seedData.updates && seedData.updates.length > 0) {
      const { error: updatesError } = await supabase.from("updates").upsert(
        seedData.updates,
        { onConflict: "slug" }
      );
      if (updatesError) throw new Error(`Updates Seed Error: ${updatesError.message}`);
    }

    return NextResponse.json({ success: true, message: "Seed successful!" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
