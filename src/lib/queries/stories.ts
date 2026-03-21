import { createClient } from "@/lib/supabase/server";

export async function getPublishedStories(limit = 10) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      profiles (username, display_name, avatar_url)
    `
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getStoryById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      profiles (username, display_name, avatar_url)
    `
    )
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getUserStories(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("author_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
