import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductRow } from "@/types/product";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: Props) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { message: "Server is missing Supabase environment variables." },
      { status: 500 }
    );
  }

  const { slug } = await params;

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      slug,
      name,
      main_image,
      gallery,
      price,
      old_price,
      sold_out,
      tags,
      collection,
      description,
      postdescription,
      features
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  const product = mapProductRow(data as ProductRow);

  return NextResponse.json(product);
}
