import { getSupabase } from "./supabase";

const PRODUCT_BUCKET = "Ace Images";
const PRODUCT_FOLDER = "products";
const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

export function getProductImageUrl(path?: string | null) {
  const safePath = typeof path === "string" ? path.trim() : "";
  if (!safePath) return TRANSPARENT_PIXEL;
  const supabase = getSupabase();
  if (!supabase) return TRANSPARENT_PIXEL;

  const normalizedPath = safePath.startsWith(`${PRODUCT_FOLDER}/`)
    ? safePath
    : `${PRODUCT_FOLDER}/${safePath}`;

  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(normalizedPath);

  return data.publicUrl || TRANSPARENT_PIXEL;
}

export function getStorageAsset(path?: string | null) {
  const safePath = typeof path === "string" ? path.trim() : "";
  if (!safePath) return TRANSPARENT_PIXEL;
  const supabase = getSupabase();
  if (!supabase) return TRANSPARENT_PIXEL;

  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(safePath);

  return data.publicUrl || TRANSPARENT_PIXEL;
}
