"use client";

import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";

export default function HeroWelcome({ name }: { name: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-container p-8 text-white">
      <div className="relative z-10 max-w-xl">
        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
          Welcome back, {name || "Student"}
        </span>
        <h2 className="text-4xl font-black font-headline tracking-tight mb-4">
          Your Intelligent Learning Ecosystem.
        </h2>
        <p className="text-white/80 font-medium mb-6">
          Elevate your linguistic precision with AI-driven assessments and
          real-time performance analytics.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/test"
            className="bg-white text-primary px-6 py-3 rounded-full font-bold text-sm shadow-xl shadow-black/10 active:scale-95 transition-transform flex items-center gap-2"
          >
            Start AI Test
            <ArrowRight size={16} />
          </Link>
          <button className="bg-transparent border border-white/30 hover:bg-white/10 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2">
            <Target size={16} />
            View Goals
          </button>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute right-10 bottom-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-2xl" />
    </section>
  );
}
