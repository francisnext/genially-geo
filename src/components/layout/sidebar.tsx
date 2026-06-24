"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  ChevronsUpDown,
  ClipboardCheck,
  LayoutDashboard,
  Link2,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  LayoutGrid,
  LogOut,
  Settings,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";
import { useProjects } from "@/components/providers/projects-provider";
import { Logo } from "@/components/layout/logo";

const navItems = [
  { segment: "", label: "Overview", icon: LayoutGrid },
  { segment: "keywords", label: "GAP Analysis", icon: Search },
  { segment: "backlinks", label: "Backlinks", icon: Link2 },
  { segment: "audit", label: "Site Audit", icon: ClipboardCheck },
  { segment: "ai", label: "AI Visibility", icon: Bot },
] as const;

// Sidebar uses CSS vars so it respects the design system tokens
const S = {
  aside: "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col transition-[width] duration-200 ease-out border-r",
  asideCollapsed: "fixed left-0 top-0 z-40 flex h-screen w-12 flex-col items-center py-4 border-r",
  navLink: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
  label: "px-3 pb-1 text-[10px] font-bold uppercase tracking-wider",
};

export function Sidebar({
  projectId,
  collapsed,
  onToggleCollapsed,
}: {
  projectId: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const pathname = usePathname();
  const { projects, currentProject } = useProjects();
  const { user, logout } = useAuth();
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(e.target as Node)) {
        setProjectDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const segment =
    pathname === `/seo/p/${projectId}` || pathname === `/seo/p/${projectId}/`
      ? ""
      : pathname?.startsWith(`/seo/p/${projectId}/`)
        ? pathname.replace(`/seo/p/${projectId}`, "").split("/")[1] || "keywords"
        : "keywords";

  const projectLabel = currentProject ? currentProject.name : `Project: ${projectId}`;
  const projectTitle = currentProject ? currentProject.domain : undefined;

  if (collapsed) {
    return (
      <aside
        className={S.asideCollapsed}
        style={{ backgroundColor: "var(--sidebar)", borderColor: "var(--border)" }}
        aria-label="Main navigation collapsed"
      >
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="flex size-10 items-center justify-center rounded-lg transition-colors"
          style={{ color: "var(--sidebar-muted)" }}
          aria-label="Show sidebar"
          title="Show menu"
        >
          <PanelLeftOpen className="size-5" aria-hidden />
        </button>
      </aside>
    );
  }

  return (
    <aside
      className={S.aside}
      style={{ backgroundColor: "var(--sidebar)", borderColor: "var(--border)" }}
      aria-label="Main navigation"
    >
      {/* Header */}
      <div
        className="flex h-14 items-center justify-between px-3 pr-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="min-w-0 flex-1">
          <Logo />
        </div>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
          style={{ color: "var(--sidebar-muted)" }}
          aria-label="Hide sidebar"
          title="Hide menu"
        >
          <PanelLeftClose className="size-5" aria-hidden />
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-scroll flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map(({ segment, label, icon: Icon }) => {
          const href = segment ? `/seo/p/${projectId}/${segment}` : `/seo/p/${projectId}`;
          const isActive = segment
            ? pathname === href || pathname.startsWith(href + "/")
            : pathname === href || pathname === href + "/";
          return (
            <Link
              key={segment}
              href={href}
              className={S.navLink}
              style={isActive
                ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
                : { color: "var(--sidebar-muted)" }
              }
              onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(108,41,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-foreground)"; } }}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-muted)"; } }}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Tools */}
      <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
        <p className={S.label} style={{ color: "var(--sidebar-muted)" }}>Tools</p>
        <Link
          href="/geo"
          className={S.navLink}
          style={pathname.startsWith("/geo")
            ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
            : { color: "var(--sidebar-muted)" }
          }
          onMouseEnter={e => { if (!pathname.startsWith("/geo")) { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(108,41,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-foreground)"; } }}
          onMouseLeave={e => { if (!pathname.startsWith("/geo")) { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = "var(--sidebar-muted)"; } }}
        >
          <Sparkles className="size-5 shrink-0" aria-hidden />
          GEO Intelligence
        </Link>
      </div>

      {/* Project switcher */}
      <div className="space-y-2 border-t p-3" style={{ borderColor: "var(--border)" }}>
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--sidebar-muted)" }}>
          Project
        </p>
        <div className="relative" ref={projectDropdownRef}>
          <button
            type="button"
            onClick={() => setProjectDropdownOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
            style={{ color: "var(--sidebar-foreground)" }}
            aria-expanded={projectDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Switch project"
            title={projectTitle}
          >
            <span className="min-w-0 flex-1 truncate">{projectLabel}</span>
            <ChevronsUpDown className="size-4 shrink-0" style={{ color: "var(--sidebar-muted)" }} aria-hidden />
          </button>
          {projectDropdownOpen && (
            <div
              className="absolute bottom-full left-0 right-0 z-50 mb-1 max-h-64 overflow-y-auto rounded-lg border py-1 shadow-lg"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              role="listbox"
            >
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={segment ? `/seo/p/${project.id}/${segment}` : `/seo/p/${project.id}`}
                  onClick={() => setProjectDropdownOpen(false)}
                  className="block px-3 py-2 text-sm transition-colors"
                  style={project.id === projectId
                    ? { backgroundColor: "var(--muted-bg)", fontWeight: 500, color: "var(--foreground)" }
                    : { color: "var(--muted)" }
                  }
                  role="option"
                  aria-selected={project.id === projectId}
                >
                  <span className="block truncate">{project.name}</span>
                  <span className="block truncate text-xs opacity-70">{project.domain}</span>
                </Link>
              ))}
              <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
              <Link
                href="/seo"
                onClick={() => setProjectDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                style={{ color: "var(--muted)" }}
                role="option"
              >
                <LayoutDashboard className="size-4 shrink-0" aria-hidden />
                All projects
              </Link>
              <Link
                href="/seo"
                onClick={() => setProjectDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--sidebar-foreground)" }}
                role="option"
              >
                <Plus className="size-4 shrink-0" aria-hidden />
                New project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* User */}
      {user && (
        <div className="space-y-1 border-t p-3" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/seo/config"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
            style={{ color: "var(--sidebar-muted)" }}
          >
            <SlidersHorizontal className="size-4 shrink-0" />
            Settings
          </Link>
          {user.role === "admin" && (
            <Link
              href="/seo/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
              style={{ color: "var(--sidebar-muted)" }}
            >
              <Settings className="size-4 shrink-0" />
              Admin
            </Link>
          )}
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
            style={{ color: "var(--sidebar-muted)" }}
          >
            <LogOut className="size-4 shrink-0" />
            Log out ({user.username})
          </button>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </aside>
  );
}
