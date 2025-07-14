"use client"

import React, { useState, useRef, useEffect } from "react"
import SidebarMenu from "@/components/SidebarMenu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const INTENCIONES = [
  { value: "informativa", label: "Informativa" },
  { value: "transaccional", label: "Transaccional" },
  { value: "navegacional", label: "Navegacional" },
  { value: "local", label: "Local" },
  { value: "comercial", label: "Comercial" },
]

export default function OptimizadorPage() {
  const [html, setHtml] = useState("")
  const [htmlPreview, setHtmlPreview] = useState("")
  const contentEditableRef = useRef<HTMLDivElement>(null)
  const [headings, setHeadings] = useState<{ tag: string, text: string }[]>([])
  const [headingsValidation, setHeadingsValidation] = useState<string>("")
  const [queries, setQueries] = useState("")
  const [intencion, setIntencion] = useState("informativa")
  const [sitemap, setSitemap] = useState("https://genially.com/sitemap-0.xml")
  const [competencia, setCompetencia] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resultados, setResultados] = useState<any>(null)
  const resultadosRef = useRef<HTMLDivElement>(null)

  // Función para extraer la jerarquía de títulos del HTML pegado
  function getHeadingsHierarchy(html: string) {
    if (!html) return [];
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const headings = Array.from(doc.body.querySelectorAll('h1, h2, h3, h4, h5'));
    return headings.map(h => ({
      tag: h.tagName.toLowerCase(),
      text: h.textContent?.trim() || ''
    }));
  }

  // Función para validar la jerarquía de títulos
  function validateHeadings(headings: { tag: string, text: string }[]) {
    if (!headings.length) return 'No se detectaron encabezados.';
    let lastLevel = 0;
    let h1Count = 0;
    for (let i = 0; i < headings.length; i++) {
      const level = parseInt(headings[i].tag.replace('h', ''));
      if (level === 1) h1Count++;
      if (lastLevel && (level > lastLevel + 1)) {
        return `Salto de nivel incorrecto entre ${headings[i-1].tag} y ${headings[i].tag}`;
      }
      lastLevel = level;
    }
    if (h1Count !== 1) return `Debe haber un solo <h1> (encontrados: ${h1Count})`;
    return 'Jerarquía correcta';
  }

  // Función para limpiar el HTML: elimina scripts, estilos y comentarios
  function cleanHtml(html: string) {
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<!--([\s\S]*?)-->/g, '');
  }

  // Extraer solo el texto plano del HTML limpio
  function extractPlainText(html: string) {
    const clean = cleanHtml(html);
    // Quitar todas las etiquetas HTML
    return clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Calcular longitud manualmente (número de palabras del texto plano)
  function getWordCount(text: string) {
    return text.split(/\s+/).filter(Boolean).length;
  }

  // Parsear sitemap y filtrar URLs irrelevantes
  function parseSitemapUrls(sitemap: string) {
    if (!sitemap) return [];
    // Extraer URLs de XML o texto plano
    let urls: string[] = [];
    // Si es XML
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = urlRegex.exec(sitemap)) !== null) {
      urls.push(match[1]);
    }
    // Si no se encontró nada, intentar por líneas
    if (urls.length === 0) {
      urls = sitemap.split(/\r?\n|,/).map(u => u.trim()).filter(u => u.startsWith('http'));
    }
    // Filtrar URLs irrelevantes
    const exclude = ["/template", "/plantill", "/model", "/vorlage", "/model"];
    return urls.filter(u => !exclude.some(ex => u.includes(ex)));
  }

  // Placeholder para el submit
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultados(null);
    try {
      const plainText = extractPlainText(html);
      const sitemapUrls = parseSitemapUrls(sitemap);
      const res = await fetch("/api/optimizador-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: plainText,
          queries: queries.split(/[\n,]+/).map(q => q.trim()).filter(Boolean),
          sitemap: sitemapUrls.join("\n"),
          competencia: competencia.split(/[\n,]+/).map(u => u.trim()).filter(Boolean)
        })
      });
      if (!res.ok) throw new Error("Error en el análisis");
      const data = await res.json();
      setResultados({ ...data, sitemapUrls });
      setTimeout(() => {
        if (resultadosRef.current) {
          resultadosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  // Actualizar headings y validación en tiempo real
  useEffect(() => {
    const hs = getHeadingsHierarchy(html)
    setHeadings(hs)
    setHeadingsValidation(validateHeadings(hs))
  }, [html])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      <SidebarMenu />
      <main className="flex-1 p-4 flex flex-col md:flex-row items-start gap-8">
        {/* Contenido principal */}
        <div className="w-full max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Optimizador de Contenidos SEO</CardTitle>
              <CardDescription>
                Analiza y optimiza tu contenido HTML para SEO y LLMs. Recibe recomendaciones, chunking semántico, análisis de intención, cobertura, canibalización y benchmarking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div>
                  <label className="font-semibold text-sm">Pega aquí el contenido (puedes copiar desde Google Docs, Word, etc.)</label>
                  <div
                    ref={contentEditableRef}
                    contentEditable
                    className="mt-1 border rounded p-2 min-h-[120px] bg-background focus:outline-none focus:ring-2 focus:ring-primary relative"
                    onInput={e => {
                      const html = (e.target as HTMLDivElement).innerHTML;
                      setHtml(html);
                      setHtmlPreview((e.target as HTMLDivElement).innerText);
                    }}
                    onPaste={e => {
                      // Limpiar el placeholder justo después de pegar
                      setTimeout(() => {
                        const el = contentEditableRef.current;
                        if (!el) return;
                        if (el.innerText.includes('Pega aquí tu contenido...')) {
                          el.innerHTML = el.innerHTML.replace('Pega aquí tu contenido...', '');
                        }
                        setHtml(el.innerHTML);
                        setHtmlPreview(el.innerText);
                      }, 1);
                    }}
                    suppressContentEditableWarning
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {(!html || html === '<br>') && (
                      <span className="text-muted-foreground select-none pointer-events-none absolute left-2 top-2">Pega aquí tu contenido...</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Puedes pegar texto enriquecido y se conservarán los encabezados y formato. Usa los botones para aplicar títulos y formato.</div>
                </div>
                <div>
                  <label className="font-semibold text-sm">Queries objetivo (una por línea o separadas por coma)</label>
                  <Textarea
                    value={queries}
                    onChange={e => setQueries(e.target.value)}
                    rows={2}
                    placeholder="ej: curso scorm, herramienta elearning, crear contenido interactivo"
                    className="mt-1"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-semibold text-sm">Intención de búsqueda</label>
                    <select
                      className="w-full mt-1 border rounded px-2 py-1"
                      value={intencion}
                      onChange={e => setIntencion(e.target.value)}
                    >
                      {INTENCIONES.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm">Sitemap (opcional, para detectar canibalización)</label>
                  <Textarea
                    value={sitemap}
                    onChange={e => setSitemap(e.target.value)}
                    rows={2}
                    placeholder="Pega aquí el XML del sitemap o URLs separadas por línea"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm">
                    URLs de competencia (separadas por coma o salto de línea)
                  </label>
                  <Textarea
                    value={competencia}
                    onChange={e => setCompetencia(e.target.value)}
                    rows={2}
                    placeholder="https://competidor1.com/, https://competidor2.com/"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Analizando..." : "Analizar contenido"}
                </Button>
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </form>
            </CardContent>
          </Card>

          {/* Panel de resultados (placeholder) */}
          {resultados && (
            <div ref={resultadosRef} className="space-y-6 mt-8">
              {/* Idioma detectado */}
              {resultados.idioma && (
                <Card>
                  <CardHeader><CardTitle>Idioma detectado</CardTitle></CardHeader>
                  <CardContent>{resultados.idioma}</CardContent>
                </Card>
              )}
              {/* Keywords sugeridas por query */}
              {resultados.keywords_por_query && (
                <Card>
                  <CardHeader><CardTitle>Palabras clave sugeridas</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6">
                      {Object.entries(resultados.keywords_por_query).map(([query, kws]: any) => (
                        <li key={query}><b>{query}:</b> {Array.isArray(kws) ? kws.slice(0, 10).join(", ") : kws}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {/* Cobertura */}
              {resultados.cobertura && (
                <Card>
                  <CardHeader><CardTitle>Cobertura de temas</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-xs">Cubiertos: {resultados.cobertura.temas_cubiertos?.join(", ")}</div>
                    <div className="text-xs text-red-700">Faltantes: {resultados.cobertura.faltantes?.join(", ")}</div>
                    <div className="text-xs">{resultados.cobertura.comentario}</div>
                  </CardContent>
                </Card>
              )}
              {/* Canibalización */}
              {resultados.canibalizacion && resultados.canibalizacion.length > 0 && (
                <Card>
                  <CardHeader><CardTitle>Canibalización de keywords</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6">
                      {resultados.canibalizacion.map((item: any, i: number) => (
                        <li key={i}><b>{item.url}:</b> {item.keywords_competidas?.join(", ")}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {/* Sugerencias on-page */}
              {resultados.onpage && (
                <Card>
                  <CardHeader><CardTitle>Optimización on-page</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6">
                      <li><b>Título:</b> {resultados.onpage.titulo?.valor} <span className="text-xs text-muted-foreground">({resultados.onpage.titulo?.sugerencia})</span></li>
                      <li><b>Meta description:</b> {resultados.onpage.meta_description?.valor} <span className="text-xs text-muted-foreground">({resultados.onpage.meta_description?.sugerencia})</span></li>
                      {/* Headings solo si hay sugerencia concreta */}
                      {resultados.onpage.headings && resultados.onpage.headings.sugerencia && !/añade|add/i.test(resultados.onpage.headings.sugerencia) && (
                        <li><b>Headings:</b> {resultados.onpage.headings?.estructura?.join(" > ")} <span className="text-xs text-muted-foreground">({resultados.onpage.headings?.sugerencia})</span></li>
                      )}
                      {/* Imágenes solo si hay sugerencia concreta y alt_faltantes > 0 */}
                      {resultados.onpage.imagenes && resultados.onpage.imagenes.alt_faltantes > 0 && resultados.onpage.imagenes.sugerencia && !/añade|add/i.test(resultados.onpage.imagenes.sugerencia) && (
                        <li><b>Imágenes alt faltantes:</b> {resultados.onpage.imagenes?.alt_faltantes} <span className="text-xs text-muted-foreground">({resultados.onpage.imagenes?.sugerencia})</span></li>
                      )}
                      {/* Enlaces solo si hay sugerencia concreta y alguno > 0 */}
                      {resultados.onpage.enlaces && (resultados.onpage.enlaces.internos > 0 || resultados.onpage.enlaces.externos > 0) && resultados.onpage.enlaces.sugerencia && !/añade|add/i.test(resultados.onpage.enlaces.sugerencia) && (
                        <li><b>Enlaces internos:</b> {resultados.onpage.enlaces?.internos}, <b>externos:</b> {resultados.onpage.enlaces?.externos} <span className="text-xs text-muted-foreground">({resultados.onpage.enlaces?.sugerencia})</span></li>
                      )}
                      <li><b>Densidad de keywords:</b> {resultados.onpage.densidad_keywords?.valor}% <span className="text-xs text-muted-foreground">({resultados.onpage.densidad_keywords?.sugerencia})</span></li>
                      <li><b>Longitud:</b> {getWordCount(extractPlainText(html))} palabras <span className="text-xs text-muted-foreground">(calculado manualmente)</span></li>
                    </ul>
                  </CardContent>
                </Card>
              )}
              {/* Comparativa competencia */}
              {resultados.comparativa_competencia && resultados.comparativa_competencia.length > 0 && (
                <Card>
                  <CardHeader><CardTitle>Comparativa con competencia</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6">
                      {resultados.comparativa_competencia.map((item: any, i: number) => (
                        <li key={i}><b>{item.url}:</b> {item.cobertura} | {item.keywords?.join(", ")} <span className="text-xs text-muted-foreground">{item.comentario}</span></li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {/* Mostrar URLs del sitemap usadas */}
              {resultados.sitemapUrls && resultados.sitemapUrls.length > 0 && (
                <Card>
                  <CardHeader><CardTitle>URLs del sitemap usadas para el análisis</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 text-xs">
                      {resultados.sitemapUrls.map((url: string, i: number) => (
                        <li key={i}>{url}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
        {/* Barra lateral sticky */}
        <aside className="hidden md:block md:w-80 flex-shrink-0 sticky top-4 h-fit text-sm ml-2">
          <div className="bg-muted/40 rounded p-4 border">
            <div className="font-semibold mb-2 ">Jerarquía de títulos detectada</div>
            {headings.length === 0 ? (
              <div className="text-muted-foreground">No se detectaron encabezados.</div>
            ) : (
              <ol className="pl-2 max-h-48 overflow-y-auto pr-2">
                {headings.map((h, i) => {
                  const level = parseInt(h.tag.replace('h', ''));
                  return (
                    <li
                      key={i}
                      style={{ marginLeft: `${(level - 1) * 18}px` }}
                      className="mb-1"
                    >
                      <span className="font-mono bg-background px-1 rounded mr-1">{h.tag}</span> {h.text}
                    </li>
                  );
                })}
              </ol>
            )}
            <div className={`mt-2 text-xs ${headingsValidation === 'Jerarquía correcta' ? 'text-green-700' : 'text-red-700'}`}>{headingsValidation}</div>
          </div>
          <div className="mt-6 bg-muted/40 rounded p-4 border ">
            <div className="font-semibold mb-2">¿Cómo funciona?</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Pega el HTML o texto enriquecido de tu contenido.</li>
              <li>Introduce las queries objetivo y la intención de búsqueda.</li>
              <li>Opcional: añade URLs de competencia o sitemap.</li>
              <li>Haz clic en analizar para obtener recomendaciones.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
} 