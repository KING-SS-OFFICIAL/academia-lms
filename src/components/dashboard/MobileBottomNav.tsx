"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, LayoutDashboard, User, Sparkles } from "lucide-react";

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Portal", icon: GraduationCap },
  { href: "/leaderboard", label: "Board", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-outline-variant/10 px-6 py-3 flex justify-between items-center z-50">
      {mobileNavItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-[#006c52]" : "text-[#3b4a43]"
            }`}
          >
            <item.icon
              className="w-5 h-5"
              style={isActive ? { fill: "currentColor" } : {}}
            />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}

      {/* Center AI Button */}
      <Link
        href="/test"
        className="bg-primary-container p-3 rounded-full -translate-y-6 shadow-lg shadow-primary-container/30"
      >
        <Sparkles className="text-on-primary-container w-5 h-5" />
      </Link>

      {mobileNavItems.slice(2).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${
              isActive ? "text-[#006c52]" : "text-[#3b4a43]"
            }`}
          >
            <item.icon
              className="w-5 h-5"
              style={isActive ? { fill: "currentColor" } : {}}
            />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
