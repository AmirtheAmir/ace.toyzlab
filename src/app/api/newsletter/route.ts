import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        {
          status: "error",
          message: "Server is missing Supabase environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Please enter your email." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { status: "error", message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("newsletter_subs")
      .insert([{ email }])

    if (error) {
      console.log("SUPABASE INSERT ERROR:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          {
            status: "duplicate",
            message: "You have already subscribed. So thx again i guess :))",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          code: error.code,
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Thank you for subscribing :)",
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("ROUTE ERROR:", err);

    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
