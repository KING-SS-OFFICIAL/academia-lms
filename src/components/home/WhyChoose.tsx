"use client";

import {
  PenTool,
  Brain,
  Sparkles,
  MessageSquare,
  CalendarClock,
  FileQuestion,
  LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: PenTool,
    title: "Descriptive English Mastery",
    description:
      "Advanced writing techniques for essays, reports, and professional correspondence.",
  },
  {
    icon: Brain,
    title: "Boosts Competency & Comprehension",
    description:
      "Deep-dive analysis methods to understand complex texts and literary works.",
  },
  {
    icon: Sparkles,
    title: "Unique Writing Style",
    description:
      "Develop a signature voice that stands out in academic and professional circles.",
  },
  {
    icon: MessageSquare,
    title: "Spoken Fluency",
    description:
      "Interactive sessions designed to build confidence in real-world scenarios.",
  },
  {
    icon: CalendarClock,
    title: "Weekly Tests",
    description:
      "Regular progress tracking through strictly timed weekly assessments.",
  },
  {
    icon: FileQuestion,
    title: "Mock Tests & Exam Material",
    description:
      "Exclusive access to premium mock papers and curated exam preparation resources.",
  },
];

function AnimatedFeature({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-primary-container/50 transition-all duration-500 group relative overflow-hidden ${
        visible ? 'animate-fade-in-up' : 'opacity-0-init'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating icon on hover */}
      <div className="relative z-10">
        <div className="mb-4 w-8 h-8 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
          <feature.icon className="w-full h-full" />
        </div>
        <h5 className="text-lg font-bold font-headline mb-2 text-on-surface group-hover:text-primary transition-colors">
          {feature.title}
        </h5>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 relative z-10">
        <div className="space-y-4 max-w-2xl">
          <span className="section-subheading">The Academia Edge</span>
          <h3 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tight leading-none">
            Why Choose{" "}
            <span className="text-shimmer">Academia</span>?
          </h3>
        </div>
        <p className="text-on-surface-variant max-w-xs text-sm italic">
          &quot;Excellence is not an act, but a habit.&quot; &mdash; Building
          language mastery through consistent practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <AnimatedFeature key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
