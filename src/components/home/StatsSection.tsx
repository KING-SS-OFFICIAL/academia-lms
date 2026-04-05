"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, FileCheck, Award } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 500, suffix: "+", label: "Students Trained" },
  { icon: FileCheck, value: 1000, suffix: "+", label: "Tests Completed" },
  { icon: Award, value: 98, suffix: "%", label: "Pass Rate" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-glow" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-container/10 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-container/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-8 rounded-3xl text-center group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden animate-fade-in-up opacity-0-init"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Rotating border on hover */}
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent animate-border-glow" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <stat.icon className="text-primary w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl font-black font-headline text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-on-surface-variant font-semibold text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
