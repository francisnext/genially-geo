"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// Eliminados los imports de gráficos y sus iconos
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ScatterChart, Scatter, ZAxis } from "recharts"
// import { Upload, BarChart3, PieChartIcon, Lock, Eye, EyeOff, FilterIcon, XCircle } from "lucide-react"
import { Upload, Lock, Eye, EyeOff, FilterIcon, XCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SAMPLE_DATASET, getUniqueKeywords, SampleDatasetItem } from "@/data/sample-dataset"
import geoDiagnostico from "@/data/geo-diagnostico.json"
import SidebarMenu from "@/components/SidebarMenu"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Debilidad {
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
}

interface Estrategia {
  accion: string;
  coste: string;
  prioridad: "alta" | "media" | "baja";
}

interface MarketShareResult {
  geniallyMarketShare: number
  totalQueriesWithBrands: number
  queriesWithGenially: number
  brandDistribution: { brand: string; count: number; percentage: number; avgSentiment: number }[]
  totalBrandMentions: number
  queryFrequencies: QueryFrequency[]
  totalQueries: number
  uniqueQueries: number
  rawData: SampleDatasetItem[]
}

interface QueryFrequency {
  query: string
  count: number
  percentage: number
  withBrands: number
  withGenially: number
}

interface BrandDetail {
  query: string
  highlights: string[]
  pros: string[]
  cons: string[]
  sentimiento: number
}

interface BrandDetails {
  [brand: string]: BrandDetail[]
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
  "#8DD1E1",
  "#D084D0",
]

const CORRECT_PASSWORD = "GeniallyTeam2025**"

