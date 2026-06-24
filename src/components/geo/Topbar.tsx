import React from "react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="w-full bg-[#121212] border-b flex items-center px-4 py-4 shadow-sm sticky top-0 z-20">

      <Link href="/" className="flex items-center gap-3">
        <img src="/favicon.png" alt="Genially Logo" className="w-8 h-8 mr-2" />
        <span className="text-xl text-white tracking-tight select-none">Genially Brand Visibility</span>
      </Link>

      <nav className="ml-auto flex gap-4 items-center">
      </nav>
    </header>
  );
} 