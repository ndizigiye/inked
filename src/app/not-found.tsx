import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { TopNavBar } from "@/components/layout/TopNavBar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="space-y-8 max-w-lg">
          <span className="text-9xl font-black font-headline text-primary-container/20 tracking-tighter block">
            404
          </span>
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface uppercase">
            Manuscript <span className="text-primary-container">Lost.</span>
          </h1>
          <p className="text-on-surface-variant text-lg opacity-70">
            The story you&apos;re looking for doesn&apos;t exist or has been
            archived.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all"
            >
              Go Home
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-surface-container-highest text-primary font-bold uppercase tracking-widest rounded-md hover:bg-surface-bright transition-all"
            >
              My Stories
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
