"use client";

import { signInWithGoogle } from "@/lib/actions/auth";

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-highest hover:bg-surface-bright transition-all border-b-2 border-transparent active:scale-95 duration-200 rounded"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-xl">
          account_circle
        </span>
        <span className="text-sm font-bold uppercase tracking-wider">
          Google
        </span>
      </button>
      <button
        type="button"
        disabled
        className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-highest opacity-40 cursor-not-allowed transition-all border-b-2 border-transparent rounded"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-xl">
          devices
        </span>
        <span className="text-sm font-bold uppercase tracking-wider">
          Apple
        </span>
      </button>
    </div>
  );
}
