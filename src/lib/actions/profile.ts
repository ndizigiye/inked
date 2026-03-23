"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const displayName = formData.get("display_name") as string;
  const bio = formData.get("bio") as string;

  // Get current username for cache invalidation
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName.trim() || null,
      bio: bio.trim() || null,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  if (profile?.username) {
    revalidatePath(`/profile/${profile.username}`);
  }
  revalidatePath("/dashboard");
  revalidatePath("/settings");

  return { success: true };
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) return { error: "No file provided" };

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only JPG, PNG, and WEBP images are allowed" };
  }
  if (file.size > 2 * 1024 * 1024) {
    return { error: "File must be under 2 MB" };
  }

  const ext = file.name.split(".").pop();
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });

  if (uploadError) return { error: uploadError.message };

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: urlData.publicUrl })
    .eq("id", user.id);

  if (updateError) return { error: updateError.message };

  // Get username for cache invalidation
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profile?.username) {
    revalidatePath(`/profile/${profile.username}`);
  }
  revalidatePath("/dashboard");
  revalidatePath("/settings");

  return { success: true, avatarUrl: urlData.publicUrl };
}
