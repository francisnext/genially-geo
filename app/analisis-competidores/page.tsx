"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import SidebarMenu from "@/components/SidebarMenu"
import Topbar from "@/components/Topbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend, ScatterChart, Scatter, ZAxis } from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSampleDataset, SampleDatasetItem, getUniqueKeywords } from "@/data/sample-dataset"
import { normalizeBrandName, isDirectCompetitor, DIRECT_COMPETITORS } from "@/lib/competitors"
import { Search, Trophy, TrendingDown, Target, AlertCircle, Calendar, Filter, ThumbsUp, ThumbsDown } from "lucide-react"

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border shadow-md rounded-lg">
        <p className="font-bold text-sm mb-1">{data.name}</p>
        <p className="text-xs text-slate-500">SoV: {data?.sov?.toFixed(1)}%</p>
        <p className="text-xs text-slate-500">Sentimiento: {data?.avgSentiment?.toFixed(0)}/100</p>
        <p className="text-xs text-slate-500">Menciones: {data?.totalMentions}</p>
      </div>
    );
  }
  return null;
};

export default function AnalisisCompetidoresPage() {
  // ---------- State ----------
  const [dataset, setDataset] = useState<SampleDatasetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UI state
  const [selectedIa, setSelectedIa] = useState<string>("Todas")
  const [selectedCluster, setSelectedCluster] = useState<string>("Todos")

  // Load data from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSampleDataset()
        setDataset(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error loading data")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ---------- Derived Data ----------
  const iaOptions = useMemo(() => {
    const set = new Set<string>()
    dataset.forEach(d => d.ia && set.add(d.ia))
    return ["Todas", ...Array.from(set)]
  }, [dataset])

  const clusterOptions = useMemo(() => {
    return ["Todos", ...getUniqueKeywords(dataset)]
  }, [dataset])

  // Process data for all brands
  const brandStats = useMemo(() => {
    let filtered = selectedIa === "Todas" ? dataset : dataset.filter(d => d.ia === selectedIa)
    if (selectedCluster !== "Todos") {
      filtered = filtered.filter(d => (d.keyword || d.cluster || "").toLowerCase() === selectedCluster.toLowerCase())
    }

    const totalPrompts = new Set(filtered.map(d => d.prompt)).size
    const statsMap = new Map<string, {
      name: string,
      mentions: number,
      positions: number[],
      prompts: Set<string>,
      sentimentSum: number,
      sentimentCount: number,
      pros: Set<string>,
      cons: Set<string>
    }>()

    filtered.forEach(d => {
      try {
        if (!d.json_content) return
        const tools = JSON.parse(d.json_content)
        if (!Array.isArray(tools)) return

        tools.forEach((t: any) => {
          const rawName = t.name || t.nombre
          if (!rawName) return
          const name = normalizeBrandName(rawName)

          if (!statsMap.has(name)) {
            statsMap.set(name, { name, mentions: 0, positions: [], prompts: new Set(), sentimentSum: 0, sentimentCount: 0, pros: new Set(), cons: new Set() })
          }

          const s = statsMap.get(name)!
          s.mentions++
          s.prompts.add(d.prompt || "")
          if (t.position) s.positions.push(Number(t.position))
          if (t.sentiment !== undefined) {
            s.sentimentSum += Number(t.sentiment);
            s.sentimentCount++;
          }
          // Collect pros and cons if available (new feature)
          if (Array.isArray(t.pros)) t.pros.forEach((p: string) => s.pros.add(p));
          if (Array.isArray(t.cons)) t.cons.forEach((c: string) => s.cons.add(c));
        })
      } catch { }
    })

    const result = Array.from(statsMap.values()).map(s => ({
      name: s.name,
      sov: totalPrompts > 0 ? (s.prompts.size / totalPrompts) * 100 : 0,
      avgPos: s.positions.length > 0 ? s.positions.reduce((a, b) => a + b, 0) / s.positions.length : null,
      totalMentions: s.mentions,
      isDirect: isDirectCompetitor(s.name),
      avgSentiment: s.sentimentCount > 0 ? (s.sentimentSum / s.sentimentCount) * 100 : 50, // Normalize 0-1 to 0-100, default 50
      pros: Array.from(s.pros).slice(0, 5),
      cons: Array.from(s.cons).slice(0, 5)
    }))

    return result.sort((a, b) => b.sov - a.sov)
  }, [dataset, selectedIa, selectedCluster])

  // Historical Evolution Data
  const evolutionData = useMemo(() => {
    let filtered = selectedIa === "Todas" ? dataset : dataset.filter(d => d.ia === selectedIa)
    if (selectedCluster !== "Todos") {
      filtered = filtered.filter(d => (d.keyword || d.cluster || "").toLowerCase() === selectedCluster.toLowerCase())
    }

    // Group by Date
    const dateMap = new Map<string, { date: string, Genially: number, Competidores: number }>()

    filtered.forEach(d => {
      if (!d.date) return
      const dateKey = d.date.split('T')[0]
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { date: dateKey, Genially: 0, Competidores: 0 })
      }

      const entry = dateMap.get(dateKey)!
      try {
        const tools = JSON.parse(d.json_content || "[]")
        const normalizedTools = tools.map((t: any) => normalizeBrandName(t.name || t.nombre))

        if (normalizedTools.includes("Genially")) {
          entry.Genially++
        }

        const hasDirectCompetitor = normalizedTools.some((b: string) => DIRECT_COMPETITORS.includes(b))
        if (hasDirectCompetitor) {
          entry.Competidores++
        }
      } catch { }
    })

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  }, [dataset, selectedIa, selectedCluster])

  // Identification of Gaps
  const gapAnalysis = useMemo(() => {
    let filtered = selectedIa === "Todas" ? dataset : dataset.filter(d => d.ia === selectedIa)
    if (selectedCluster !== "Todos") {
      filtered = filtered.filter(d => (d.keyword || d.cluster || "").toLowerCase() === selectedCluster.toLowerCase())
    }

    const groupByPrompt: Record<string, string[]> = {}

    filtered.forEach(d => {
      if (!d.prompt) return
      try {
        const tools = JSON.parse(d.json_content || "[]")
        groupByPrompt[d.prompt] = tools.map((t: any) => normalizeBrandName(t.name || t.nombre))
      } catch { }
    })

    const gaps: { prompt: string, competitors: string[] }[] = []
    Object.entries(groupByPrompt).forEach(([prompt, brands]) => {
      if (!brands.includes("Genially")) {
        const competitorsInPrompt = brands.filter(b => DIRECT_COMPETITORS.includes(b))
        if (competitorsInPrompt.length > 0) {
          gaps.push({ prompt, competitors: Array.from(new Set(competitorsInPrompt)) })
        }
      }
    })

    return gaps.slice(0, 8)
  }, [dataset, selectedIa, selectedCluster])

  const geniallyStats = useMemo(() => brandStats.find(b => b.name === "Genially"), [brandStats])
  const topCompetitor = useMemo(() => brandStats.filter(b => b.name !== "Genially" && b.isDirect)[0], [brandStats])

  const [showOnlyDirect, setShowOnlyDirect] = useState(true)
  const displayBrands = useMemo(() => {
    let filtered = showOnlyDirect ? brandStats.filter(b => b.isDirect) : brandStats
    return filtered.slice(0, 15)
  }, [brandStats, showOnlyDirect])

  if (loading) return <div className="p-8 text-center text-muted-foreground">Cargando análisis estratégico...</div>

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex text-slate-800">
        <SidebarMenu />
        <main className="flex-1 p-6 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Target className="text-primary w-6 h-6" />
                  Estrategia de Competidores
                </h1>
                <p className="text-slate-500 text-sm">Posicionamiento histórico y comparativo frente al mercado.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <select
                    className="text-sm border-none focus:ring-0 bg-transparent"
                    value={selectedIa}
                    onChange={e => setSelectedIa(e.target.value)}
                  >
                    {iaOptions.map(ia => <option key={ia} value={ia}>{ia === "Todas" ? "Todas las IAs" : ia}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    className="text-sm border-none focus:ring-0 bg-transparent pr-8"
                    value={selectedCluster}
                    onChange={e => setSelectedCluster(e.target.value)}
                  >
                    {clusterOptions.map(c => <option key={c} value={c}>{c === "Todos" ? "Todos los Clusters" : c}</option>)}
                  </select>
                </div>
              </div>
            </header>

            {/* Scorecards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mb-2">CUOTA DE VOZ</span>
                <h3 className="text-2xl font-black">{geniallyStats?.sov.toFixed(1)}%</h3>
                <p className="text-[10px] text-slate-400 font-medium">SOV Acumulado Genially</p>
              </Card>

              <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mb-2">POSICIÓN (CUANDO APARECE)</span>
                <h3 className="text-2xl font-black">{geniallyStats?.avgPos !== null ? `#${geniallyStats?.avgPos?.toFixed(1)}` : '-'}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Posición (cuando aparece)</p>
              </Card>

              <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full w-fit mb-2">LÍDER DE CATEGORÍA</span>
                <h3 className="text-lg font-bold truncate">{topCompetitor?.name || "Sin datos"}</h3>
                <p className="text-[10px] text-slate-400 font-medium">{topCompetitor?.sov.toFixed(1)}% de visibilidad</p>
              </Card>

              <Card className="bg-primary/5 border-primary/10 border shadow-sm h-32 flex flex-col justify-center px-5">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-2">GAPS DETECTADOS</span>
                <h3 className="text-2xl font-black">{gapAnalysis.length}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Faltas de presencia críticas</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Historical Evolution Chart */}
              <Card className="lg:col-span-2 border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Evolución Histórica de Presencia
                  </CardTitle>
                  <CardDescription>Menciones diarias: Genially vs Competidores Directos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={evolutionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#94a3b8' }}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" />
                        <Line
                          type="monotone"
                          dataKey="Genially"
                          stroke="#5028FF"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#5028FF" }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Competidores"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3, fill: "#94a3b8" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* SoV Ranking Chart */}
              <Card className="border-none shadow-sm bg-white flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-bold">SoV Actual</CardTitle>
                  <button
                    onClick={() => setShowOnlyDirect(!showOnlyDirect)}
                    className="text-[10px] bg-slate-50 border px-2 py-1 rounded-full font-bold text-slate-500"
                  >
                    {showOnlyDirect ? 'Ver todos' : 'Solo directos'}
                  </button>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={displayBrands.slice(0, 8)} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          width={80}
                          tick={{ fontSize: 10, fontWeight: 600, fill: '#334155' }}
                        />
                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="sov" radius={[0, 4, 4, 0]} barSize={12}>
                          {displayBrands.map((entry, index) => (
                            <Cell key={index} fill={entry.name === "Genially" ? "#5028FF" : "#cbd5e1"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* Sentiment Analysis Module */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scatter Chart: SoV vs Sentiment */}
              <Card className="lg:col-span-2 border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-emerald-500" />
                    Matriz de Sentimiento & SoV
                  </CardTitle>
                  <CardDescription>Visualiza qué marcas dominan la conversación y cómo se perciben.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          dataKey="sov"
                          name="Share of Voice"
                          unit="%"
                          label={{ value: "Share of Voice (%)", position: "bottom", offset: 0 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="avgSentiment"
                          name="Sentimiento"
                          domain={[0, 100]}
                          label={{ value: "Sentimiento Promedio", angle: -90, position: "left" }}
                        />
                        <ZAxis type="number" dataKey="totalMentions" range={[60, 400]} name="Menciones" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                        <Legend />
                        <Scatter name="Marcas" data={displayBrands} fill="#8884d8">
                          {displayBrands.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name === 'Genially' ? '#5028FF' : entry.isDirect ? '#F59E0B' : '#94A3B8'} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Drivers */}
              <Card className="lg:col-span-1 border-none shadow-sm bg-white flex flex-col">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-500" />
                    Factores de Sentimiento (Genially)
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 pt-0">
                  <div>
                    <h5 className="text-xs font-black text-emerald-600 uppercase mb-2 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> Fortalezas
                    </h5>
                    {geniallyStats?.pros && geniallyStats.pros.length > 0 ? (
                      <ul className="space-y-2">
                        {geniallyStats.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-slate-600 bg-emerald-50 p-2 rounded border border-emerald-100">
                            {pro}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No detectadas en esta muestra.</p>
                    )}
                  </div>

                  <div>
                    <h5 className="text-xs font-black text-rose-500 uppercase mb-2 flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3" /> Áreas de Mejora
                    </h5>
                    {geniallyStats?.cons && geniallyStats.cons.length > 0 ? (
                      <ul className="space-y-2">
                        {geniallyStats.cons.map((con, i) => (
                          <li key={i} className="text-xs text-slate-600 bg-rose-50 p-2 rounded border border-rose-100">
                            {con}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No detectadas en esta muestra.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Gap Analysis Box */}
              <Card className="lg:col-span-1 border-none shadow-sm bg-white flex flex-col">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Gap Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto max-h-[600px] space-y-3 p-4 pt-0">
                  {gapAnalysis.map((gap, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-700 leading-tight mb-1.5">{gap.prompt}</p>
                      <div className="flex flex-wrap gap-1">
                        {gap.competitors.slice(0, 3).map(c => (
                          <span key={c} className="text-[8px] bg-white border px-1 py-0.5 rounded text-slate-400 font-mono">{c}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Comparison Table */}
              <Card className="lg:col-span-3 border-none shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold">Guerra de Posiciones</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 border-y">
                        <tr>
                          <th className="px-5 py-3 font-bold">Marca</th>
                          <th className="px-5 py-3 font-bold text-center">Share of Voice</th>
                          <th className="px-5 py-3 font-bold text-center">Posición (cuando aparece)</th>
                          <th className="px-5 py-3 font-bold text-right">Impacto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {displayBrands.map((brand) => (
                          <tr key={brand.name} className={`hover:bg-slate-50/50 transition-colors ${brand.name === "Genially" ? 'bg-primary/5' : ''}`}>
                            <td className="px-5 py-3.5 font-bold flex items-center gap-2">
                              {brand.name === "Genially" && <Trophy className="w-3 h-3 text-amber-500" />}
                              {brand.name}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2 justify-center">
                                <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
                                  <div className={`h-full ${brand.name === "Genially" ? 'bg-primary' : 'bg-slate-300'}`} style={{ width: `${brand.sov}%` }} />
                                </div>
                                <span className="text-[10px] font-mono">{brand.sov.toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              <span className={`font-mono font-bold ${brand.avgPos !== null && brand.avgPos <= 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {brand.avgPos !== null ? `#${brand.avgPos.toFixed(1)}` : '-'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right text-slate-400 font-mono">
                              {brand.totalMentions} menc.
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main >
      </div >
    </>
  )
}
