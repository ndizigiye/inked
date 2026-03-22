import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { BentoStoriesGrid } from "@/components/landing/BentoStoriesGrid";
import { WritersSection } from "@/components/landing/WritersSection";
import { CTASection } from "@/components/landing/CTASection";
import { getPublishedStories } from "@/lib/queries/stories";
import { getTopProfiles } from "@/lib/queries/profiles";
import { createClient } from "@/lib/supabase/server";
import type { StoryWithAuthor } from "@/types";

export default async function LandingPage() {
  const supabase = await createClient();
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

  const [stories, writers] = await Promise.all([
    getPublishedStories(3).catch(() => []),
    getTopProfiles(6).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar user={user} profile={profile} />
      <main className="flex-1 pt-14">
        {!user && <HeroSection />}
        <BentoStoriesGrid stories={stories as StoryWithAuthor[]} />
        <WritersSection writers={writers} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
