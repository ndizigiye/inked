import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import { StoryCard } from "@/components/story/StoryCard";
import { getProfileByUsername } from "@/lib/queries/profiles";
import { getStoriesByUserId } from "@/lib/queries/stories";
import type { Metadata } from "next";
import type { StoryWithAuthor } from "@/types";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let viewerProfile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    viewerProfile = data;
  }

  // These functions create their own supabase client — no argument needed
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const stories = (await getStoriesByUserId(profile.id)) as StoryWithAuthor[];
  const isOwner = user?.id === profile.id;

  const joinYear = new Date(profile.created_at).getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar user={user} profile={viewerProfile} />

      <main className="flex-1 pb-20">
        {/* Cover banner */}
        <div className="h-44 bg-gradient-to-br from-primary-container/30 via-surface-container to-surface w-full pt-16" />

        {/* Profile card */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative -mt-12 mb-8">
            {/* Avatar */}
            <div className="mb-4">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name ?? profile.username}
                  className="w-20 h-20 rounded-full object-cover border-4 border-background"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-surface-container border-4 border-background flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl" aria-hidden="true">
                    person
                  </span>
                </div>
              )}
            </div>

            {/* Name + meta */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-headline text-3xl font-black tracking-tight">
                  {profile.display_name ?? profile.username}
                </h1>
                <p className="text-on-surface-variant text-sm mt-0.5">
                  @{profile.username} · Joined {joinYear}
                </p>
                {profile.bio && (
                  <p className="text-on-surface-variant text-sm mt-3 max-w-lg opacity-80">
                    {profile.bio}
                  </p>
                )}
              </div>

              {isOwner && (
                <Link
                  href="/settings"
                  className="flex-shrink-0 px-4 py-2 bg-surface-container border border-outline-variant/30 text-on-surface text-[11px] font-bold uppercase tracking-wider rounded hover:bg-surface-bright transition-all"
                >
                  Edit Profile
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-outline-variant/10">
              <div>
                <p className="font-headline font-black text-2xl text-on-surface">
                  {stories.length}
                </p>
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
                  Stories
                </p>
              </div>
              <div>
                <p className="font-headline font-black text-2xl text-on-surface">
                  {(profile.total_reads ?? 0) >= 1000
                    ? `${((profile.total_reads ?? 0) / 1000).toFixed(1)}K`
                    : (profile.total_reads ?? 0)}
                </p>
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
                  Reads
                </p>
              </div>
              <div>
                <p className="font-headline font-black text-2xl text-on-surface">0</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
                  Followers
                </p>
              </div>
            </div>
          </div>

          {/* Stories */}
          <div>
            <h2 className="font-headline text-xl font-black uppercase tracking-tight mb-6">
              PUBLISHED <span className="text-primary-container">STORIES</span>
            </h2>

            {stories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="material-symbols-outlined text-on-surface-variant/30 text-5xl mb-4" aria-hidden="true">
                  edit_note
                </span>
                <p className="font-headline font-black text-lg uppercase text-on-surface-variant/50">
                  No published stories yet
                </p>
                {isOwner && (
                  <Link
                    href="/stories/new"
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-primary-container to-[#7a3000] text-on-primary font-bold text-[11px] uppercase tracking-widest rounded hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all"
                  >
                    Write Your First Story
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
