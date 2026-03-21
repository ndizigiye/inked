import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Story = Database["public"]["Tables"]["stories"]["Row"];
export type StoryInsert = Database["public"]["Tables"]["stories"]["Insert"];
export type StoryUpdate = Database["public"]["Tables"]["stories"]["Update"];

export type StoryStatus = "draft" | "published" | "archived";

export type StoryWithAuthor = Story & {
  profiles: Pick<Profile, "username" | "display_name" | "avatar_url">;
};
