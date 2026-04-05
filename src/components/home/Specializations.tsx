"use client";

import {
  Award,
  BookOpen,
  Mic,
  ArrowRight,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

const specializations: {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  features?: string[];
  hasLearnMore: boolean;
  highlighted?: boolean;
}[] = [
  {
    icon: Award,
    title: "Competitive English",
    description:
      "Tailored coaching for WBCS, SSC, BANKING, and other competitive examinations with proven methodologies.",
    tags: ["WBCS", "SSC", "BANK"],
    hasLearnMore: false,
  },
  {
    icon: BookOpen,
    title: "Academic English",
    description:
      "Comprehensive curriculum covering CBSE, ICSE, & STATE BOARDS for students from Class V to XII.",
    features: ["Class V to XII", "All Major Boards"],
    hasLearnMore: false,
    highlighted: true,
  },
  {
    icon: Mic,
    title: "Spoken English",
    description:
      "Focus on fluency, accent neutralization, and confident Global Communication for professionals and students.",
    hasLearnMore: true,
  },
];

export default function Specializations() {
  return (
    <section className="py-24 bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h3 className="section-heading">Our Specializations</h3>
          <div className="w-24 h-1.5 bg-primary-container mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-3xl group card-hover ${
                spec.highlighted ? "border-primary-container/20" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <spec.icon className="text-primary w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold font-headline mb-4 text-on-surface">
                {spec.title}
              </h4>

              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                {spec.description}
              </p>

              {spec.tags && (
                <div className="flex flex-wrap gap-3">
                  {spec.tags.map((tag) => (
                    <span key={tag} className="badge-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {spec.features && (
                <div className="space-y-2">
                  {spec.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs font-bold text-primary"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {spec.hasLearnMore && (
                <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
