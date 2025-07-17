import React from "react"
import { usePathname } from "next/navigation"
import { BarChart3, Search, Layers, FileText, AlertTriangle } from "lucide-react"

export default function SidebarMenu() {
  const pathname = usePathname()
  return (
    <aside className="w-56 min-h-screen bg-card border-r flex flex-col items-center py-8 sticky top-0 h-screen bg-[#F9F8FC]">
      <nav className="flex flex-col gap-2 w-full">
        <a
          href="/"
          style={{width: "auto"}}
          className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors
              ${pathname === "/" ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent  hover:rounded-xl"}
              pl-5 pr-3`}
        >
          <BarChart3 className="w-5 h-5 text-primary" />
          Análisis
        </a>
        <a
          href="/debilidades-oportunidades"
          style={{width: "auto"}}
          className={`flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left  transition-colors
              ${pathname.startsWith("/debilidades-oportunidades") ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent hover:rounded-xl"}
              pl-5 pr-3`}
        >
          <AlertTriangle className="w-5 h-5 text-primary" />
          Debilidades y Oportunidades
        </a>
        <a
          href="https://app.clickup.com/20487880/v/dc/kh7p8-79352/kh7p8-278212"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 my-1 ml-2 mr-2 font-semibold text-primary text-left transition-colors hover:bg-accent hover:rounded-xl pl-5 pr-3"
        >
          <FileText className="w-5 h-5 text-primary" />
          Documentación
        </a>
      </nav>
    </aside>
  )
} 