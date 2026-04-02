"use client";

import Link from "next/link";
import { Brain, Sparkles, Play } from "lucide-react";

export default function AITestCenter() {
  return (
    <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/15 shadow-xl shadow-primary/5 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold font-headline text-primary">
            AI Test Center
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-[#1de9b6] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Lab Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
          <Sparkles className="text-primary w-3.5 h-3.5" />
          <span className="text-[10px] font-black text-primary uppercase">
            Gemini Powered
          </span>
        </div>
      </div>

      {/* AI Illustration */}
      <div className="bg-surface-container-low rounded-2xl p-6 flex-grow flex flex-col justify-center items-center text-center mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto border border-outline-variant/10">
            <Brain className="text-primary w-8 h-8" />
          </div>
          <h4 className="font-bold text-on-surface mb-2">
            Ready for a new challenge?
          </h4>
          <p className="text-xs text-on-surface-variant max-w-[200px]">
            Our AI generates customized tests based on your weak areas.
          </p>
        </div>
        {/* Background Glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container/20 blur-2xl rounded-full" />
      </div>

      {/* Progress + Button */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant px-1">
          <span>Today&apos;s Goal</span>
          <span>2 / 3 Tests</span>
        </div>
        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div className="w-[66%] h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-1000" />
        </div>
        <Link
          href="/test"
          className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/10 group hover:translate-y-[-2px] transition-all active:scale-95"
        >
          <Play
            className="w-5 h-5 group-hover:rotate-12 transition-transform"
            style={{ fill: "currentColor" }}
          />
          Start New AI Exam
        </Link>
      </div>
    </section>
  );
}
