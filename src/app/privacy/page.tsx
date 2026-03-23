import Link from "next/link";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="space-y-8 max-w-lg">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-20 h-20 mx-auto text-primary-container/20 fill-current">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <h1 className="font-headline text-4xl font-black tracking-tighter uppercase">
            Privacy <span className="text-primary-container">Policy</span>
          </h1>
          <p className="text-on-surface-variant text-lg opacity-70">
            Your data, your rights. Policy coming soon.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
