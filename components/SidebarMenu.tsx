import React from "react"
import { usePathname } from "next/navigation"
import { BarChart3, Search, Layers, Settings2 } from "lucide-react"

export default function SidebarMenu() {
  const pathname = usePathname()
  return (
    <aside className="w-56 min-h-screen bg-card border-r flex flex-col items-center py-8 sticky top-0 h-screen bg-[#F9F8FC]">
      <img src="/favicon.png" alt="Genially Logo" className="w-10 h-10 mb-6" />
      <nav className="flex flex-col gap-2 w-full">
        <a
          href="/"
          style={{width: "auto"}}
          className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors
              ${pathname === "/" ? "bg-white rounded-xl shadow-sm" : "hover:bg-accent"}
              pl-5 pr-3`}
        >
          <BarChart3 className="w-5 h-5 text-primary" />
          Análisis GEO
        </a>
        <a 
        href="/analisis-queries"  style={{width: "auto"}}
        className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors
             ${pathname.startsWith("/analisis-queries") ? "bg-white rounded-xl shadow-sm" : "hover:bg-accent"}
             pl-5 pr-3`}
        >
          <Search className="w-5 h-5 text-primary" />
          Análisis de Queries
          </a>
        <a
          href="/fanout" style={{width: "auto"}}
          className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors
             ${pathname.startsWith("/fanout") ? "bg-white rounded-xl shadow-sm" : "hover:bg-accent"}
             pl-5 pr-3`}
        >
          <Layers className="w-5 h-5 text-primary" />
          Query Fan-Out
        </a>
        <a
          href="/optimizador" style={{width: "auto"}}
          className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors
             ${pathname.startsWith("/optimizador") ? "bg-white rounded-xl shadow-sm" : "hover:bg-accent"}
             pl-5 pr-3`}
        >
          <Settings2 className="w-5 h-5 text-primary" />
          Optimizador de Contenidos
        </a>
      </nav>
    </aside>
  )
} 