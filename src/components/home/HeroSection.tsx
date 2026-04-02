"use client";

import { ArrowRight, MessageCircle, BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 border border-primary-container/30">
            <BadgeCheck className="text-primary w-4 h-4" />
            <span className="text-primary font-bold text-sm tracking-wide">
              Language Master Excellence
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black font-headline leading-[1.1] tracking-tight text-on-surface">
            Unlock Your{" "}
            <span className="text-primary">Language</span> Potential
          </h2>

          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Master English with Arindam Dutta. From competitive exams to global
            communication, we provide the prestigious digital environment you
            need for mastery.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="gradient-btn">
              Get Started Today
              <ArrowRight size={20} />
            </button>
            <a
              href="https://wa.me/7908656395"
              className="flex items-center gap-3 px-6 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-colors"
            >
              <MessageCircle className="text-secondary w-5 h-5" />
              <span className="font-bold text-on-surface-variant">
                7908656395
              </span>
            </a>
          </div>
        </div>

        {/* Right - Teacher Portrait */}
        <div className="flex-1 relative">
          {/* Decorative Blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-container/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary-container/20 rounded-full blur-[60px]" />

          <div className="relative z-10 p-4">
            <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-8 border-surface-container-lowest shadow-2xl overflow-hidden relative group mx-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmA8yvicF4pPh3iKAW1-FfCjUGmylsFO5JMnzvCG_vo8DznzKBvXFyPpodiCMpD7yXPxbzzvpxaf2W2AzfDC814ZKDgZ4MAgppNQKZkfmTFVWXV3bCCgNKmyGIoMTxcONnj2WKyePUEWaYjOHwzSkZzixPrwUJtyTCB7Tz62mZRUStwANL4DGdnBzEV6EijlnENEJMedJ5TegCpyvVtIS5jKcj8d0u0UIambz-DSwdHK27T_Ig4pMhhqlCRLNPLu8j7oQbRtBooKA"
                alt="Arindam Dutta - Lead English Educator"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-12 -left-6 md:-left-12 glass-card p-6 rounded-2xl shadow-xl max-w-[220px]">
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
