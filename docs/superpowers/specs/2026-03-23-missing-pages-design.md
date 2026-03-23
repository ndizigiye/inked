# inked — Missing Pages Design Spec
**Date:** 2026-03-23
**Status:** Approved for implementation

---

## Overview

inked currently has 8 routes. This spec defines 7 new pages required to complete the application: a Browse/Explore page, public Author Profiles, an Account Settings page, and 4 static legal/support pages.

All pages follow the existing design system: Tailwind v4 `@theme` tokens, Epilogue (headlines) + Manrope (body) fonts, `#ff6b00` / `#ffb693` brand palette, dark `#131313` backgrounds.

---

## 1. `/browse` — Explore Stories

### Layout
Sidebar Filters + 2-column Card Grid (user-selected).

### Structure
- **TopNavBar** — "Browse" nav link becomes active on this route
- **Left sidebar (desktop)**: fixed-width (~220px), hidden on mobile (collapsed into a horizontal scrolling pill row)
  - Genre filters: All, Fiction, Non-fiction, Poetry, Essays, Thriller, Horror, Romance (pill buttons, single-select, "All" default)
  - Sort by: Latest, Popular, Short reads (pill buttons, single-select)
- **Main area**: 2-column card grid on desktop, 1-column on mobile
  - Uses the new shared `StoryCard` component (see Shared Components)
  - Cards link to `/story/[id]`
- **Empty state**: branded message when no stories match filters
- **Footer**

### Data
- Query: `stories` table, `status = 'published'`, joined with `profiles (username, display_name, avatar_url)`
- Filters applied as URL search params (`?genre=fiction&sort=popular`) — shareable URLs
- Server component reads `searchParams` prop
- Sort column mapping:
  - **Latest** → `order("published_at", { ascending: false })`
  - **Popular** → `order("view_count", { ascending: false })`
  - **Short reads** → `order("read_time_min", { ascending: true })` — note: `read_time_min` defaults to `0` for stories without body content; this is a content edge case, not a schema issue

### Mobile
- Sidebar hidden; genre pills in a `overflow-x-auto` horizontal scroll row + a sort `<select>` dropdown above the grid

---

## 2. `/profile/[username]` — Author Profile

### Layout
Cover Banner + Avatar Overlap + Stats + Story Grid (user-selected).

### Structure
- **TopNavBar**
- **Cover banner**: dark gradient (`from-primary-container/30 to-surface`), full-width, ~180px tall
- **Avatar**: overlaps banner bottom edge, 80×80px rounded circle with border
- **Author info block**:
  - Display name (large, headline font)
  - `@username` + join date (muted)
  - Bio (up to 160 chars)
- **Stats row**: Stories count · Total reads · Followers (`0` placeholder — follow feature out of scope)
- **"Edit Profile" button**: visible only when `user.id === profile.id`, links to `/settings`
- **Published Stories section** using `StoryCard` in a 2-col grid
- **Empty state** if author has no published stories
- **Footer**

### Data
- Fetch profile: `profiles` table, `.eq("username", params.username)` → `notFound()` if missing
- Fetch stories: `stories` table, `.eq("author_id", profile.id)`, `.eq("status", "published")` — **column is `author_id`, not `user_id`**
- `total_reads` from `profiles.total_reads` (maintained by existing DB trigger)

### URL
`/profile/[username]` — e.g. `/profile/armand`

---

## 3. `/settings` — Account Settings

### Layout
Single scrolling centred page, auth-protected (user-selected).

### Structure
- **TopNavBar** (authenticated state)
- **Page heading**: "Account Settings" + subtitle
- **Profile section** (card):
  - Avatar: current image or placeholder icon; "Change photo" button → file input → `uploadAvatar()` server action → Supabase Storage `avatars` bucket → updates `profiles.avatar_url`
  - Display name: text input
  - Bio: textarea (max 160 chars) with live character counter
- **Account section** (card):
  - Email: read-only input showing `user.email`
  - Note: "Password is managed through your sign-in provider"
- **Danger Zone section** (card, subtle red border):
  - "Delete account" button — disabled, `title="Coming soon"`
- **Save Changes button**: full-width orange, shows loading spinner, then success/error toast via `aria-live`
- **Footer**

### Data
- Read: `profiles` table for current user (`createClient()` server-side)
- Write: `updateProfile(formData)` server action → updates `display_name`, `bio` in `profiles`; calls `revalidatePath(\`/profile/${profile.username}\`)` (actual username string, not bracket-literal) and `revalidatePath("/dashboard")`
- Avatar: `uploadAvatar(file)` server action → uploads to `avatars` bucket at path `{user_id}/avatar.{ext}` (public bucket); updates `profiles.avatar_url`; calls same `revalidatePath` calls as above

