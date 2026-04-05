"use client";

import { BookOpen, FileText, Video, Download, ExternalLink, Search, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SUBJECTS, SubjectId } from "@/constants/test";

const materialCategories = [
  {
    icon: BookOpen,
    title: "Chapter Notes",
    description: "Detailed notes for each chapter and subject",
    color: "bg-primary/10",
    iconColor: "text-primary",
    link: "https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20chapter%20notes",
  },
  {
    icon: FileText,
    title: "PDF Study Material",
    description: "Downloadable PDFs for offline study",
    color: "bg-red-500/10",
    iconColor: "text-red-500",
    link: "https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20PDF%20study%20material",
  },
  {
    icon: Video,
    title: "Video Lectures",
    description: "Recorded lectures and tutorial videos",
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
    link: "https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20video%20lectures",
  },
  {
    icon: Download,
    title: "Previous Year Papers",
    description: "Practice with past exam papers",
    color: "bg-green-500/10",
    iconColor: "text-green-500",
    link: "https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20previous%20year%20papers",
  },
  {
    icon: FolderOpen,
    title: "Practice Worksheets",
    description: "Extra practice sheets for each topic",
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
    link: "https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20practice%20worksheets",
  },
  {
    icon: ExternalLink,
    title: "Contact for Material",
    description: "Get study material via WhatsApp",
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    link: "https://wa.me/7908656395",
  },
];

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "all">("all");

  const filteredSubjects = SUBJECTS.filter(s =>
    selectedSubject === "all" || s.id === selectedSubject
  ).filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black font-headline text-shimmer mb-2">
            STUDY MATERIAL
          </h1>
          <p className="text-muted-foreground">Access notes, PDFs, videos and more</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedSubject("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedSubject === "all"
                ? "bg-primary text-white"
                : "bg-surface-container-lowest border border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            All Subjects
          </button>
          {SUBJECTS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id as SubjectId)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedSubject === s.id
                  ? "bg-primary text-white"
                  : "bg-surface-container-lowest border border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Material Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {materialCategories.map((cat) => (
            <a
              key={cat.title}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-surface-container-lowest border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 text-center"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
              </div>
              <h3 className="font-bold text-foreground text-sm">{cat.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
            </a>
          ))}
        </div>

        {/* Subject-wise Material */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-foreground">Subject-wise Material</h2>
          {filteredSubjects.map(subject => (
            <div key={subject.id} className="bg-surface-container-lowest rounded-2xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{subject.icon}</span>
                <h3 className="text-xl font-bold text-foreground">{subject.name}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {subject.chapters.map(chapter => (
                  <a
                    key={chapter}
                    href={`https://wa.me/7908656395?text=Hi%20Sir%2C%20I%20need%20study%20material%20for%20${subject.name}%20-%20${chapter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-container-low border border-border/50 hover:border-primary/50 transition-all text-center group"
                  >
                    <div className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">{chapter}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No subjects found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
