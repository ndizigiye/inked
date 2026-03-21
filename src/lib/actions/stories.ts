"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { calculateReadTime } from "@/lib/utils/readTime";

export async function createStory() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("stories")
    .insert({ author_id: user.id, title: "", body: "", status: "draft" })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create story");
  }

  redirect(`/stories/${data.id}/edit`);
}

export async function updateStory(
  storyId: string,
  fields: { title?: string; body?: string; genre?: string; excerpt?: string }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const read_time_min = fields.body
    ? calculateReadTime(fields.body)
    : undefined;

  const { error } = await supabase
    .from("stories")
    .update({ ...fields, ...(read_time_min ? { read_time_min } : {}) })
    .eq("id", storyId)
    .eq("author_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function publishStory(storyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("stories")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", storyId)
    .eq("author_id", user.id);

  revalidatePath("/dashboard");
  revalidatePath(`/story/${storyId}`);
  revalidatePath("/");
}

export async function deleteStory(storyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId)
    .eq("author_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}
