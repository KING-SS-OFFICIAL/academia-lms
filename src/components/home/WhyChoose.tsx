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

export default function WhyChoose() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <span className="section-subheading">The Academia Edge</span>
          <h3 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tight leading-none">
            Why Choose Academia?
          </h3>
        </div>
        <p className="text-on-surface-variant max-w-xs text-sm italic">
          &quot;Excellence is not an act, but a habit.&quot; &mdash; Building
          language mastery through consistent practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-primary-container/50 transition-colors group"
          >
            <feature.icon className="text-primary mb-4 w-8 h-8" />
            <h5 className="text-lg font-bold font-headline mb-2 text-on-surface">
              {feature.title}
            </h5>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
