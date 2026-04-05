"use client";

import { BookOpen, FileText, Video, Download } from "lucide-react";
import Link from "next/link";

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black font-headline text-shimmer mb-2">
            STUDY MATERIAL
          </h1>
          <p className="text-muted-foreground">Access notes, PDFs, videos and more</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/materials" className="group p-6 rounded-2xl bg-surface-container-lowest border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Notes</h3>
            <p className="text-xs text-muted-foreground mt-1">Chapter-wise notes</p>
          </Link>

          <Link href="/materials" className="group p-6 rounded-2xl bg-surface-container-lowest border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-foreground text-sm">PDFs</h3>
            <p className="text-xs text-muted-foreground mt-1">Downloadable PDFs</p>
          </Link>

          <Link href="/materials" className="group p-6 rounded-2xl bg-surface-container-lowest border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Videos</h3>
            <p className="text-xs text-muted-foreground mt-1">Lecture recordings</p>
          </Link>

          <a href="https://wa.me/7908656395" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-surface-container-lowest border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Contact</h3>
            <p className="text-xs text-muted-foreground mt-1">Get study material</p>
          </a>
        </div>
      </div>
    </div>
  );
}
