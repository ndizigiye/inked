import { RegisterForm } from "@/components/auth/RegisterForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { IMG } from "@/lib/placeholders";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-surface-container">
      {/* Left: Visual Narrative */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-surface-container-highest items-end p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMG.sceneAuthBg} alt="" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>
        <div className="relative z-10">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface leading-tight mb-4">
            Your legacy{" "}
            <br />
            <span className="text-primary-container">starts here.</span>
          </h2>
          <p className="text-primary-fixed-dim text-lg opacity-80 max-w-xs">
            Join thousands of writers sharing their stories on the world&apos;s
            most immersive digital manuscript platform.
          </p>
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10">
            <h1 className="font-headline text-3xl font-bold mb-2">
              Join the Circle
            </h1>
            <p className="text-secondary font-medium">
              Create your author profile and start writing.
            </p>
          </div>

          <SocialLoginButtons />

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-outline-variant opacity-20" />
            <span className="px-4 text-xs font-bold text-outline uppercase tracking-[0.2em]">
              Or use email
            </span>
            <div className="flex-grow border-t border-outline-variant opacity-20" />
          </div>

          <RegisterForm />

          <div className="mt-12 text-center">
            <p className="text-secondary text-sm">
              Already in the circle?{" "}
              <Link
                href="/login"
                className="text-primary-container font-bold hover:underline ml-2 transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
