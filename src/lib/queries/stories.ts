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

export type BrowseSort = "latest" | "popular" | "short";
export type BrowseGenre = string; // "all" or a specific genre value

export async function getBrowseStories(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  genre: BrowseGenre = "all",
  sort: BrowseSort = "latest"
) {
  let query = supabase
    .from("stories")
    .select(`*, profiles (username, display_name, avatar_url)`)
    .eq("status", "published");

  if (genre !== "all") {
    query = query.ilike("genre", genre);
  }

  if (sort === "latest") {
    query = query.order("published_at", { ascending: false });
  } else if (sort === "popular") {
    query = query.order("view_count", { ascending: false });
  } else {
    query = query.order("read_time_min", { ascending: true });
  }

  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

export async function getStoriesByUserId(
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>,
  userId: string
) {
  const { data, error } = await supabase
    .from("stories")
    .select(`*, profiles (username, display_name, avatar_url)`)
    .eq("author_id", userId)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}
