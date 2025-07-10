import React from "react"
import { usePathname } from "next/navigation"

export default function SidebarMenu() {
  const pathname = usePathname()
  return (
    <aside className="w-56 min-h-screen bg-card border-r border-border flex flex-col items-center py-8 sticky top-0 h-screen">
      <img src="/favicon.png" alt="Genially Logo" className="w-10 h-10 mb-6" />
      <nav className="flex flex-col gap-2 w-full">
        <a
          href="/"
          className={`px-4 py-2 rounded font-semibold text-primary text-left w-full hover:bg-accent ${pathname === "/" ? "bg-accent" : ""}`}
        >
          Análisis GEO
        </a>
        <a
          href="/fanout"
          className={`px-4 py-2 rounded font-semibold text-primary text-left w-full hover:bg-accent ${pathname.startsWith("/fanout") ? "bg-accent" : ""}`}
        >
          Query Fan-Out
        </a>
      </nav>
    </aside>
  )
} 