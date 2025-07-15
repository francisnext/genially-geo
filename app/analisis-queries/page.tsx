"use client"

import React, { useState, useMemo } from "react"
import SidebarMenu from "@/components/SidebarMenu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SAMPLE_DATASET, QueryData } from "@/data/sample-dataset"

// Reutilizar lógica de análisis de la página principal
function getBrandDetails(data: QueryData[]) {
  const details: Record<string, any[]> = {}
  data.forEach((item) => {
    item.tools?.forEach((tool) => {
      const brand = tool.name || tool.nombre || ""
      if (!brand) return
      if (!details[brand]) details[brand] = []
      details[brand].push({
        query: item.query,
        highlights: tool.highlights || [],
        pros: tool.pros || [],
        cons: tool.cons || tool.contras || [],
        sentimiento: tool.sentiment || tool.sentimiento || 0,
      })
    })
  })
  return details
}

export default function AnalisisQueriesPage() {
  const [selectedDetailBrand, setSelectedDetailBrand] = useState<string>("all")
  const data = SAMPLE_DATASET

  // Calcular resultados como en la página principal
  const results = useMemo(() => {
    const totalQueries = data.length
    const uniqueQueries = new Set(data.map((item) => item.query.toLowerCase())).size
    const queryCounts: { [key: string]: { count: number; withBrands: number; withGenially: number } } = {}
    data.forEach((item) => {
      const query = item.query.toLowerCase()
      if (!queryCounts[query]) {
        queryCounts[query] = { count: 0, withBrands: 0, withGenially: 0 }
      }
      queryCounts[query].count++
      if (item.tools && item.tools.length > 0) queryCounts[query].withBrands++
      if (item.tools?.some(tool => (tool.name || tool.nombre || "").toLowerCase().includes("genially"))) queryCounts[query].withGenially++
    })
    const queryFrequencies = Object.entries(queryCounts)
      .map(([query, data]) => ({
        query,
        count: data.count,
        withBrands: data.withBrands,
        withGenially: data.withGenially,
        percentage: (data.count / totalQueries) * 100
      }))
      .sort((a, b) => b.count - a.count)
    return {
      totalQueries,
      uniqueQueries,
      queryFrequencies,
      rawData: data,
    }
  }, [data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      <SidebarMenu />
      <main className="flex-1 p-4 bg-[#F9F8FC]">
        <div className="max-w-8xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Análisis de Queries</h1>
            <p className="text-muted-foreground">Frecuencia, fuentes y detalle de queries y marcas</p>
          </div>

          {/* Análisis de Queries */}
          <Card className="md:col-span-2 mt-6">
            <CardHeader>
              <CardTitle>Análisis de Queries</CardTitle>
              <CardDescription>Frecuencia de cada query y su relación con marcas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedDetailBrand} onValueChange={setSelectedDetailBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Marcas</SelectLabel>
                      <SelectItem value="all">Todas las marcas</SelectItem>
                      {Object.keys(getBrandDetails(results.rawData))
                        .sort()
                        .map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto overflow-y-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-card">
                    <tr>
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">Query</th>
                      <th className="text-right p-2">Total</th>
                      <th className="text-right p-2">Con Marcas</th>
                      <th className="text-right p-2">Con Genially</th>
                      <th className="text-left p-2">Marcas Mencionadas</th>
                      <th className="text-center p-2">Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.queryFrequencies
                      .filter(queryData => {
                        if (selectedDetailBrand === "all") return true;
                        const queryDetails = results.rawData.find(q => q.query === queryData.query);
                        return queryDetails?.tools?.some(tool => (tool.name || tool.nombre || "").toLowerCase() === selectedDetailBrand.toLowerCase());
                      })
                      .map((queryData, index) => {
                        const queryDetails = results.rawData.find(q => q.query === queryData.query);
                        const mentionedBrands = queryDetails?.tools?.map(tool => tool.name || tool.nombre || "").filter(Boolean) || [];
                        const sources: string[] = (queryDetails?.tools || [])
                          .flatMap(tool => tool.sources || [])
                          .filter((v, i, arr) => arr.indexOf(v) === i && /^https?:\/\//.test(v));
                        return (
                          <tr key={queryData.query} className="border-b border-border hover:bg-card">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 font-medium max-w-md">
                              <div className="truncate" title={queryData.query}>{queryData.query}</div>
                            </td>
                            <td className="p-2 text-right">{queryData.count}</td>
                            <td className="p-2 text-right">
                              {queryData.withBrands > 0 ? (
                                <Badge variant="secondary">{queryData.withBrands}</Badge>
                              ) : (
                                <span className="text-gray-400">0</span>
                              )}
                            </td>
                            <td className="p-2 text-right">
                              {queryData.withGenially > 0 ? (
                                <Badge className="bg-blue-100 text-blue-800">{queryData.withGenially}</Badge>
                              ) : (
                                <span className="text-gray-400">0</span>
                              )}
                            </td>
                            <td className="p-2">
                              <div className="flex flex-wrap gap-1">
                                {mentionedBrands.map((brand, idx) => (
                                  <Badge key={idx} variant={brand.toLowerCase().includes("genially") ? "default" : "secondary"}>{brand}</Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              {sources.length > 0 ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <button className="px-2 py-1 rounded bg-accent text-primary font-semibold text-xs hover:bg-primary/10 focus:outline-none">{sources.length}</button>
                                  </PopoverTrigger>
                                  <PopoverContent align="center" className="w-64 p-2">
                                    <ul className="space-y-1">
                                      {sources.map((src, i) => {
                                        let domain = "";
                                        try { domain = new URL(src).hostname.replace(/^www\./, ""); } catch {}
                                        return (
                                          <li key={i}>
                                            <a href={src} target="_blank" rel="noopener noreferrer" className="underline text-xs text-blue-700 hover:text-blue-900 break-all">{domain || src}</a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <span className="text-gray-400 text-xs">0</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de sources globales */}
          <Card className="md:col-span-2 mt-6">
            <CardHeader>
              <CardTitle>Sources globales</CardTitle>
              <CardDescription>Listado de todos los dominios, sus URLs y cuántas veces aparecen en las queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-card">
                    <tr>
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">Dominio</th>
                      <th className="text-left p-2">URLs</th>
                      <th className="text-right p-2">Veces en queries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const allSources: string[] = results.rawData
                        .flatMap(q => (q.tools || []).flatMap(tool => tool.sources || []))
                        .filter(src => /^https?:\/\//.test(src));
                      // Agrupar por dominio
                      const domainMap: Record<string, { urls: string[], count: number }> = {};
                      allSources.forEach(src => {
                        let domain = "";
                        try { domain = new URL(src).hostname.replace(/^www\./, ""); } catch {}
                        if (!domainMap[domain]) domainMap[domain] = { urls: [], count: 0 };
                        if (!domainMap[domain].urls.includes(src)) domainMap[domain].urls.push(src);
                        domainMap[domain].count++;
                      });
                      const sortedDomains = Object.entries(domainMap).sort((a, b) => b[1].count - a[1].count);
                      return sortedDomains.map(([domain, { urls, count }], idx) => (
                        <tr key={domain} className="border-b border-border hover:bg-card">
                          <td className="p-2">{idx + 1}</td>
                          <td className="p-2 font-semibold">{domain}</td>
                          <td className="p-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="px-2 py-1 rounded bg-accent text-primary font-semibold text-xs hover:bg-primary/10 focus:outline-none">
                                  {urls.length} URL{urls.length > 1 ? 's' : ''}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent align="center" className="w-96 p-2 bg-card max-h-64 overflow-y-auto">
                                <ul className="space-y-1">
                                  {urls.map((url, i) => (
                                    <li key={i}>
                                      <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-xs text-blue-700 hover:text-blue-900 break-all">{url}</a>
                                    </li>
                                  ))}
                                </ul>
                              </PopoverContent>
                            </Popover>
                          </td>
                          <td className="p-2 text-right font-semibold">{count}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Análisis Detallado por Marca */}
          <Card className="md:col-span-2 mt-6">
            <CardHeader>
              <CardTitle>Análisis Detallado por Marca</CardTitle>
              <CardDescription>Detalles completos de cada marca por query</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedDetailBrand} onValueChange={setSelectedDetailBrand}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una marca para filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Marcas</SelectLabel>
                      <SelectItem value="all">Todas las marcas</SelectItem>
                      {Object.keys(getBrandDetails(results.rawData))
                        .sort()
                        .map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-y-auto max-h-[600px]">
                {Object.keys(getBrandDetails(results.rawData)).length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No hay datos para esta query</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left p-2">Marca</th>
                        <th className="text-left p-2">Query</th>
                        <th className="text-left p-2">Highlights</th>
                        <th className="text-left p-2">Pros</th>
                        <th className="text-left p-2">Contras</th>
                        <th className="text-right p-2">Sentimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(getBrandDetails(results.rawData))
                        .filter(([brand]) => selectedDetailBrand === "all" || brand === selectedDetailBrand)
                        .map(([brand, details]) =>
                          details.map((detail, detailIndex) => (
                            <tr key={`${brand}-${detailIndex}`} className="border-b border-border hover:bg-card">
                              <td className="p-2 font-medium">
                                {brand}
                                {brand.toLowerCase().includes("genially") && (
                                  <Badge className="ml-2" variant="default">⭐</Badge>
                                )}
                              </td>
                              <td className="p-2 max-w-[200px]">
                                <div className="truncate" title={detail.query}>{detail.query}</div>
                              </td>
                              <td className="p-2 max-w-[300px]">
                                <ul className="list-disc list-inside">
                                  {detail.highlights.map((highlight: string, idx: number) => (
                                    <li key={idx} className="whitespace-normal break-words" title={highlight}>{highlight}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="p-2 max-w-[300px]">
                                <ul className="list-disc list-inside">
                                  {detail.pros.map((pro: string, idx: number) => (
                                    <li key={idx} className="whitespace-normal break-words" title={pro}>{pro}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="p-2 max-w-[300px]">
                                <ul className="list-disc list-inside">
                                  {detail.cons.map((con: string, idx: number) => (
                                    <li key={idx} className="whitespace-normal break-words" title={con}>{con}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="p-2 text-right">
                                <Badge variant={detail.sentimiento >= 0.8 ? "default" : detail.sentimiento >= 0.6 ? "secondary" : "destructive"}>{detail.sentimiento.toFixed(2)}</Badge>
                              </td>
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
           {/* Estadísticas de Queries - full width */}
           {results && (
                <Card className="md:col-span-2 mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Estadísticas & QA de Queries</CardTitle>
                    <CardDescription>Información sobre las consultas realizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{results.totalQueries}</div>
                        <div className="text-sm text-muted-foreground">Total registros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{results.uniqueQueries}</div>
                        <div className="text-sm text-muted-foreground">Queries únicas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          {(results.totalQueries / results.uniqueQueries).toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Promedio por query</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive">
                          {Math.max(...results.queryFrequencies.map((q) => q.count))}
                        </div>
                        <div className="text-sm text-muted-foreground">Máximo repeticiones</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            
        </div>
      </main>
    </div>
  )
} 