"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import SidebarMenu from "@/components/SidebarMenu"
import Topbar from "@/components/Topbar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fetchDebilidadesOportunidades, DebilidadesOportunidadesItem } from "@/lib/firestore-debilidades"

export default function DebilidadesOportunidadesPage() {
  // State
  const [data, setData] = useState<DebilidadesOportunidadesItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const items = await fetchDebilidadesOportunidades()
        // Assuming the collection contains a single document with the needed structure
        setData(items[0] ?? {})
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e.message : "Error loading data")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Derived lists (fallback to empty arrays)
  const debilidades = useMemo(() => data?.debilidades ?? [], [data])
  const oportunidades = useMemo(() => data?.estrategias_y_oportunidades ?? [], [data])

  // ---------- Render ----------
  if (loading) {
    return (
      <>
        <Topbar />
        <div className="bg-[#F9F8FC] min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Topbar />
        <div className="bg-[#F9F8FC] min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </>
    )
  }

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
        <SidebarMenu />
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="w-full max-w-8xl mx-auto space-y-6">
            <Card className="md:col-span-2 bg-transparent shadow-none border-none">
              <CardHeader>
                <CardTitle>Debilidades y Oportunidades</CardTitle>
                <CardDescription>En base al análisis y mediante IA, debilidades detectadas y oportunidades de mejora para Genially</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Tabla de Debilidades */}
                <div className="mb-8 w-full">
                  <div className="rounded-lg border overflow-y-auto max-h-96 bg-background w-full">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-card border-b border-border sticky top-0">
                          <th className="text-left p-2">Debilidades y Oportunidades</th>
                          <th className="text-left p-2">Prioridad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {debilidades
                          .slice()
                          .sort((a, b) => {
                            const order: { [key in 'alta' | 'media' | 'baja']: number } = { alta: 0, media: 1, baja: 2 }
                            return order[a.prioridad] - order[b.prioridad]
                          })
                          .map((deb, idx) => (
                            <tr key={idx} className="border-b border-border last:border-b-0">
                              <td className="p-2">{deb.descripcion}</td>
                              <td className="p-2 capitalize font-semibold">
                                {deb.prioridad === 'alta' && <span className="text-green-700 bg-green-100 rounded px-2 py-1 mr-1">Alta</span>}
                                {deb.prioridad === 'media' && <span className="text-yellow-700 bg-yellow-100 rounded px-2 py-1 mr-1">Media</span>}
                                {deb.prioridad === 'baja' && <span className="text-gray-700 bg-gray-100 rounded px-2 py-1 mr-1">Baja</span>}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Tabla de Oportunidades */}
                <div className="w-full">
                  <div className="rounded-lg border overflow-y-auto max-h-96 bg-background w-full">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-card border-b border-border sticky top-0">
                          <th className="text-left p-2">Oportunidades y Estrategias</th>
                          <th className="text-left p-2">Coste</th>
                          <th className="text-left p-2">Prioridad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oportunidades
                          .slice()
                          .sort((a, b) => {
                            const order: { [key in 'alta' | 'media' | 'baja']: number } = { alta: 0, media: 1, baja: 2 }
                            return order[a.prioridad] - order[b.prioridad]
                          })
                          .map((op, idx) => (
                            <tr key={idx} className="border-b border-border last:border-b-0">
                              <td className="p-2">{op.accion}</td>
                              <td className="p-2 capitalize">{op.coste}</td>
                              <td className="p-2 capitalize font-semibold">
                                {op.prioridad === 'alta' && <span className="text-green-700 bg-green-100 rounded px-2 py-1 mr-1">Alta</span>}
                                {op.prioridad === 'media' && <span className="text-yellow-700 bg-yellow-100 rounded px-2 py-1 mr-1">Media</span>}
                                {op.prioridad === 'baja' && <span className="text-gray-700 bg-gray-100 rounded px-2 py-1 mr-1">Baja</span>}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}