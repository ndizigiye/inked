import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { StoryEditor } from "@/components/editor/StoryEditor";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Editing — ${id.slice(0, 8)}…` };
}

export default async function EditStoryPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();

  if (!story) notFound();

  return (
    <div className="min-h-screen">
      <StoryEditor story={story} />
      <Footer />
    </div>
  );
}
