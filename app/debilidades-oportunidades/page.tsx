"use client"

import React, { useEffect, useState } from "react"
import SidebarMenu from "@/components/SidebarMenu"
import Topbar from "@/components/Topbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Sparkles,
  BrainCircuit,
  Target,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  Clock,
  Zap,
  ShieldCheck,
  Flame,
  ChevronRight,
  ShieldAlert
} from "lucide-react"
import { generateStrategicReportAction, getLatestStrategicReportAction } from "@/app/actions/strategic-analysis"
import { StrategicReport } from "@/lib/strategic-report-service"
import ReactMarkdown from "react-markdown"
import { toast } from "sonner"

export default function DebilidadesOportunidadesPage() {
  const [report, setReport] = useState<StrategicReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    loadLatestReport()
  }, [])

  const loadLatestReport = async () => {
    setLoading(true)
    const res = await getLatestStrategicReportAction()
    if (res.success && res.report) {
      setReport(res.report)
    }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    toast.info("Analizando últimos datos de extracción... Esto puede tardar unos segundos.")
    const res = await generateStrategicReportAction()
    if (res.success) {
      toast.success("¡Informe estratégico generado con éxito!")
      loadLatestReport()
    } else {
      toast.error(res.error || "Error al generar el informe")
    }
    setIsGenerating(false)
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <RefreshCcw className="w-10 h-10 text-primary animate-spin mx-auto" />
        <p className="text-slate-500 font-medium">Consultando registros estratégicos...</p>
      </div>
    </div>
  )

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-indigo-50/50 to-white flex text-slate-800">
        <SidebarMenu />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <BrainCircuit className="text-primary w-6 h-6" />
                  Estrategia de IA & GEO
                </h1>
                <p className="text-slate-500 text-sm">Consultoría experta basada en la última extracción de datos.</p>
              </div>

              <Button
                onClick={handleGenerate}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all font-bold group px-6 h-12"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2 group_hover:animate-pulse" />
                )}
                {report ? "Actualizar Informe" : "Generar Informe con IA"}
              </Button>
            </header>

            {!report && !isGenerating ? (
              <Card className="border-dashed border-2 bg-white/50 py-24 text-center">
                <CardContent className="space-y-4">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-highlight">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">Sin informe estratégico disponible</h2>
                  <p className="text-slate-500 max-w-md mx-auto font-medium">
                    Haz clic en el botón superior para que nuestra IA analice el posicionamiento,
                    sentimiento y features de Genially en comparación con la competencia.
                  </p>
                </CardContent>
              </Card>
            ) : isGenerating ? (
              <div className="space-y-6">
                <Card className="animate-pulse bg-white border-none shadow-sm h-[300px] flex flex-col items-center justify-center text-center p-8">
                  <RefreshCcw className="w-12 h-12 text-primary/20 animate-spin mb-4" />
                  <h3 className="text-lg font-bold text-slate-400">Procesando Inteligencia Competitiva...</h3>
                  <p className="text-sm text-slate-300 max-w-sm mt-2">Estamos analizando todos los clusters del último lote para extraer insights estratégicos.</p>
                </Card>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 bg-white border px-4 py-2 rounded-full shadow-sm">
                    <Clock className="w-4 h-4 text-primary/60" />
                    DATOS DEL LOTE: {new Date(report.date).toLocaleDateString()}
                  </span>


                </div>

                {/* Summary Section */}
                <Card className="border-none shadow-xl shadow-indigo-100/50 bg-white overflow-hidden group">
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary to-indigo-400" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-black flex items-center gap-2">
                      Resumen Ejecutivo Estratégico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate max-w-none prose-sm text-slate-700 leading-relaxed font-medium pb-8">
                    <ReactMarkdown>{report.reportContent.summary}</ReactMarkdown>
                  </CardContent>
                </Card>

                {/* Analysis Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 px-2">
                    <Target className="w-5 h-5 text-primary" />
                    Diagnóstico GEO por Cluster
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {report.reportContent.clusters.map((c, i) => (
                      <Card key={i} className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col group overflow-hidden">
                        <div className={`h-1 w-full ${c.sov > 50 ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                        <CardHeader className="pb-3 px-5">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-[13px] font-black truncate max-w-[160px] uppercase tracking-tight">{c.name}</CardTitle>
                            <Badge variant={c.sov > 50 ? "default" : "secondary"} className={`text-[10px] font-black ${c.sov > 50 ? 'bg-emerald-500 shadow-emerald-100' : ''}`}>
                              {c.sov.toFixed(1)}% SoV
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${c.sentiment > 0.5 ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : c.sentiment < 0 ? 'bg-red-500 shadow-lg shadow-red-200' : 'bg-amber-500 shadow-lg shadow-amber-200'}`} />
                            <span className="text-[10px] text-slate-500 font-black">SENTIMIENTO IA: {(c.sentiment * 10).toFixed(1)}/10</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-5 flex-1 px-5 pb-6">
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                                <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                              </div>
                              <p className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">Fortalezas</p>
                            </div>
                            <ul className="space-y-2">
                              {c.strengths.slice(0, 2).map((s, si) => (
                                <li key={si} className="text-[11px] text-slate-600 flex items-start gap-2 leading-snug font-medium">
                                  <div className="w-1 h-1 rounded-full bg-emerald-300 mt-1.5 shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center">
                                <ShieldAlert className="w-3 h-3 text-red-600" />
                              </div>
                              <p className="text-[10px] uppercase font-black text-red-700 tracking-wider">Puntos Ciegos</p>
                            </div>
                            <ul className="space-y-2">
                              {c.weaknesses.slice(0, 2).map((w, wi) => (
                                <li key={wi} className="text-[11px] text-slate-600 flex items-start gap-2 leading-snug font-medium">
                                  <div className="w-1 h-1 rounded-full bg-red-300 mt-1.5 shrink-0" />
                                  {w}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Plan de Acción */}
                <section className="space-y-6 pt-4 pb-10">
                  <header className="flex items-center justify-between px-2">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
                      Plan de Optimización GEO
                    </h3>
                    <Badge variant="outline" className="border-amber-200 text-amber-700 font-black">
                      PRIORIDAD ESTRATÉGICA
                    </Badge>
                  </header>
                  <div className="grid grid-cols-1 gap-6">
                    {report.reportContent.actionPlan.map((action, i) => (
                      <Card key={i} className="border-none shadow-sm bg-white overflow-hidden hover:shadow-md transition-all group border-l-4">
                        <div className="flex flex-col md:flex-row min-h-[100px]">
                          <div className={`w-1.5 shrink-0 hidden md:block ${action.priority === 'High' ? 'bg-orange-500' : action.priority === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'}`} />

                          <CardContent className="p-6 w-full space-y-4">
                            {/* Header: Title, Priority, Term */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h4 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{action.title}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`${action.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                      action.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        'bg-blue-50 text-blue-700 border-blue-200'
                                      } border text-[10px] font-bold tracking-wider px-2`}>
                                      {action.priority === 'High' && <Flame className="w-3 h-3 mr-1 inline" />}
                                      {action.priority.toUpperCase()}
                                    </Badge>
                                    {action.term && (
                                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold tracking-wider px-2">
                                        {action.term.toUpperCase()}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{action.description}</p>
                              </div>

                              <Button variant="ghost" className="shrink-0 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl self-start">
                                <ChevronRight className="w-5 h-5" />
                              </Button>
                            </div>

                            {/* Recommendations List */}
                            {action.recommendations && action.recommendations.length > 0 && (
                              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-2">
                                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  Acciones Recomendadas:
                                </h5>
                                <ul className="space-y-2">
                                  {action.recommendations.map((rec, rBox) => (
                                    <li key={rBox} className="text-sm text-slate-700 flex items-start gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0 group-hover:bg-primary transition-colors" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
