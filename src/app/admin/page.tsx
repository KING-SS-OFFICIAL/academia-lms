"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  Trophy,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Star,
  Download,
  Plus,
  Lock,
  Shield,
  User,
  Phone,
  GraduationCap,
  School,
  Mail,
  Eye,
} from "lucide-react";

type AdminTab = "dashboard" | "students" | "tests" | "content" | "settings";

interface Student {
  id: string;
  name: string;
  email: string;
  className: string;
  school: string;
  medium: string;
  contact: string;
  parentContact: string;
  avatarUrl: string;
  testsTaken: number;
  avgScore: number;
  rank: string;
  joinedDate: string;
  testHistory: { subject: string; chapter: string; score: number; total: number; percentage: number; date: string }[];
}

const ADMIN_ID = "@RinDAm#AcademIa";
const ADMIN_PASSWORD = "Ac@DemIAbyArinD@M";

function AdminAuth({ onAuthenticated, userEmail }: { onAuthenticated: () => void; userEmail: string }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const allowedEmail = "sg5517419@gmail.com";

      if (userEmail !== allowedEmail) {
        setError("Access denied. Only authorized Gmail can access admin panel.");
        setLoading(false);
        return;
      }

      if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        onAuthenticated();
      } else {
        setError("Invalid Admin ID or Password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-foreground">Admin Access</h2>
          <p className="text-muted-foreground mt-1">Enter credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface-container-lowest rounded-2xl border border-border/50 p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Admin ID</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface-container-low focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface-container-low focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !adminId || !password}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Verifying...
              </div>
            ) : (
              "Access Admin Panel"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [classFilter, setClassFilter] = useState("All");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      const adminAuth = localStorage.getItem("adminAuth");
      if (adminAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, [status, router]);

  useEffect(() => {
    // Load real student profiles from localStorage
    const allProfiles: Student[] = [];
    const allTestResults: Record<string, any[]> = {};

    // Collect all student profiles
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === "studentProfile") {
        try {
          const profile = JSON.parse(localStorage.getItem(key)!);
          const testResults = JSON.parse(localStorage.getItem("testResults") || "[]");
          const qualifiedTests = testResults.filter((t: any) => t.percentage >= 75);
          const avgScore = testResults.length > 0
            ? Math.round(testResults.reduce((sum: number, t: any) => sum + t.percentage, 0) / testResults.length)
            : 0;

          allProfiles.push({
            id: "1",
            name: profile.name || session?.user?.name || "Student",
            email: session?.user?.email || "",
            className: profile.className || "N/A",
            school: profile.school || "N/A",
            medium: profile.medium || "N/A",
            contact: profile.contact || "N/A",
            parentContact: "N/A",
            avatarUrl: profile.avatarUrl || session?.user?.image || "",
            testsTaken: testResults.length,
            avgScore,
            rank: qualifiedTests.length >= 400 ? "Grandmaster" :
                  qualifiedTests.length >= 280 ? "Heroic" :
                  qualifiedTests.length >= 180 ? "Diamond" :
                  qualifiedTests.length >= 130 ? "Platinum" :
                  qualifiedTests.length >= 90 ? "Gold" :
                  qualifiedTests.length >= 40 ? "Silver" :
                  qualifiedTests.length >= 10 ? "Bronze" : "Bronze I",
            joinedDate: new Date().toLocaleDateString(),
            testHistory: testResults.map((t: any) => ({
              subject: t.subject || "Grammar",
              chapter: t.chapter || "Tenses",
              score: t.correct || 0,
              total: t.total || 15,
              percentage: t.percentage || 0,
              date: t.date || new Date().toLocaleDateString(),
            })),
          });
        } catch {}
      }
    }

    // Add sample students for demonstration
    if (allProfiles.length === 0) {
      allProfiles.push(
        { id: "1", name: "Arjun Sharma", email: "arjun@email.com", className: "Class X", school: "Delhi Public School", medium: "English", contact: "9876543210", parentContact: "9876543211", avatarUrl: "", testsTaken: 45, avgScore: 78, rank: "Silver II", joinedDate: "15 Jan 2024", testHistory: [{ subject: "Grammar", chapter: "Tenses", score: 12, total: 15, percentage: 80, date: "20 Mar 2024" }] },
        { id: "2", name: "Priya Patel", email: "priya@email.com", className: "Class IX", school: "Kendriya Vidyalaya", medium: "English", contact: "9876543212", parentContact: "9876543213", avatarUrl: "", testsTaken: 32, avgScore: 85, rank: "Gold I", joinedDate: "22 Feb 2024", testHistory: [{ subject: "GK", chapter: "Indian History", score: 14, total: 15, percentage: 93, date: "18 Mar 2024" }] },
        { id: "3", name: "Rahul Kumar", email: "rahul@email.com", className: "Class VIII", school: "St. Xavier's School", medium: "Hindi", contact: "9876543214", parentContact: "9876543215", avatarUrl: "", testsTaken: 18, avgScore: 62, rank: "Bronze III", joinedDate: "10 Mar 2024", testHistory: [{ subject: "Mathematics", chapter: "Percentage", score: 10, total: 15, percentage: 67, date: "15 Mar 2024" }] },
        { id: "4", name: "Sneha Gupta", email: "sneha@email.com", className: "Class XI", school: "DAV Public School", medium: "English", contact: "9876543216", parentContact: "9876543217", avatarUrl: "", testsTaken: 67, avgScore: 92, rank: "Platinum II", joinedDate: "5 Dec 2023", testHistory: [{ subject: "Grammar", chapter: "Prepositions", score: 14, total: 15, percentage: 93, date: "22 Mar 2024" }] },
        { id: "5", name: "Amit Singh", email: "amit@email.com", className: "Class XII", school: "Ryan International", medium: "English", contact: "9876543218", parentContact: "9876543219", avatarUrl: "", testsTaken: 25, avgScore: 71, rank: "Silver I", joinedDate: "18 Apr 2024", testHistory: [{ subject: "Reasoning", chapter: "Coding-Decoding", score: 11, total: 15, percentage: 73, date: "25 Mar 2024" }] },
      );
    }

    setStudents(allProfiles);
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} userEmail={session?.user?.email?.toLowerCase() || ""} />;
  }

  const totalStudents = students.length;
  const totalTests = students.reduce((sum, s) => sum + s.testsTaken, 0);
  const avgScore = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.avgScore, 0) / students.length)
    : 0;
  const passRate = students.length > 0
    ? Math.round((students.filter(s => s.avgScore >= 60).length / students.length) * 100)
    : 0;

  const allClasses = ["All", ...Array.from(new Set(students.map(s => s.className)))];
  const filteredStudents = students
    .filter(s => classFilter === "All" || s.className === classFilter)
    .filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.className.localeCompare(b.className));

  const navItems = [
    { id: "dashboard" as AdminTab, label: "Dashboard", icon: BarChart3 },
    { id: "students" as AdminTab, label: "Students", icon: Users },
    { id: "tests" as AdminTab, label: "Test Results", icon: Trophy },
    { id: "content" as AdminTab, label: "Content", icon: BookOpen },
    { id: "settings" as AdminTab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-surface-container-low border-r border-border/50 transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-black text-primary">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSelectedStudent(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-muted-foreground hover:bg-surface-container-highest"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              signOut({ callbackUrl: "/" });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 lg:p-8 overflow-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">{totalStudents}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">{totalTests}</div>
                <div className="text-sm text-muted-foreground">Tests Completed</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">{avgScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground">{passRate}%</div>
                <div className="text-sm text-muted-foreground">Pass Rate</div>
              </div>
            </div>

            {/* Students by Class */}
            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Students by Class</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allClasses.filter(c => c !== "All").map(cls => {
                  const classStudents = students.filter(s => s.className === cls);
                  return (
                    <div key={cls} className="p-4 rounded-xl bg-surface-container-low text-center">
                      <div className="text-2xl font-black text-primary">{classStudents.length}</div>
                      <div className="text-sm text-muted-foreground">{cls}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Students */}
        {activeTab === "students" && !selectedStudent && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-foreground">Students</h2>
              <p className="text-muted-foreground mt-1">Manage student accounts</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-border bg-surface-container-lowest focus:border-primary outline-none"
              >
                {allClasses.map(c => (
                  <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>
                ))}
              </select>
            </div>

            {/* Student Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                      {student.avatarUrl ? (
                        <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-primary">{student.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.className} • {student.medium}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-black text-foreground">{student.testsTaken}</div>
                      <div className="text-xs text-muted-foreground">Tests</div>
                    </div>
                    <div>
                      <div className={`text-lg font-black ${student.avgScore >= 80 ? 'text-green-500' : student.avgScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{student.avgScore}%</div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-primary">{student.rank}</div>
                      <div className="text-xs text-muted-foreground">Rank</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><School size={14} /> {student.school}</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> {student.contact}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-bold">No students found</p>
              </div>
            )}
          </div>
        )}

        {/* Student Detail View */}
        {activeTab === "students" && selectedStudent && (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedStudent(null)}
              className="flex items-center gap-2 text-primary font-bold hover:underline"
            >
              <ChevronLeft size={20} /> Back to Students
            </button>

            {/* Student Profile */}
            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                  {selectedStudent.avatarUrl ? (
                    <img src={selectedStudent.avatarUrl} alt={selectedStudent.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-primary">{selectedStudent.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-foreground">{selectedStudent.name}</h2>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap size={16} className="text-primary" />
                      <span>{selectedStudent.className}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <School size={16} className="text-primary" />
                      <span>{selectedStudent.school}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen size={16} className="text-primary" />
                      <span>{selectedStudent.medium}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-primary" />
                      <span>{selectedStudent.contact}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Parent: {selectedStudent.parentContact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50 text-center">
                <div className="text-3xl font-black text-foreground">{selectedStudent.testsTaken}</div>
                <div className="text-sm text-muted-foreground">Tests Given</div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50 text-center">
                <div className={`text-3xl font-black ${selectedStudent.avgScore >= 80 ? 'text-green-500' : selectedStudent.avgScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{selectedStudent.avgScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50 text-center">
                <div className="text-3xl font-black text-primary">{selectedStudent.rank}</div>
                <div className="text-sm text-muted-foreground">Current Rank</div>
              </div>
            </div>

            {/* Test History */}
            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Test History</h3>
              {selectedStudent.testHistory.length > 0 ? (
                <div className="space-y-3">
                  {selectedStudent.testHistory.map((test, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                      <div>
                        <div className="font-bold text-foreground">{test.subject} - {test.chapter}</div>
                        <div className="text-sm text-muted-foreground">{test.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-black ${test.percentage >= 80 ? 'text-green-500' : test.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {test.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">{test.score}/{test.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No tests taken yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test Results */}
        {activeTab === "tests" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-foreground">Test Results</h2>
              <p className="text-muted-foreground mt-1">All student test submissions</p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 overflow-hidden">
              {students.flatMap(s => s.testHistory.map(t => ({ ...t, studentName: s.name, studentClass: s.className }))).length > 0 ? (
                <div className="divide-y divide-border/50">
                  {students.flatMap(s => s.testHistory.map(t => ({ ...t, studentName: s.name, studentClass: s.className }))).map((test, i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          test.percentage >= 80 ? 'bg-green-500/10' :
                          test.percentage >= 60 ? 'bg-yellow-500/10' : 'bg-red-500/10'
                        }`}>
                          <Trophy className={`w-6 h-6 ${
                            test.percentage >= 80 ? 'text-green-500' :
                            test.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{test.studentName}</div>
                          <div className="text-sm text-muted-foreground">{test.subject} - {test.chapter} • {test.studentClass}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${
                          test.percentage >= 80 ? 'text-green-500' :
                          test.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {test.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">{test.score}/{test.total} correct • {test.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-bold">No test results yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Management */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-foreground">Content Management</h2>
              <p className="text-muted-foreground mt-1">Manage questions, subjects, and materials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Grammar", chapters: 12, questions: 180, color: "bg-blue-500/10", iconColor: "text-blue-500" },
                { name: "General Knowledge", chapters: 10, questions: 150, color: "bg-green-500/10", iconColor: "text-green-500" },
                { name: "History", chapters: 8, questions: 120, color: "bg-yellow-500/10", iconColor: "text-yellow-500" },
                { name: "Reasoning", chapters: 10, questions: 150, color: "bg-purple-500/10", iconColor: "text-purple-500" },
                { name: "Mathematics", chapters: 10, questions: 150, color: "bg-red-500/10", iconColor: "text-red-500" },
                { name: "Quiz", chapters: 8, questions: 120, color: "bg-cyan-500/10", iconColor: "text-cyan-500" },
              ].map((subject) => (
                <div key={subject.name} className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all group">
                  <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <BookOpen className={`w-6 h-6 ${subject.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{subject.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{subject.chapters} chapters</span>
                    <span>•</span>
                    <span>{subject.questions} questions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-foreground">Settings</h2>
              <p className="text-muted-foreground mt-1">Manage platform configuration</p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                    <div>
                      <div className="font-bold text-foreground">Platform Name</div>
                      <div className="text-sm text-muted-foreground">ACADEMIA - English Excellence</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                    <div>
                      <div className="font-bold text-foreground">Contact Number</div>
                      <div className="text-sm text-muted-foreground">+91 7908656395</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Danger Zone</h3>
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-red-500">Reset All Data</div>
                      <div className="text-sm text-muted-foreground">Clear all student data and test results</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure? This will delete all data.")) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
