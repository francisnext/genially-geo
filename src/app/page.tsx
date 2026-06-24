import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Genially SEO Platform
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Elige la herramienta con la que quieres trabajar
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 w-full max-w-2xl">
        <Link
          href="/seo"
          className="group flex flex-col gap-4 rounded-2xl border p-8 transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-900">
            <Search className="size-6 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              SEO Tool
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Keyword research, backlinks, site audit y visibilidad por dominio.
            </p>
          </div>
          <span className="mt-auto text-sm font-medium text-blue-600 group-hover:underline">
            Abrir SEO Tool →
          </span>
        </Link>

        <Link
          href="/geo"
          className="group flex flex-col gap-4 rounded-2xl border p-8 transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-900">
            <Sparkles className="size-6 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              GEO Intelligence
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Visibilidad en motores de búsqueda generativos: ChatGPT, Gemini y SearchGPT.
            </p>
          </div>
          <span className="mt-auto text-sm font-medium text-blue-600 group-hover:underline">
            Abrir GEO →
          </span>
        </Link>
      </div>
    </div>
  );
}
