"use client"
import React from "react";
import SidebarMenu from "@/components/SidebarMenu";
import Topbar from "@/components/Topbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AnalisisCompetidoresPage() {
  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
        <SidebarMenu />
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="w-full max-w-8xl mx-auto space-y-6">
            <Card className="md:col-span-2 bg-transparent shadow-none border-none">
              <CardHeader>
                <CardTitle>Análisis de competidores</CardTitle>
                <CardDescription>Explora el análisis comparativo de Genially frente a sus principales competidores en el sector EdTech.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Aquí irá el contenido del análisis de competidores */}
                <div className="text-muted-foreground">
                  Próximamente: visualización de fortalezas, debilidades y oportunidades frente a la competencia.
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
} 