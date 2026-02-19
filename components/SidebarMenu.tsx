"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { BarChart3, Search, Layers, FileText, AlertTriangle, List, Trash2, Home, Globe, Layout, BookOpen, ExternalLink } from "lucide-react"
import { cleanupBadMappings } from "@/lib/cleanup-util"
import { toast } from 'sonner'
import Link from "next/link"

import { BulkAnalysisTrigger } from "@/components/BulkAnalysisTrigger"
import { TestAllModelsTrigger } from "@/components/TestAllModelsTrigger"

export default function SidebarMenu() {
  const pathname = usePathname()

  const NavLink = ({ href, icon: Icon, label, external = false }: { href: string, icon: any, label: string, external?: boolean }) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
    const Component = external ? 'a' : 'a' // Using 'a' for now to match current behavior but could be Link

    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
          ${isActive
            ? "bg-primary text-white shadow-md shadow-primary/20"
            : "text-slate-600 hover:bg-slate-100 hover:text-primary"}
        `}
      >
        <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}`} />
        <span className="flex-1">{label}</span>
        {external && <ExternalLink className="w-3 h-3 opacity-40" />}
      </a>
    )
  }

  return (
    <aside className="w-64 min-h-screen border-r flex flex-col bg-white sticky top-0 h-screen overflow-hidden">
      {/* Brand Header (Optional if Topbar handles it, but good for sidebar consistency) */}
      <div className="p-6 border-b bg-slate-50/50">
        <div className="space-y-3">
          <BulkAnalysisTrigger />
          <TestAllModelsTrigger />
        </div>
      </div>

      <div className="flex-1 p-4 space-y-8 overflow-hidden">
        {/* AI Analytics Section */}
        <section className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Visibilidad en AI</h3>
          <NavLink href="/" icon={Home} label="Dashboard" />
          <NavLink href="/analisis-competidores" icon={Layers} label="Competidores" />
          <NavLink href="/debilidades-oportunidades" icon={AlertTriangle} label="Oportunidades" />
        </section>

        {/* Google Analytics Section */}
        <section className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Visibilidad en Google</h3>
          <NavLink href="/visibilidad-google" icon={Search} label="Search Console" />
        </section>

        {/* Resources Section */}
        <section className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recursos Ext.</h3>
          <NavLink
            href="https://docs.google.com/spreadsheets/d/1dNK2J8mT-iUpva0HBvDq9UXW-Dq0Ao4FkKJzmbJu9hI/edit?gid=0#gid=0"
            icon={List}
            label="Queries Analizadas"
            external
          />
          <NavLink
            href="https://app.clickup.com/20487880/v/dc/kh7p8-79352/kh7p8-278212"
            icon={BookOpen}
            label="Documentación"
            external
          />
        </section>
      </div>

      {/* Footer / Dev Tools */}
      <div className="mt-auto p-4 border-t bg-slate-50/50">
        <button
          onClick={async () => {
            const ok = confirm("¿Seguro que quieres borrar los registros con mapeo erróneo (prompt en cluster)?");
            if (ok) {
              const res = await cleanupBadMappings();
              if (res.success) {
                toast.success(`Limpieza lista. Se borraron ${res.count} registros.`);
                window.location.reload();
              }
            }
          }}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group"
          title="Limpieza de mapeos erróneos"
        >
          <Trash2 className="w-3.5 h-3.5 group-hover:animate-pulse" />
          <span>Mantenimiento</span>
        </button>
      </div>
    </aside>
  )
}
