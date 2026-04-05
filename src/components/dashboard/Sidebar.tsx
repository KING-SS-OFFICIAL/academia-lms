"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, LayoutDashboard, BookOpen, Award } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Student Portal", icon: GraduationCap },
  { href: "/leaderboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/materials", label: "Study Material", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-24 h-[calc(100vh-120px)]">
      <div className="bg-[#f3fcf5] rounded-r-3xl w-full flex flex-col p-6 shadow-2xl shadow-[#006c52]/10 h-full">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary-container/20">
            <GraduationCap className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-on-surface leading-tight">Student Portal</p>
            <p className="text-xs text-on-surface-variant">ACADEMIA</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer group hover:translate-x-1 ${
                  isActive
                    ? "bg-[#1de9b6] text-[#006c52] font-bold shadow-sm"
                    : "text-[#3b4a43] hover:bg-[#bacac1]/10"
                }`}
              >
                <item.icon
                  className="w-5 h-5"
                  style={isActive ? { fill: "currentColor" } : {}}
                />
                <span className={isActive ? "" : "font-medium"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Achievement Badge */}
        <div className="mt-auto p-4 bg-surface-container-low rounded-2xl border border-outline-variant/15">
          <p className="text-[10px] uppercase tracking-tighter font-bold text-primary mb-2">
            Achievement Rank
          </p>
          <div className="flex items-center gap-2">
            <Award className="text-tertiary w-5 h-5" style={{ fill: "currentColor" }} />
            <span className="text-sm font-bold">Language Master</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