export default function MarketShareAnalyzer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  const [apiKey, setApiKey] = useState("genially-team-2025")
  const [error, setError] = useState("")
  const [analysisResult, setAnalysisResult] = useState<MarketShareResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<MarketShareResult | null>(null)
  const [selectedDetailBrand, setSelectedDetailBrand] = useState<string>("all")

  const router = useRouter();

  // Al autenticar, carga automáticamente el SAMPLE_DATASET
  const handleLogin = () => {
    setAuthLoading(true)
    setAuthError("")

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true)
        setAuthError("")
        setTimeout(() => {
          analyzeData()
        }, 100)
      } else {
        setAuthError("Contraseña incorrecta. Inténtalo de nuevo.")
      }
      setAuthLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  // Solo usa SAMPLE_DATASET, elimina la opción de analizar JSON manualmente
  const analyzeData = () => {
    if (!apiKey) {
      setError("Por favor, ingresa una API key")
      return
    }

    setLoading(true)
    const data = SAMPLE_DATASET
    console.log("Datos cargados:", data)

    // Verificar la estructura de los datos en tools
    let tools: any[] = [];
    try {
      tools = data[0]?.json_content ? JSON.parse(data[0].json_content) : [];
    } catch {}
    tools.forEach((tool, index) => {
      console.log(`Tool ${index + 1}:`, {
        name: tool.name,
        nombre: tool.nombre,
        raw: tool
      })
    })

    const totalQueries = data.length
    const uniqueQueries = new Set(data.map((item) => (item.keyword || "").toLowerCase())).size

    // Calcular frecuencias de queries
    const queryCounts: { [key: string]: { count: number; withBrands: number; withGenially: number } } = {}
    data.forEach((item) => {
      const query = (item.keyword || "").toLowerCase()
      if (!queryCounts[query]) {
        queryCounts[query] = { count: 0, withBrands: 0, withGenially: 0 }
      }
      queryCounts[query].count++
      // Verificar si tiene marcas
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      if (tools.length > 0) {
        queryCounts[query].withBrands++
      }
      // Verificar si tiene Genially
      if (tools.some(tool => (tool.name || tool.nombre || "").toLowerCase().includes("genially"))) {
        queryCounts[query].withGenially++
      }
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

    // Función auxiliar para verificar si una marca es Genially
    const isGenially = (name: string) => {
      if (!name) return false
      const normalizedName = name.toLowerCase()
      const result = normalizedName.includes("genially")
      console.log(`Verificando si "${name}" es Genially: ${result}`)
      return result
    }

    // Calcular total de menciones de marcas y menciones de Genially
    let totalBrandMentions = 0
    let geniallyMentions = 0
    let queriesWithGenially = 0
    const brandCounts: { [key: string]: { count: number; totalSentiment: number } } = {}

    data.forEach((item, index) => {
      let hasGeniallyInQuery = false
      console.log(`\nProcesando query ${index + 1}:`, item.keyword)
      // Procesar tools
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      tools.forEach((tool) => {
        const brand = tool.name || tool.nombre || ""
        if (!brand) {
          console.log("Tool sin nombre encontrada:", tool)
          return
        }
        totalBrandMentions++
        console.log(`Marca encontrada: "${brand}"`)
        // Actualizar conteo de marcas
        if (!brandCounts[brand]) {
          brandCounts[brand] = { count: 0, totalSentiment: 0 }
        }
        brandCounts[brand].count++
        brandCounts[brand].totalSentiment += tool.sentiment || tool.sentimiento || 0
        if (isGenially(brand)) {
          geniallyMentions++
          hasGeniallyInQuery = true
          console.log(`¡Genially encontrado en la query ${index + 1}!
`)
        }
      })
      // Si Genially aparece en esta query, incrementar el contador
      if (hasGeniallyInQuery) {
        queriesWithGenially++
        console.log(`Query ${index + 1} tiene Genially. Total hasta ahora: ${queriesWithGenially}`)
      }
    })

    // Calcular menciones de marcas
    const totalQueriesWithBrands = data.filter((item) => {
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      return tools.length > 0;
    }).length

    console.log("\nResumen de conteos:")
    console.log("Total de queries:", totalQueries)
    console.log("Queries con marcas:", totalQueriesWithBrands)
    console.log("Total menciones de marcas:", totalBrandMentions)
    console.log("Menciones de Genially:", geniallyMentions)
    console.log("Queries con Genially:", queriesWithGenially)

    // Calcular market share de Genially basado en menciones totales
    const geniallyMarketShare = totalBrandMentions > 0 ? (geniallyMentions / totalBrandMentions) * 100 : 0

    console.log("\nMarket Share de Genially:", geniallyMarketShare.toFixed(2) + "%")

    // Crear distribución de marcas
    const brandDistribution = Object.entries(brandCounts)
      .map(([brand, data]) => ({
        brand,
        count: data.count,
        percentage: (data.count / totalBrandMentions) * 100,
        avgSentiment: data.totalSentiment / data.count
      }))
      .sort((a, b) => b.count - a.count)

    const result: MarketShareResult = {
      geniallyMarketShare,
      totalQueriesWithBrands,
      queriesWithGenially,
      brandDistribution,
      totalBrandMentions,
      queryFrequencies,
      totalQueries,
      uniqueQueries,
      rawData: data,
    }

    console.log("\nResultado final:", result)
    setAnalysisResult(result)
    setResults(result)
    setLoading(false)
  }

  const clearData = () => {
    setResults(null)
    setError("")
    analyzeData() // Siempre recarga el sample dataset
  }

  // Filtrar resultados basados en la query seleccionada
  const filteredResults = useMemo(() => {
    if (!results) {
      return results
    }

    // Filtrar los datos originales por la query seleccionada
    const filteredData = results.rawData.filter(
      (item) => item.keyword && item.keyword.toLowerCase().trim() === "all", // Always show all queries
    )

    // Filtrar queries que mencionan marcas usando 'tools'
    const queriesWithBrands = filteredData.filter((item) => {
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      return Array.isArray(tools) && tools.length > 0;
    })

    // Contar queries que mencionan Genially usando 'tools'
    const queriesWithGenially = queriesWithBrands.filter((item) => {
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      return tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"));
    })

    // Contar todas las menciones de marcas usando 'tools'
    const brandCounts: { [key: string]: { count: number; totalSentiment: number } } = {}
    let totalBrandMentions = 0
    queriesWithBrands.forEach((item) => {
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      tools.forEach((tool: any) => {
        const brandName = tool.name || tool.nombre || ""
        if (brandName) {
          if (!brandCounts[brandName]) {
            brandCounts[brandName] = { count: 0, totalSentiment: 0 }
          }
          brandCounts[brandName].count += 1
          brandCounts[brandName].totalSentiment += tool.sentiment || tool.sentimiento || 0
          totalBrandMentions++
        }
      })
    })

    // Crear distribución de marcas
    const brandDistribution = Object.entries(brandCounts)
      .map(([brand, data]) => ({
        brand,
        count: data.count,
        percentage: (data.count / totalBrandMentions) * 100,
        avgSentiment: data.totalSentiment / data.count
      }))
      .sort((a, b) => b.count - a.count)

    // Calcular market share de Genially
    const geniallyMarketShare =
      queriesWithBrands.length > 0 ? (queriesWithGenially.length / queriesWithBrands.length) * 100 : 0

    // Recalcular queryFrequencies para la query filtrada
    const queryCounts: { [key: string]: { count: number; withBrands: number; withGenially: number } } = {}
    filteredData.forEach((item) => {
      const query = (item.keyword || "").toLowerCase()
      if (!queryCounts[query]) {
        queryCounts[query] = { count: 0, withBrands: 0, withGenially: 0 }
      }
      queryCounts[query].count++
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      if (tools.length > 0) {
        queryCounts[query].withBrands++
      }
      if (tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"))) {
        queryCounts[query].withGenially++
      }
    })
    const queryFrequencies = Object.entries(queryCounts)
      .map(([query, data]) => ({
        query,
        count: data.count,
        withBrands: data.withBrands,
        withGenially: data.withGenially,
        percentage: (data.count / filteredData.length) * 100
      }))
      .sort((a, b) => b.count - a.count)

    return {
      ...results,
      geniallyMarketShare,
      totalQueriesWithBrands: queriesWithBrands.length,
      queriesWithGenially: queriesWithGenially.length,
      brandDistribution,
      totalBrandMentions,
      totalQueries: filteredData.length,
      queryFrequencies,
      rawData: filteredData,
    }
  }, [results])

  // Hook para calcular la evolución semanal de menciones por marca (Top 10 marcas)
  const weeklyEvolutionData = useMemo(() => {
    if (!results) return [];

    // Obtener las 10 marcas más mencionadas
    const topBrands = results.brandDistribution.slice(0, 10).map((b) => b.brand);

    // Agrupar por semana y contar menciones por marca
    const weekBrandCount: { [week: string]: { [brand: string]: number } } = {};

    results.rawData.forEach((item) => {
      if (!item.date) return;
      const dateObj = new Date(item.date);
      // Obtener el año y el número de semana ISO
      const year = dateObj.getUTCFullYear();
      const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
      const pastDaysOfYear = Math.floor((dateObj.getTime() - firstDayOfYear.getTime()) / 86400000);
      // Semana ISO (aprox)
      const week = Math.ceil((pastDaysOfYear + firstDayOfYear.getUTCDay() + 1) / 7);
      const weekKey = `${year}-W${week.toString().padStart(2, "0")}`;

      if (!weekBrandCount[weekKey]) weekBrandCount[weekKey] = {};
      
      // Procesar tools en lugar de marcasMencionadas
      let tools: any[] = [];
      try {
        tools = item.json_content ? JSON.parse(item.json_content) : [];
      } catch {}
      tools.forEach((tool) => {
        const brand = tool.name || tool.nombre || "";
        if (brand && topBrands.includes(brand)) {
          weekBrandCount[weekKey][brand] = (weekBrandCount[weekKey][brand] || 0) + 1;
        }
      });
    });

    // Convertir a array de objetos para Recharts, ordenado por semana
    const sortedWeeks = Object.keys(weekBrandCount).sort();
    return sortedWeeks.map((week) => {
      const entry: any = { week };
      topBrands.forEach((brand) => {
        entry[brand] = weekBrandCount[week][brand] || 0;
      });
      return entry;
    });
  }, [results]);

  // Eliminar función getBrandDetails y cualquier lógica que use 'tools' o 'query' de SAMPLE_DATASET

  // Obtener keywords únicas
  const uniqueKeywords = getUniqueKeywords();

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-[#F9F8FC] from-[var(--background)] to-[var(--primary)] flex items-center justify-center p-4" suppressHydrationWarning>
        <Card className="w-full max-w-md bg-[#F9F8FC] border-none shadow-none">
          <CardHeader className="text-center space-y-4">
            <img src="/favicon.png" alt="Genially Logo" className="mx-auto w-10 h-10 mb-4" />
            <div suppressHydrationWarning>
              <CardTitle className="text-2xl text-foreground">Acceso Restringido</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ingresa la contraseña..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {authError && (
              <Alert variant="destructive">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleLogin} disabled={!password.trim() || authLoading} className="w-full bg-[#6C29FF] rounded-full">
              {authLoading ? "Verificando..." : "Acceder"}
            </Button>

            <div className="text-center text-sm text-muted-foreground" suppressHydrationWarning>
              <p>Herramienta interna del equipo Genially</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Aplicación principal (solo se muestra después de autenticarse)
  return (
    <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      {/* Menú lateral */}
      <SidebarMenu />
      <main className="flex-1 p-4">
        <div className="max-w-8xl mx-auto space-y-6" suppressHydrationWarning>
          <div className="text-center space-y-2" suppressHydrationWarning>
            <h1 className="text-3xl font-bold text-foreground">Análisis GEO de Genially</h1>
            <p className="text-muted-foreground">Analiza el market share de Genially y sus competidores en diferentes LLMs</p>
          </div>

          {/* Listado de keywords únicas */}
                <Card>
                  <CardHeader>
              <CardTitle>Keywords únicas en el dataset</CardTitle>
              <CardDescription>Lista de todas las keywords encontradas en el dataset</CardDescription>
                  </CardHeader>
                  <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg bg-white">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-2 py-2 text-left w-20">#</th>
                      <th className="px-4 py-2 text-left">Keyword</th>
                          </tr>
                        </thead>
                        <tbody>
                    {uniqueKeywords.length === 0 && (
                      <tr><td colSpan={2} className="text-muted-foreground px-4 py-2">No hay keywords.</td></tr>
                    )}
                    {uniqueKeywords.map((kw, idx) => (
                      <tr
                        key={kw}
                        className="border-b last:border-b-0 hover:bg-muted/40 cursor-pointer"
                        onClick={() => router.push(`/keyword/${encodeURIComponent(kw)}`)}
                      >
                        <td className="px-4 py-2 text-left font-bold">{idx + 1}</td>
                        <td className="px-4 py-2 text-left">
                          {kw}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

          {/* Eliminar la Card de Debilidades y Oportunidades de la página principal */}
          
        </div>
      </main>
    </div>
  )
}
