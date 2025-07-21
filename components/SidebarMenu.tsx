import React from "react"
import { usePathname } from "next/navigation"
import { BarChart3, Search, Layers, FileText, AlertTriangle, Brain, List } from "lucide-react"

export default function SidebarMenu() {
  const pathname = usePathname()
  return (
    <aside className="w-56 min-h-screen bg-card border-r flex flex-col items-center py-8 sticky top-0 h-screen bg-[#F9F8FC]">
      <nav className="flex flex-col gap-2 w-full">
        <a
          href="/"
          style={{width: "auto"}}
          className={`flex items-center gap-3 px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left transition-colors
              ${pathname === "/" ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent  hover:rounded-xl"}
              pr-3 text-sm`}
        >
          <BarChart3 className="w-5 h-5 text-primary" />
          Análisis de prompts
        </a>
        <a
          href="/debilidades-oportunidades"
          style={{width: "auto"}}
          className={`flex items-center gap-3 px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left  transition-colors
              ${pathname.startsWith("/debilidades-oportunidades") ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent hover:rounded-xl"}
              pr-3 text-sm`}
        >
          <AlertTriangle className="w-5 h-5 text-primary" />
          Análisis de Oportunidades
        </a>
        <a
          href="/analisis-competidores"
          style={{width: "auto"}}
          className={`flex items-center gap-3 text-sm px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left  transition-colors
              ${pathname.startsWith("/analisis-competidores") ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent hover:rounded-xl"}
              pr-3`}
        >
          <Layers className="w-5 h-5 text-primary" />
          Análisis de competidores
        </a>
        <a
          href="/audit"
          style={{width: "auto"}}
          className={`flex items-center text-sm gap-3 px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left  transition-colors
              ${pathname.startsWith("/audit") ? "bg-accent rounded-xl shadow-sm" : "hover:bg-accent hover:rounded-xl"}
              pr-3`}
        >
          <Brain className="w-5 h-5 text-primary" />
          Auditoría contenido
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1dNK2J8mT-iUpva0HBvDq9UXW-Dq0Ao4FkKJzmbJu9hI/edit?gid=0#gid=0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left transition-colors hover:bg-accent hover:rounded-xl pr-3 text-sm"
        >
          <List className="w-5 h-5 text-primary" />
          Queries analizadas
        </a>
        <a
          href="https://app.clickup.com/20487880/v/dc/kh7p8-79352/kh7p8-278212"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-2 py-2 my-1 ml-1 mr-1 font-semibold text-primary text-left transition-colors hover:bg-accent hover:rounded-xl pr-3 text-sm"
        >
          <FileText className="w-5 h-5 text-primary" />
          Documentación
        </a>
      </nav>
    </aside>
  )
} 