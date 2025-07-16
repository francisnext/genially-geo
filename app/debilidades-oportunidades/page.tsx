"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import geoDiagnostico from "@/data/geo-diagnostico.json";
import React from "react";
import SidebarMenu from "@/components/SidebarMenu";

export default function DebilidadesOportunidadesPage() {
  return (
    <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      {/* Menú lateral */}
      <SidebarMenu />
      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Debilidades y Oportunidades</CardTitle>
              <CardDescription>Principales debilidades detectadas y oportunidades de mejora para Genially</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tabla de Debilidades */}
              <div className="mb-8 w-full">
                <h4 className="font-semibold mb-2">Debilidades</h4>
                <div className="rounded-lg border overflow-y-auto max-h-96 bg-background w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-card border-b border-border sticky top-0">
                        <th className="text-left p-2">Debilidad</th>
                        <th className="text-left p-2">Prioridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geoDiagnostico.debilidades
                        .slice()
                        .sort((a, b) => {
                          const prioridadOrden: { [key in 'alta' | 'media' | 'baja']: number } = { alta: 0, media: 1, baja: 2 };
                          return prioridadOrden[(a.prioridad as 'alta' | 'media' | 'baja')] - prioridadOrden[(b.prioridad as 'alta' | 'media' | 'baja')];
                        })
                        .map((deb, idx) => {
                          const debilidad = deb as { descripcion: string; prioridad: 'alta' | 'media' | 'baja' };
                          return (
                            <tr key={idx} className="border-b border-border last:border-b-0">
                              <td className="p-2">{debilidad.descripcion}</td>
                              <td className="p-2 capitalize font-semibold">
                                {debilidad.prioridad === 'alta' && <span className="text-green-700 bg-green-100 rounded px-2 py-1 mr-1">Alta</span>}
                                {debilidad.prioridad === 'media' && <span className="text-yellow-700 bg-yellow-100 rounded px-2 py-1 mr-1">Media</span>}
                                {debilidad.prioridad === 'baja' && <span className="text-gray-700 bg-gray-100 rounded px-2 py-1 mr-1">Baja</span>}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Tabla de Oportunidades */}
              <div className="w-full">
                <h4 className="font-semibold mb-2">Oportunidades y Estrategias</h4>
                <div className="rounded-lg border overflow-y-auto max-h-96 bg-background w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-card border-b border-border sticky top-0">
                        <th className="text-left p-2">Acción</th>
                        <th className="text-left p-2">Coste</th>
                        <th className="text-left p-2">Prioridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geoDiagnostico.estrategias_y_oportunidades
                        .slice()
                        .sort((a, b) => {
                          const prioridadOrden: { [key in 'alta' | 'media' | 'baja']: number } = { alta: 0, media: 1, baja: 2 };
                          return prioridadOrden[(a.prioridad as 'alta' | 'media' | 'baja')] - prioridadOrden[(b.prioridad as 'alta' | 'media' | 'baja')];
                        })
                        .map((op, idx) => {
                          const estrategia = op as { accion: string; coste: string; prioridad: 'alta' | 'media' | 'baja' };
                          return (
                            <tr key={idx} className="border-b border-border last:border-b-0">
                              <td className="p-2">{estrategia.accion}</td>
                              <td className="p-2 capitalize">{estrategia.coste}</td>
                              <td className="p-2 capitalize font-semibold">
                                {estrategia.prioridad === 'alta' && <span className="text-green-700 bg-green-100 rounded px-2 py-1 mr-1">Alta</span>}
                                {estrategia.prioridad === 'media' && <span className="text-yellow-700 bg-yellow-100 rounded px-2 py-1 mr-1">Media</span>}
                                {estrategia.prioridad === 'baja' && <span className="text-gray-700 bg-gray-100 rounded px-2 py-1 mr-1">Baja</span>}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 