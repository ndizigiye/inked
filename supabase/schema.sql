-- ============================================================
-- inked — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Profiles (auto-created on signup via trigger)
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  display_name  text,
  bio           text,
  avatar_url    text,
  total_reads   bigint default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Stories
create table public.stories (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid not null references public.profiles(id) on delete cascade,
  title         text not null default '',
  body          text not null default '',
  cover_url     text,
  excerpt       text,
  status        text not null default 'draft' check (status in ('draft','published','archived')),
  genre         text,
  read_time_min integer default 0,
  view_count    bigint default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  published_at  timestamptz
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
create policy "profiles_read"   on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);

alter table public.stories enable row level security;
create policy "select_published" on public.stories for select using (status = 'published');
create policy "select_own"       on public.stories for select using (auth.uid() = author_id);
create policy "insert_own"       on public.stories for insert with check (auth.uid() = author_id);
create policy "update_own"       on public.stories for update using (auth.uid() = author_id);
create policy "delete_own"       on public.stories for delete using (auth.uid() = author_id);

-- ============================================================
-- Triggers
-- ============================================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger stories_updated_at
  before update on public.stories
  for each row execute function public.handle_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ============================================================
-- Storage
-- ============================================================

-- 1. Create bucket in Supabase Dashboard: "story-covers" (public)
-- 2. Add these storage policies:

-- Allow public read of all story covers
-- create policy "covers_public_read"
--   on storage.objects for select
--   using (bucket_id = 'story-covers');

-- Allow authenticated users to upload to their own folder
-- create policy "covers_owner_upload"
--   on storage.objects for insert
--   with check (
--     bucket_id = 'story-covers'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- Allow owner to update/delete their covers
-- create policy "covers_owner_update"
--   on storage.objects for update
--   using (
--     bucket_id = 'story-covers'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- create policy "covers_owner_delete"
--   on storage.objects for delete
--   using (
--     bucket_id = 'story-covers'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- ─────────────────────────────────────────────────────────────────────────────
-- Storage bucket: avatars (public)
-- Create manually in Supabase dashboard: Storage → New bucket → "avatars" → Public
-- ─────────────────────────────────────────────────────────────────────────────
-- create policy "Avatars are publicly readable"
--   on storage.objects for select
--   using (bucket_id = 'avatars');

-- create policy "Users can upload their own avatar"
--   on storage.objects for insert
--   with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can update their own avatar"
--   on storage.objects for update
--   using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- create policy "Users can delete their own avatar"
--   on storage.objects for delete
--   using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
