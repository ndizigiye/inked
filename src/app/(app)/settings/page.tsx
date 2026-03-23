"use client";

import { useState, useEffect, useRef } from "react";
import { updateProfile, uploadAvatar } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/client";

const MAX_BIO = 160;

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, bio, avatar_url")
        .eq("id", user.id)
        .single();
      if (profile) {
        setDisplayName(profile.display_name ?? "");
        setBio(profile.bio ?? "");
        setAvatarUrl(profile.avatar_url ?? null);
      }
    }
    load();
  }, []);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append("display_name", displayName);
    fd.append("bio", bio);
    const result = await updateProfile(fd);
    setSaving(false);
    if (result?.error) {
      showToast("error", result.error);
    } else {
      showToast("success", "Profile updated.");
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    const result = await uploadAvatar(fd);
    if (result?.error) {
      showToast("error", result.error);
    } else if (result?.avatarUrl) {
      setAvatarUrl(result.avatarUrl);
      showToast("success", "Avatar updated.");
    }
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-2xl mx-auto w-full px-6">
        <div className="mb-10">
          <h1 className="font-headline text-4xl font-black tracking-tight uppercase">
            Account <span className="text-primary-container">Settings</span>
          </h1>
          <p className="text-on-surface-variant text-sm mt-1 opacity-70">
            Manage your public profile and account details.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 px-4 py-3 rounded text-sm font-bold ${
              toast.type === "success"
                ? "bg-green-900/30 border border-green-700/40 text-green-400"
                : "bg-error-container/20 border border-error/30 text-on-error-container"
            }`}
          >
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile section */}
          <div className="bg-surface-container rounded-xl p-6 space-y-6 border border-outline-variant/10">
            <h2 className="font-headline font-black text-sm uppercase tracking-wider text-primary-container">
              Profile
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Your avatar"
                  className="w-16 h-16 rounded-full object-cover border border-outline-variant/30"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-3xl" aria-hidden="true">
                    person
                  </span>
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-wider rounded hover:bg-surface-bright transition-all"
                >
                  Change photo
                </button>
                <p className="text-[9px] text-on-surface-variant/50 mt-1 uppercase tracking-wider">
                  JPG, PNG or WEBP · Max 2MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            {/* Display name */}
            <div className="space-y-2">
              <label htmlFor="displayName" className="block text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface placeholder:text-outline/40 py-3 px-0 transition-all duration-300 outline-none"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="bio" className="block text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                  Bio
                </label>
                <span className={`text-[10px] font-bold ${bio.length >= MAX_BIO ? "text-tertiary" : "text-on-surface-variant/50"}`}>
                  {bio.length}/{MAX_BIO}
                </span>
              </div>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
                placeholder="A short bio about you..."
                rows={3}
                className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface placeholder:text-outline/40 py-3 px-0 transition-all duration-300 outline-none resize-none"
              />
            </div>
          </div>

          {/* Account section */}
          <div className="bg-surface-container rounded-xl p-6 space-y-4 border border-outline-variant/10">
            <h2 className="font-headline font-black text-sm uppercase tracking-wider text-tertiary">
              Account
            </h2>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-primary-fixed-dim">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/30 text-on-surface/50 py-3 px-0 outline-none cursor-default"
              />
            </div>
            <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
              Password is managed through your sign-in provider.
            </p>
          </div>

          {/* Danger zone */}
          <div className="bg-surface-container rounded-xl p-6 border border-error/20 space-y-3">
            <h2 className="font-headline font-black text-sm uppercase tracking-wider text-error/60">
              Danger Zone
            </h2>
            <button
              type="button"
              disabled
              title="Coming soon"
              className="px-4 py-2 text-error/40 border border-error/20 text-xs font-bold uppercase tracking-wider rounded cursor-not-allowed"
            >
              Delete account
            </button>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-primary-container to-[#7a3000] text-on-primary font-bold text-sm uppercase tracking-widest rounded-md hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
