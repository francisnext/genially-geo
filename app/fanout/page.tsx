"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { extractSemanticChunks } from "@/lib/chunking"
import SidebarMenu from "@/components/SidebarMenu"

interface Chunk {
  type: string
  heading?: string
  content: string
}

export default function QueryFanOutPage() {
  const [url, setUrl] = useState("")
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [aiResults, setAiResults] = useState<string[]>([])
  // Guarda aquí tu API Key de OpenAI (¡NO expongas esto en producción real!)

  // Extrae chunks semánticos del HTML recibido
  function extractSemanticChunks(html: string): Chunk[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const chunks: Chunk[] = []

    // Título y H1
    const title = doc.title || ""
    const h1 = doc.querySelector("h1")?.textContent || ""
    if (title || h1) {
      chunks.push({ type: "primary_topic", content: `${title} ${h1}`.trim() })
    }

    // H2 y H3 con su contenido
    const headings = doc.querySelectorAll("h2, h3, h4")
    headings.forEach(heading => {
      let content = heading.textContent || ""
      let sibling = heading.nextElementSibling
      let sectionContent = ""
      while (sibling && !["H1", "H2", "H3"].includes(sibling.tagName)) {
        if (sibling.textContent) {
          sectionContent += " " + sibling.textContent
        }
        sibling = sibling.nextElementSibling
      }
      if (sectionContent.trim()) {
        chunks.push({
          type: "section",
          heading: content,
          content: sectionContent.trim().substring(0, 500)
        })
      }
    })
    return chunks
  }

  // Fetch HTML de la URL (usando un proxy para evitar CORS)
  async function fetchHtml(url: string): Promise<string> {
    // Puedes cambiar este proxy por uno propio si lo necesitas
    const proxy = "https://corsproxy.io/?" + encodeURIComponent(url)
    const res = await fetch(proxy)
    if (!res.ok) throw new Error("No se pudo obtener la página (CORS o error de red)")
    const html = await res.text()
    return html
  }

  // Enviar chunks a OpenAI
  async function sendChunksToOpenAI(chunks: Chunk[]) {
    setAiResults([])
    const results: string[] = []
    for (const chunk of chunks) {
      const prompt = `Dado el siguiente contenido web, realiza un análisis tipo fan-out para SEO y LLMs. Devuelve la respuesta SOLO en el siguiente formato:\n\nFAN-OUT QUERIES:\n• [Pregunta 1] - Coverage: [Yes/Partial/No]\n• [Pregunta 2] - Coverage: [Yes/Partial/No]\n...\n\nCOVERAGE SCORE: [X/Y queries covered]\n\nRECOMMENDATIONS:\n• [Recomendación 1]\n• [Recomendación 2]\n...\n\nContenido a analizar:\n${chunk.heading ? `Título: ${chunk.heading}\n` : ""}${chunk.content}`
      const res = await fetch("/api/openai-fanout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      if (!res.ok) {
        results.push("Error de OpenAI para este chunk")
        continue
      }
      const data = await res.json()
      results.push(data.choices?.[0]?.message?.content || "Sin respuesta")
      setAiResults([...results])
    }
  }

  const handleAnalyze = async () => {
    setError("")
    setChunks([])
    setAiResults([])
    setLoading(true)
    try {
      const html = await fetchHtml(url)
      // Usar la función de lib/chunking.ts que acepta granularidad
      const extracted = extractSemanticChunks(html)
      setChunks(extracted)
      if (extracted.length > 0) {
        await sendChunksToOpenAI(extracted)
      }
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  // Función para renderizar el bloque FAN-OUT con badges visuales para Coverage
  function renderFanOut(aiText: string) {
    // Separar bloques principales
    const fanoutMatch = aiText.match(/FAN-OUT QUERIES:[\s\S]*?(?=(COVERAGE SCORE:|RECOMMENDATIONS:|$))/i)
    const coverageMatch = aiText.match(/COVERAGE SCORE:[\s\S]*?(?=(RECOMMENDATIONS:|$))/i)
    const recsMatch = aiText.match(/RECOMMENDATIONS:[\s\S]*/i)

    // Procesar FAN-OUT QUERIES
    let fanoutList: React.ReactNode[] = []
    if (fanoutMatch) {
      const lines = fanoutMatch[0].split("\n").slice(1).filter(l => l.trim().startsWith("• "))
      fanoutList = lines.map((line, i) => {
        // Buscar Coverage
        const coverage = line.match(/Coverage: (Yes|Partial|No)/i)
        let badge = null
        if (coverage) {
          const cov = coverage[1].toLowerCase()
          badge = (
            <Badge
              key={cov}
              className={
                cov === "yes"
                  ? "bg-green-600 text-white ml-2"
                  : cov === "partial"
                  ? "bg-yellow-500 text-white ml-2"
                  : "bg-red-600 text-white ml-2"
              }
            >
              {coverage[0]}
            </Badge>
          )
        }
        // Quitar el texto Coverage del enunciado
        const text = line.replace(/- Coverage: (Yes|Partial|No)/i, "").replace(/^• /, "")
        return (
          <li key={i} className="mb-1 flex items-center text-sm">
            <span>{text}</span>
            {badge}
          </li>
        )
      })
    }

    // Procesar COVERAGE SCORE
    let coverageScore = null
    if (coverageMatch) {
      const scoreLine = coverageMatch[0].split("\n")[0].replace("COVERAGE SCORE:", "").trim()
      coverageScore = (
        <div className="my-2 text-xs font-semibold text-blue-700">COVERAGE SCORE: {scoreLine}</div>
      )
    }

    // Procesar RECOMMENDATIONS
    let recsList: React.ReactNode[] = []
    if (recsMatch) {
      const lines = recsMatch[0].split("\n").slice(1).filter(l => l.trim().startsWith("• "))
      recsList = lines.map((line, i) => (
        <li key={i} className="mb-1 text-xs">{line.replace(/^• /, "")}</li>
      ))
    }

    return (
      <div>
        {fanoutList.length > 0 && (
          <div className="mb-2">
            <div className="font-semibold text-xs mb-1">FAN-OUT QUERIES:</div>
            <ul className="ml-4 list-disc">{fanoutList}</ul>
          </div>
        )}
        {coverageScore}
        {recsList.length > 0 && (
          <div className="mt-2">
            <div className="font-semibold text-xs mb-1">RECOMMENDATIONS:</div>
            <ul className="ml-4 list-disc">{recsList}</ul>
          </div>
        )}
      </div>
    )
  }

  const GRANULARIDADES = [
    { value: "baja", label: "Baja (bloques grandes)" },
    { value: "media", label: "Media (por sección)" },
    { value: "alta", label: "Alta (por párrafo)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      {/* Menú lateral */}
      <SidebarMenu />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Query Fan-Out de URL</CardTitle>
            <CardDescription>
              Ingresa una URL para extraer los chunks semánticos y analizarlos con OpenAI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="https://ejemplo.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleAnalyze} disabled={!url || loading} className="w-full">
              {loading ? "Analizando..." : "Extraer y analizar"}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {chunks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Chunks extraídos:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {chunks.map((chunk, idx) => (
                    <li key={idx}>
                      <strong>{chunk.type}{chunk.heading ? `: ${chunk.heading}` : ""}</strong>
                      <div className="text-xs text-muted-foreground whitespace-pre-line">{chunk.content}</div>
                      {loading && (
                        <div className="flex items-center gap-2 mt-2 mb-8">
                          <Loader2 className="animate-spin w-4 h-4 text-primary" />
                          <span className="text-xs text-primary">Procesando con IA...</span>
                        </div>
                      )}
                      {aiResults[idx] && !loading && (
                        <div className="mt-2 mb-8 p-2 bg-accent rounded">
                          <span className="font-semibold block mb-1">AI:</span>
                          {renderFanOut(aiResults[idx])}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="w-full max-w-2xl mt-8 text-xs text-muted-foreground bg-card rounded p-4">
          <h4 className="font-semibold mb-2 text-sm text-foreground">¿Qué hace esta herramienta?</h4>
          <p className="mb-2">
            Esta funcionalidad permite analizar cualquier página web introduciendo su URL. El sistema descarga el HTML de la página, extrae automáticamente los <b>chunks semánticos</b> (título, encabezados y sus secciones) y los envía a la IA de OpenAI para generar un análisis tipo <b>fan-out</b> orientado a SEO y cobertura para LLMs.
          </p>
          <ul className="list-disc ml-4 mb-2">
            <li>Se extraen el <b>título</b> y el <b>H1</b> como tema principal.</li>
            <li>Se detectan todos los encabezados <b>H2, H3 y H4</b> y se agrupa el contenido que les sigue hasta el próximo encabezado.</li>
            <li>Cada sección se envía a la IA, que devuelve preguntas clave (fan-out queries), cobertura y recomendaciones.</li>
          </ul>
          <p className="mb-2">
            <b>Limitaciones:</b> Si la página usa otros niveles de encabezado (H5, H6) o estructuras muy anidadas, parte del contenido puede no ser detectado. El análisis depende de la calidad del HTML y de la respuesta de la IA.
          </p>
          <p>
            <b>¿Para qué sirve?</b> Es útil para auditar la cobertura temática de una página, detectar oportunidades de mejora SEO y ver cómo una IA "desglosaría" el contenido para responder a queries complejas.
          </p>
        </div>
      </main>
    </div>
  )
} 