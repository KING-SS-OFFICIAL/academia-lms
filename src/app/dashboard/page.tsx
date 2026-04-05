"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, LogOut, Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import HeroWelcome from "@/components/dashboard/HeroWelcome";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AITestCenter from "@/components/dashboard/AITestCenter";
import AcademicRecords from "@/components/dashboard/AcademicRecords";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";

interface ProfileData {
  name: string;
  className: string;
  school: string;
  medium: string;
  contact: string;
}

const defaultProfile: ProfileData = {
  name: "",
  className: "",
  school: "",
  medium: "",
  contact: "",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      const saved = localStorage.getItem("studentProfile");
      if (saved) {
        try {
          setProfile(JSON.parse(saved));
        } catch {
          // Invalid JSON, ignore
        }
      } else if (session?.user) {
        setProfile({
          name: session.user.name || "",
          className: "",
          school: "",
          medium: "",
          contact: "",
        });
      }
      setProfileLoaded(true);
    }
  }, [session, status]);

  if (status === "loading" || !profileLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <main className="pt-24 pb-24 md:pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Hero Welcome */}
          <HeroWelcome name={profile.name || session?.user?.name || "Student"} />

          {/* Profile & AI Test Center */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileCard initialData={profile} onSave={setProfile} />
            <AITestCenter />
          </div>

          {/* Academic Records */}
          <AcademicRecords />

          {/* Logout Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-error-container/30 hover:text-error transition-all font-semibold text-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* AI Tutor FAB (Desktop) */}
      <a
        href="/ai-tutor"
        className="hidden lg:flex fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 cursor-pointer active:scale-95 transition-all group z-50 items-center gap-0 hover:gap-3 px-4 w-14 hover:w-48"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Tutor Help
        </span>
      </a>
    </>
  );
}
