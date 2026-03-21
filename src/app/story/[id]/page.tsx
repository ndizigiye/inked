import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import { StoryHeader } from "@/components/story/StoryHeader";
import { StoryBody } from "@/components/story/StoryBody";
import { StoryMeta } from "@/components/story/StoryMeta";
import type { Metadata } from "next";
import type { StoryWithAuthor } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: story } = await supabase
    .from("stories")
    .select("title, excerpt, cover_url")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title || "Untitled Story",
    description: story.excerpt ?? undefined,
    openGraph: {
      title: story.title || "Untitled Story",
      description: story.excerpt ?? undefined,
      images: story.cover_url ? [story.cover_url] : [],
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user (optional auth)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  // Fetch story (RLS allows published stories for all)
  const { data: story } = await supabase
    .from("stories")
    .select(
      `
      *,
      profiles (username, display_name, avatar_url)
    `
    )
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!story) notFound();

  // Increment view count (fire-and-forget)
  supabase
    .from("stories")
    .update({ view_count: (story.view_count ?? 0) + 1 })
    .eq("id", id)
    .then(() => {});

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar user={user} profile={profile} />

      <main className="flex-1 pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <StoryHeader story={story as StoryWithAuthor} />
          <StoryMeta
            publishedAt={story.published_at}
            viewCount={story.view_count}
            readTimeMin={story.read_time_min}
          />
          <div className="mt-12">
            <StoryBody body={story.body} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
