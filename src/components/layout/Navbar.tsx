"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, School } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Student Portal" },
  { href: "/leaderboard", label: "Dashboard" },
  { href: "/materials", label: "Study Material" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f3fcf5]/80 backdrop-blur-xl border-b border-[#bacac1]/15 shadow-[0_8px_32px_0_rgba(0,108,82,0.04)]">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <School className="text-primary w-6 h-6" />
          <h1 className="text-2xl font-extrabold text-primary tracking-tighter font-headline">
            ACADEMIA
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "nav-link-active"
                    : "nav-link"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">
              Premium Member
            </span>
          </div>
          <Link
            href="/login"
            className="hidden md:flex gradient-btn-sm text-xs !px-4 !py-2"
          >
            Login
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-primary"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant/15 animate-slide-down">
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 font-headline font-semibold ${
                    pathname === link.href
                      ? "text-primary border-l-4 border-primary pl-4"
                      : "text-on-surface-variant pl-4"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-outline-variant/20">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="gradient-btn-sm justify-center w-full"
              >
                Login / Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
