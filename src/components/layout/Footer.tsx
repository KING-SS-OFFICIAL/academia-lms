import Link from "next/link";
import { School, Globe, Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-[#bacac1]/10 bg-[#f3fcf5]">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <School className="text-primary w-5 h-5" />
            <h2 className="font-headline font-black text-primary text-xl">
              ACADEMIA
            </h2>
          </div>
          <p className="font-body text-sm text-on-surface-variant/70">
            &copy; {new Date().getFullYear()} ACADEMIA English Edutech Hub. All
            rights reserved.
          </p>
        </div>

        <div className="flex gap-8">
          <Link
            href="#"
            className="font-body text-sm text-on-surface-variant/70 hover:text-primary transition-opacity"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-body text-sm text-on-surface-variant/70 hover:text-primary transition-opacity"
          >
            Terms of Service
          </Link>
          <Link
            href="https://wa.me/7908656395"
            className="font-body text-sm text-on-surface-variant/70 hover:text-primary transition-opacity"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <Globe size={18} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <Share2 size={18} />
          </a>
          <a
            href="mailto:academia@example.com"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
