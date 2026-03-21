import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserStories } from "@/lib/queries/stories";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStoryCard } from "@/components/dashboard/DashboardStoryCard";
import { CreateStoryCard } from "@/components/dashboard/CreateStoryCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PopularTags } from "@/components/dashboard/PopularTags";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manuscript Vault",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const stories = await getUserStories(user.id).catch(() => []);

  return (
    <div className="pt-32 pb-20 px-12 max-w-screen-2xl mx-auto min-h-screen">
      <DashboardHeader profile={profile} storyCount={stories.length} />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content: Story Grid */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-6 border-b border-outline-variant/15 pb-2">
              <span className="text-primary-container font-bold text-sm uppercase tracking-widest border-b-2 border-primary-container pb-2">
                Recent Stories
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <DashboardStoryCard key={story.id} story={story} />
            ))}
            <CreateStoryCard />
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-[380px] space-y-8">
          <ActivityFeed />
          <PopularTags />
        </aside>
      </div>
    </div>
  );
}
