"use client";

import { ArrowRight, MessageCircle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Subtle background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Subtle floating dots */}
      <div className="absolute top-32 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-50" />
      <div className="absolute top-60 right-1/3 w-2 h-2 bg-primary-container rounded-full animate-float-delayed opacity-40" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        {/* Left Content */}
        <div className={`flex-1 space-y-8 ${visible ? 'animate-fade-in-left' : 'opacity-0-init'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 border border-primary-container/30">
            <BadgeCheck className="text-primary w-4 h-4" />
            <span className="text-primary font-bold text-sm tracking-wide">
              Language Master Excellence
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black font-headline leading-[1.1] tracking-tight text-on-surface">
            Unlock Your{" "}
            <span className="text-shimmer">Language</span> Potential
          </h2>

          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Master English with Arindam Dutta. From competitive exams to global
            communication, we provide the prestigious digital environment you
            need for mastery.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/enroll" className="gradient-btn group">
              Get Started Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/7908656395"
              className="flex items-center gap-3 px-6 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="text-secondary w-5 h-5" />
              <span className="font-bold text-on-surface-variant">
                7908656395
              </span>
            </a>
          </div>
        </div>

        {/* Right - Teacher Portrait */}
        <div className={`flex-1 relative ${visible ? 'animate-fade-in-right' : 'opacity-0-init'}`}>
          {/* Subtle spinning ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[540px] md:h-[540px] border border-primary/10 rounded-full animate-spin-slow" />

          {/* Soft blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-container/15 rounded-full blur-3xl animate-pulse-glow" />

          <div className="relative z-10 p-4">
            <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-8 border-surface-container-lowest shadow-2xl overflow-hidden relative group mx-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxA8yvicF4pPh3iKAW1-FfCjUGmylsFO5JMnzvCG_vo8DznzKBvXFyPpodiCMpD7yXPxbzzvpxaf2W2AzfDC814ZKDgZ4MAgppNQKZkfmTFVWXV3bCCgNKmyGIoMTxcONnj2WKyePUEWaYjOHwzSkZzixPrwUJtyTCB7Tz62mZRUStwANL4DGdnBzEV6EijlnENEJMedJ5TegCpyvVtIS5jKcj8d0u0UIambz-DSwdHK27T_Ig4pMhhqlCRLNPLu8j7oQbRtBooKA"
                alt="Arindam Dutta - Lead English Educator"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-12 -left-6 md:-left-12 glass-card p-6 rounded-2xl shadow-xl max-w-[220px] animate-float">
              <h4 className="font-headline font-bold text-primary mb-1">
                Arindam Dutta
              </h4>
              <p className="text-sm text-on-surface-variant leading-tight">
                Language Master &amp; Educational Consultant
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
