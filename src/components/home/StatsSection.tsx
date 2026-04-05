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
        if (entry.isIntersecting) setIsVisible(true);
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-8 rounded-3xl text-center group hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up opacity-0-init"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <stat.icon className="text-primary w-8 h-8" />
            </div>
            <div className="text-4xl md:text-5xl font-black font-headline text-primary mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-on-surface-variant font-semibold text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
