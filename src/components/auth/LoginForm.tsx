"use client";

import { useState } from "react";
import { signIn } from "@/lib/actions/auth";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-container/20 border border-error/30 text-on-error-container text-sm px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-xs font-bold text-primary-fixed-dim uppercase tracking-widest">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          autoComplete="email"
          className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface placeholder:text-outline/40 py-4 px-0 transition-all duration-300 outline-none"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-primary-fixed-dim uppercase tracking-widest">
            Password
          </label>
          <a
            href="#"
            className="text-[10px] font-bold text-primary-container uppercase tracking-wider hover:opacity-80"
          >
            Forgot?
          </a>
        </div>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface placeholder:text-outline/40 py-4 px-0 transition-all duration-300 outline-none"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary font-bold text-sm uppercase tracking-widest rounded-md hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In to Manuscript"}
        </button>
      </div>
    </form>
  );
}