### Route Protection
- Add `"/settings"` to the `protectedRoutes` array in `src/lib/supabase/middleware.ts` (alongside `/dashboard` and `/stories`)
- `(app)` layout redirect acts as a second layer

### Supabase Storage — `avatars` bucket
Add the following to `supabase/schema.sql` (mirroring the `story-covers` documentation pattern):

```sql
-- Storage bucket: avatars (public)
-- Create manually in Supabase dashboard: Storage → New bucket → "avatars" → Public

-- RLS policies for avatars bucket:
-- 1. Public read
create policy "Avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- 2. Owner insert
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- 3. Owner update
create policy "Users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- 4. Owner delete
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
```

### Navigation
- TopNavBar profile dropdown: add "Settings" link above "Sign out"

---

## 4. Legal & Support Pages

Four simple branded pages, same shell as `/collections` (TopNavBar + centred SVG + heading + description + CTA + Footer).

| Route | Title | Description |
|-------|-------|-------------|
| `/terms` | Terms of Service | "We're drafting our terms. Check back soon." |
| `/privacy` | Privacy Policy | "Your data, your rights. Policy coming soon." |
| `/guidelines` | Community Guidelines | "A space for bold voices. Guidelines coming soon." |
| `/help` | Help Center | "Our documentation is on the way." |

Each page uses an inline SVG (no emoji), `metadata.title` without site name duplication (e.g. `title: "Terms of Service"` — root template appends `| inked`).

---

## Shared Components

### `StoryCard` (new — `src/components/story/StoryCard.tsx`)
Extracted for use on Browse and Profile pages only. **Not** a replacement for `BentoStoriesGrid` internals (which use a placeholder pattern with a different shape — that refactor is out of scope).

Props:
```ts
interface StoryCardProps {
  story: StoryWithAuthor;
}
```

Renders: cover image (16/9, lazy loaded), genre badge, title (title case), author avatar + name, read time. Links to `/story/[id]`.

---

## Routing Changes

| Location | Change |
|----------|--------|
| `TopNavBar` `navLinks` | `Browse` href: `/` → `/browse` |
| `TopNavBar` active state logic | Landing page `/` no longer has a nav link — it is a marketing entry point only, no active state needed |
| `TopNavBar` profile dropdown | Add "Settings" link (`/settings`) above "Sign out" |
| `WritersSection` | Add `username: w.username` to the real-data branch of `displayWriters`; type as `username?: string` (i.e. `string \| undefined`) so both branches share the same shape — placeholder entries produce `undefined` naturally since `PLACEHOLDER_WRITERS` has no `username` field. Wrap each card in `<Link href={"/profile/" + writer.username}>` only when `writer.username` is defined. For entries wrapped in `<Link>`, remove `cursor-pointer` from the inner card `<div>` (the link is already a pointer target); retain it on unwrapped placeholder entries. |
| `Footer.tsx` | Update 4 footer links from `#` to `/terms`, `/privacy`, `/guidelines`, `/help` |
| `collections/page.tsx` | Update "Browse Stories" CTA from `href="/"` to `href="/browse"` |
| `src/lib/supabase/middleware.ts` | Add `"/settings"` to `protectedRoutes` array |

---

## Out of Scope

- Real follower/follow functionality
- Functional search (input present, non-functional — same as current nav search)
- Pagination on Browse and Profile
- Account deletion
- Real legal copy
- `BentoStoriesGrid` refactor to use `StoryCard`

---

## File Structure

```
src/
  app/
    browse/
      page.tsx                    ← new (server component)
    profile/
      [username]/
        page.tsx                  ← new (server component)
    (app)/
      settings/
        page.tsx                  ← new (client component, auth-protected)
    terms/page.tsx                ← new
    privacy/page.tsx              ← new
    guidelines/page.tsx           ← new
    help/page.tsx                 ← new
  components/
    story/
      StoryCard.tsx               ← new
  lib/
    actions/
      profile.ts                  ← new (updateProfile, uploadAvatar)
    queries/
      profiles.ts                 ← update (add getProfileByUsername)
      stories.ts                  ← update (add getStoriesByUserId, getBrowseStories)
  lib/supabase/
    middleware.ts                 ← update (add "/settings" to protectedRoutes)
supabase/
  schema.sql                      ← update (add avatars bucket + RLS policies)
```
