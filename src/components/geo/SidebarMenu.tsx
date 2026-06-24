"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Search, Layers, AlertTriangle, List, Trash2, Home, BookOpen, ExternalLink, ChevronLeft } from "lucide-react"
import { cleanupBadMappings } from "@/lib/geo/cleanup-util"
import { toast } from 'sonner'
import Link from "next/link"

import { BulkAnalysisTrigger } from "@/components/geo/BulkAnalysisTrigger"
import { TestAllModelsTrigger } from "@/components/geo/TestAllModelsTrigger"

const navLink = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"

export default function SidebarMenu() {
  const pathname = usePathname()

  const NavLink = ({ href, icon: Icon, label, external = false }: { href: string, icon: any, label: string, external?: boolean }) => {
    const isActive = pathname === href
    const props = external
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { href }

    return (
      <a
        {...props}
        className={navLink}
        style={isActive
          ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
          : { color: "var(--sidebar-muted)" }
        }
        onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(108,41,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-foreground)"; } }}
        onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-muted)"; } }}
      >
        <Icon className="size-4 shrink-0" aria-hidden />
        <span className="flex-1">{label}</span>
        {external && <ExternalLink className="w-3 h-3 opacity-40" />}
      </a>
    )
  }

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r"
      style={{ backgroundColor: "var(--sidebar)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex h-14 items-center border-b px-4"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--sidebar-foreground)" }}>
          GEO Intelligence
        </span>
      </div>

      {/* Nav */}
      <nav className="sidebar-scroll flex-1 space-y-0.5 overflow-y-auto p-3">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--sidebar-muted)" }}>
          Visibilidad en AI
        </p>
        <NavLink href="/geo" icon={Home} label="Dashboard" />
        <NavLink href="/geo/analisis-competidores" icon={Layers} label="Competidores" />
        <NavLink href="/geo/debilidades-oportunidades" icon={AlertTriangle} label="Oportunidades" />

        <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--sidebar-muted)" }}>
          Visibilidad en Google
        </p>
        <NavLink href="/geo/visibilidad-google" icon={Search} label="Search Console" />

        <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--sidebar-muted)" }}>
          Recursos
        </p>
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
      </nav>

      {/* Bulk tools */}
      <div className="space-y-1 border-t p-3" style={{ borderColor: "var(--border)" }}>
        <BulkAnalysisTrigger />
        <TestAllModelsTrigger />
      </div>

      {/* Footer */}
      <div className="border-t p-3 space-y-1" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={async () => {
            const ok = confirm("¿Seguro que quieres borrar los registros con mapeo erróneo?");
            if (ok) {
              const res = await cleanupBadMappings();
              if (res.success) {
                toast.success(`Limpieza lista. Se borraron ${res.count} registros.`);
                window.location.reload();
              }
            }
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:text-red-400"
          style={{ color: "var(--sidebar-muted)" }}
          title="Limpieza de mapeos erróneos"
        >
          <Trash2 className="size-4 shrink-0" />
          Mantenimiento
        </button>
        <Link
          href="/seo"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
          style={{ color: "var(--sidebar-muted)" }}
        >
          <ChevronLeft className="size-4 shrink-0" />
          SEO Tool
        </Link>
      </div>
    </aside>
  )
}
