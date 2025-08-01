import React from "react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="w-full bg-[#121212] border-b flex items-center px-4 py-4 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link href="/">
          <img src="/favicon.png" alt="Genially Logo" className="w-8 h-8 mr-2" />
        </Link>
        <span className="text-xl text-white tracking-tight select-none">Genially Geo</span>
      </div>
      <nav className="ml-auto flex gap-4 items-center">
             </nav>
    </header>
  );
} 