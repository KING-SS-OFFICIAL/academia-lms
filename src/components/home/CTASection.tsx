"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 md:p-16 text-center">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[40px]" />

        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl md:text-5xl font-black font-headline text-white tracking-tight">
            Start Learning Today
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Join hundreds of students mastering English with Arindam Dutta.
            Your journey to fluency begins here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-lg"
            >
              Enroll Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/materials"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3"
            >
              Browse Materials
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
