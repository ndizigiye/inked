"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadCover(
  storyId: string,
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const file = formData.get("cover") as File | null;
  if (!file || file.size === 0) return { error: "No file provided" };

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${user.id}/${storyId}/cover.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("story-covers")
    .upload(path, file, { upsert: true });

  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("story-covers").getPublicUrl(path);

  // Update story cover_url
  await supabase
    .from("stories")
    .update({ cover_url: publicUrl })
    .eq("id", storyId)
    .eq("author_id", user.id);

  return { url: publicUrl };
}
