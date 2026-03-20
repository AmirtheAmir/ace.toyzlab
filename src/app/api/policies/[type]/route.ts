import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ALLOWED_TYPES = ["refund", "privacy", "shipping", "terms", "cookies"];

export async function GET(
  _request: Request,
  context: { params: Promise<{ type: string }> },
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { message: "Server is missing Supabase environment variables." },
      { status: 500 },
    );
  }

  const { type } = await context.params;

  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("policies")
    .select("id, type, section_order, title, description, created_at")
    .eq("type", type)
    .order("section_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: "Failed to fetch policy sections" },
      { status: 500 },
    );
  }

  return NextResponse.json(data ?? []);
}
