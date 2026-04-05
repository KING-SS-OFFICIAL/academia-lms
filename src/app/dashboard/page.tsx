"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, LogOut, Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import HeroWelcome from "@/components/dashboard/HeroWelcome";
import ProfileCard from "@/components/dashboard/ProfileCard";
import StudentProgress from "@/components/dashboard/StudentProgress";
import StudentLeaderboard, { getStudentRank } from "@/components/dashboard/StudentLeaderboard";
import AcademicRecords from "@/components/dashboard/AcademicRecords";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";

interface ProfileData {
  name: string;
  className: string;
  school: string;
  medium: string;
  contact: string;
  avatarUrl?: string;
}

const defaultProfile: ProfileData = {
  name: "",
  className: "",
  school: "",
  medium: "",
  contact: "",
  avatarUrl: "",
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

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
          avatarUrl: "",
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

  const displayName = profile.name || session?.user?.name || "Student";
  const displayPhoto = profile.avatarUrl || "";
  const greeting = getGreeting();
  const studentRank = getStudentRank();

  return (
    <>
      <main className="pt-24 pb-24 md:pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Student Profile Header */}
          <div className="flex items-center justify-between gap-5 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary-container/10 border border-primary/20">
            <div className="flex items-center gap-5 flex-1 min-w-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center shrink-0 border-2 border-primary">
                {displayPhoto ? (
                  <img src={displayPhoto} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-primary">{displayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">{greeting} 👋</p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground truncate">{displayName}</h2>
                <p className="text-xs text-primary font-medium mt-1">Best Wishes from ACADEMIA ✨</p>
              </div>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="flex items-center gap-2 justify-center">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 ${studentRank.color}`} fill="currentColor">
                  {studentRank.name === "Bronze" && <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />}
                  {studentRank.name === "Silver" && <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />}
                  {studentRank.name === "Gold" && <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />}
                  {studentRank.name === "Platinum" && <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />}
                  {studentRank.name === "Diamond" && <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />}
                  {studentRank.name === "Heroic" && <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" />}
                  {studentRank.name === "Grandmaster" && <path d="M12 2L14 6L18 6L15 9L16 13L12 11L8 13L9 9L6 6L10 6Z" />}
                </svg>
                <div>
                  <div className={`text-sm font-bold ${studentRank.color}`}>
                    {studentRank.name} {studentRank.level}
                  </div>
                  <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Current Rank</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Welcome */}
          <HeroWelcome />

          {/* Profile & Student Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileCard initialData={profile} onSave={setProfile} />
            <StudentProgress />
          </div>

          {/* Student Leaderboard */}
          <StudentLeaderboard />

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
