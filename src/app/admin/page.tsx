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
  Eye,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  Star,
  Download,
  Plus,
  X,
} from "lucide-react";

type AdminTab = "dashboard" | "students" | "tests" | "content" | "settings";

interface Student {
  id: string;
  name: string;
  email: string;
  className: string;
  school: string;
  testsTaken: number;
  avgScore: number;
  rank: string;
  joinedDate: string;
}

interface TestResult {
  id: string;
  studentName: string;
  subject: string;
  chapter: string;
  score: number;
  total: number;
  date: string;
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [students, setStudents] = useState<Student[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Load data from localStorage (simulated admin data)
    const savedTests = localStorage.getItem("testResults");
    if (savedTests) {
      try {
        const tests = JSON.parse(savedTests);
        setTestResults(
          tests.map((t: any, i: number) => ({
            id: `test-${i}`,
            studentName: "Current Student",
            subject: t.subject || "Grammar",
            chapter: t.chapter || "Tenses",
            score: t.correct || 0,
            total: t.total || 15,
            date: t.date || new Date().toLocaleDateString(),
          }))
        );
      } catch {}
    }

    // Simulated student data
    setStudents([
      {
        id: "1",
        name: "Arjun Sharma",
        email: "arjun@email.com",
        className: "Class X",
        school: "Delhi Public School",
        testsTaken: 45,
        avgScore: 78,
        rank: "Silver II",
        joinedDate: "15 Jan 2024",
      },
      {
        id: "2",
        name: "Priya Patel",
        email: "priya@email.com",
        className: "Class IX",
        school: "Kendriya Vidyalaya",
        testsTaken: 32,
        avgScore: 85,
        rank: "Gold I",
        joinedDate: "22 Feb 2024",
      },
      {
        id: "3",
        name: "Rahul Kumar",
        email: "rahul@email.com",
        className: "Class VIII",
        school: "St. Xavier's School",
        testsTaken: 18,
        avgScore: 62,
        rank: "Bronze III",
        joinedDate: "10 Mar 2024",
      },
      {
        id: "4",
        name: "Sneha Gupta",
        email: "sneha@email.com",
        className: "Class XI",
        school: "DAV Public School",
        testsTaken: 67,
        avgScore: 92,
        rank: "Platinum II",
        joinedDate: "5 Dec 2023",
      },
      {
        id: "5",
        name: "Amit Singh",
        email: "amit@email.com",
        className: "Class XII",
        school: "Ryan International",
        testsTaken: 25,
        avgScore: 71,
        rank: "Silver I",
        joinedDate: "18 Apr 2024",
      },
    ]);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const totalTests = testResults.length;
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((sum, t) => sum + (t.score / t.total) * 100, 0) / testResults.length)
    : 0;
  const totalStudents = students.length;
  const passRate = testResults.length > 0
    ? Math.round((testResults.filter(t => (t.score / t.total) * 100 >= 60).length / testResults.length) * 100)
    : 0;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

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
        className={`fixed lg:sticky top-0 left-0 h-screen bg-surface-container-low border-r border-border/50 transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-black text-primary">ACADEMIA</h1>
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
              onClick={() => setActiveTab(item.id)}
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
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
                </div>
                <div className="text-3xl font-black text-foreground">{totalStudents}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+8%</span>
                </div>
                <div className="text-3xl font-black text-foreground">{totalTests}</div>
                <div className="text-sm text-muted-foreground">Tests Completed</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+5%</span>
                </div>
                <div className="text-3xl font-black text-foreground">{avgScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+3%</span>
                </div>
                <div className="text-3xl font-black text-foreground">{passRate}%</div>
                <div className="text-sm text-muted-foreground">Pass Rate</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Test Results</h3>
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.slice(-5).reverse().map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                      <div>
                        <div className="font-bold text-foreground">{test.studentName}</div>
                        <div className="text-sm text-muted-foreground">{test.subject} - {test.chapter}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-black ${
                          (test.score / test.total) * 100 >= 80 ? 'text-green-500' :
                          (test.score / test.total) * 100 >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {Math.round((test.score / test.total) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">{test.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No test results yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Students */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground">Students</h2>
                <p className="text-muted-foreground mt-1">Manage student accounts</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-all">
                <Plus size={16} /> Add Student
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students by name, email, or class..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Student Table */}
            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Class</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Tests</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg Score</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Rank</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {paginatedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{student.className}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{student.testsTaken}</td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${
                            student.avgScore >= 80 ? 'text-green-500' :
                            student.avgScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {student.avgScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-primary">{student.rank}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors">
                              <Eye size={16} className="text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors">
                              <Edit size={16} className="text-blue-500" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-surface-container-highest disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "hover:bg-surface-container-highest text-muted-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-surface-container-highest disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test Results */}
        {activeTab === "tests" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground">Test Results</h2>
                <p className="text-muted-foreground mt-1">View all test submissions</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-all">
                <Download size={16} /> Export
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-border/50 overflow-hidden">
              {testResults.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {testResults.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          (test.score / test.total) * 100 >= 80 ? 'bg-green-500/10' :
                          (test.score / test.total) * 100 >= 60 ? 'bg-yellow-500/10' : 'bg-red-500/10'
                        }`}>
                          <Trophy className={`w-6 h-6 ${
                            (test.score / test.total) * 100 >= 80 ? 'text-green-500' :
                            (test.score / test.total) * 100 >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{test.studentName}</div>
                          <div className="text-sm text-muted-foreground">{test.subject} - {test.chapter}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${
                          (test.score / test.total) * 100 >= 80 ? 'text-green-500' :
                          (test.score / test.total) * 100 >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {Math.round((test.score / test.total) * 100)}%
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
                  <p className="text-sm">Results will appear here when students take tests</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Management */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground">Content Management</h2>
                <p className="text-muted-foreground mt-1">Manage questions, subjects, and materials</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-all">
                <Plus size={16} /> Add Content
              </button>
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
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex-1 py-2 rounded-lg bg-surface-container-highest text-sm font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-surface-container-highest text-sm font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      View
                    </button>
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
                    <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                    <div>
                      <div className="font-bold text-foreground">Contact Number</div>
                      <div className="text-sm text-muted-foreground">+91 7908656395</div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low">
                    <div>
                      <div className="font-bold text-foreground">Test Timer</div>
                      <div className="text-sm text-muted-foreground">Enabled</div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
                      Edit
                    </button>
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
                    <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
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
