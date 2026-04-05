"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 md:p-16 text-center animate-gradient">
        {/* Animated floating orbs */}
        <div className="absolute top-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-[40px] animate-float" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-white/5 rounded-full blur-[30px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-[60px] animate-pulse-glow" />

        {/* Rotating decorative ring */}
        <div className="absolute -top-10 -left-10 w-32 h-32 border-2 border-white/10 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-white/10 rounded-full animate-spin-reverse" />

        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl md:text-5xl font-black font-headline text-white tracking-tight">
            Start Learning{" "}
            <span className="text-white/90 animate-pulse-glow inline-block">Today</span>
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Join hundreds of students mastering English with Arindam Dutta.
            Your journey to fluency begins here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/enroll"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.02] hover:shadow-2xl active:scale-95 transition-all flex items-center gap-3 shadow-lg group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                Enroll Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/materials"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
            >
              Browse Materials
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
