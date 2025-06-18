"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ScatterChart, Scatter, ZAxis } from "recharts"
import { Upload, BarChart3, PieChartIcon, Lock, Eye, EyeOff, FilterIcon, XCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SAMPLE_DATASET, QueryData, Tool, MarcaMencionada } from "@/data/sample-dataset"

interface MarketShareResult {
  geniallyMarketShare: number
  totalQueriesWithBrands: number
  queriesWithGenially: number
  brandDistribution: { brand: string; count: number; percentage: number; avgSentiment: number }[]
  totalBrandMentions: number
  queryFrequencies: QueryFrequency[]
  totalQueries: number
  uniqueQueries: number
  rawData: QueryData[]
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
  const [selectedQuery, setSelectedQuery] = useState("all")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<MarketShareResult | null>(null)
  const [selectedDetailBrand, setSelectedDetailBrand] = useState<string>("all")

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
    console.log("\nEstructura detallada de tools en el primer registro:")
    data[0]?.tools?.forEach((tool, index) => {
      console.log(`Tool ${index + 1}:`, {
        name: tool.name,
        nombre: tool.nombre,
        raw: tool
      })
    })

    const totalQueries = data.length
    const uniqueQueries = new Set(data.map((item) => item.query.toLowerCase())).size

    // Calcular frecuencias de queries
    const queryCounts: { [key: string]: { count: number; withBrands: number; withGenially: number } } = {}
    data.forEach((item) => {
      const query = item.query.toLowerCase()
      if (!queryCounts[query]) {
        queryCounts[query] = { count: 0, withBrands: 0, withGenially: 0 }
      }
      queryCounts[query].count++
      
      // Verificar si tiene marcas
      if (item.tools && item.tools.length > 0) {
        queryCounts[query].withBrands++
      }
      
      // Verificar si tiene Genially
      if (item.tools?.some(tool => 
        (tool.name || tool.nombre || "").toLowerCase().includes("genially")
      )) {
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
      console.log(`\nProcesando query ${index + 1}:`, item.query)

      // Procesar tools
      item.tools?.forEach((tool) => {
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
          console.log(`¡Genially encontrado en la query ${index + 1}!`)
        }
      })

      // Si Genially aparece en esta query, incrementar el contador
      if (hasGeniallyInQuery) {
        queriesWithGenially++
        console.log(`Query ${index + 1} tiene Genially. Total hasta ahora: ${queriesWithGenially}`)
      }
    })

    // Calcular menciones de marcas
    const totalQueriesWithBrands = data.filter((item) => 
      (item.tools && item.tools.length > 0)
    ).length

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
    setSelectedQuery("all")
    analyzeData() // Siempre recarga el sample dataset
  }

  // Filtrar resultados basados en la query seleccionada
  const filteredResults = useMemo(() => {
    if (!results || selectedQuery === "all") {
      return results
    }

    // Filtrar los datos originales por la query seleccionada
    const filteredData = results.rawData.filter(
      (item) => item.query && item.query.toLowerCase().trim() === selectedQuery.toLowerCase().trim(),
    )

    // Filtrar queries que mencionan marcas
    const queriesWithBrands = filteredData.filter(
      (query) =>
        query.menciona_marca &&
        query.marcasMencionadas &&
        Array.isArray(query.marcasMencionadas) &&
        query.marcasMencionadas.length > 0,
    )

    // Contar queries que mencionan Genially
    const queriesWithGenially = queriesWithBrands.filter((query) =>
      query.marcasMencionadas?.some(
        (marca) =>
          marca && marca.marca && typeof marca.marca === "string" && marca.marca.toLowerCase().includes("genially"),
      ),
    )

    // Contar todas las menciones de marcas
    const brandCounts: { [key: string]: { count: number; totalSentiment: number } } = {}
    let totalBrandMentions = 0

    queriesWithBrands.forEach((query) => {
      query.marcasMencionadas?.forEach((marca) => {
        if (marca && marca.marca && typeof marca.marca === "string") {
          const brandName = marca.marca.trim()
          if (brandName) {
            if (!brandCounts[brandName]) {
              brandCounts[brandName] = { count: 0, totalSentiment: 0 }
            }
            brandCounts[brandName].count += 1
            brandCounts[brandName].totalSentiment += marca.sentimiento || 0
            totalBrandMentions++
          }
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

    return {
      ...results,
      geniallyMarketShare,
      totalQueriesWithBrands: queriesWithBrands.length,
      queriesWithGenially: queriesWithGenially.length,
      brandDistribution,
      totalBrandMentions,
      totalQueries: filteredData.length,
    }
  }, [results, selectedQuery])

  // Hook para calcular la evolución semanal de menciones por marca (Top 10 marcas)
  const weeklyEvolutionData = useMemo(() => {
    if (!results) return [];

    // Obtener las 10 marcas más mencionadas
    const topBrands = results.brandDistribution.slice(0, 10).map((b) => b.brand);

    // Agrupar por semana y contar menciones por marca
    const weekBrandCount: { [week: string]: { [brand: string]: number } } = {};

    results.rawData.forEach((item) => {
      if (!item.fecha) return;
      const dateObj = new Date(item.fecha);
      // Obtener el año y el número de semana ISO
      const year = dateObj.getUTCFullYear();
      const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
      const pastDaysOfYear = Math.floor((dateObj.getTime() - firstDayOfYear.getTime()) / 86400000);
      // Semana ISO (aprox)
      const week = Math.ceil((pastDaysOfYear + firstDayOfYear.getUTCDay() + 1) / 7);
      const weekKey = `${year}-W${week.toString().padStart(2, "0")}`;

      if (!weekBrandCount[weekKey]) weekBrandCount[weekKey] = {};
      
      // Procesar tools en lugar de marcasMencionadas
      if (item.tools && Array.isArray(item.tools)) {
        item.tools.forEach((tool) => {
          const brand = tool.name || tool.nombre || "";
          if (brand && topBrands.includes(brand)) {
            weekBrandCount[weekKey][brand] = (weekBrandCount[weekKey][brand] || 0) + 1;
          }
        });
      }
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

  // Función para procesar los detalles de las marcas
  const getBrandDetails = (data: QueryData[]): BrandDetails => {
    const details: BrandDetails = {}

    data.forEach((item) => {
      // Procesar tools
      item.tools?.forEach((tool) => {
        const brand = tool.name || tool.nombre || ""
        if (!brand) return

        if (!details[brand]) {
          details[brand] = []
        }

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

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" suppressHydrationWarning>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
          <img src="/favicon.png" alt="Genially Logo" className="mx-auto w-10 h-10 mb-4" />
            <div suppressHydrationWarning>
              <CardTitle className="text-2xl">Acceso Restringido</CardTitle>
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

            <Button onClick={handleLogin} disabled={!password.trim() || authLoading} className="w-full">
              {authLoading ? "Verificando..." : "Acceder"}
            </Button>

            <div className="text-center text-sm text-gray-500" suppressHydrationWarning>
              <p>Herramienta interna del equipo Genially</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Aplicación principal (solo se muestra después de autenticarse)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto space-y-6" suppressHydrationWarning>
        <div className="text-center space-y-2" suppressHydrationWarning>
          <img src="/favicon.png" alt="Genially Logo" className="mx-auto w-10 h-10 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Análisis GEO de Genially</h1>
          <p className="text-gray-600">Analiza el market share de Genially y sus competidores en diferentes LLMs</p>
          
        </div>

        {/* Mostrar mensaje de carga */}
        {loading && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">Cargando datos...</div>
            </CardContent>
          </Card>
        )}

        {/* Mostrar error si existe */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Contenido principal */}
        {results && !loading && (
          <>
            {/* Filtro de Query */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  Filtrar por Query
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <Select value={selectedQuery} onValueChange={setSelectedQuery}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una query para filtrar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Queries</SelectLabel>
                        <SelectItem value="all">Todas las queries</SelectItem>
                        {results.queryFrequencies.map((query) => (
                          <SelectItem key={query.query} value={query.query}>
                            {query.query} ({query.count})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectedQuery !== "all" && (
                    <Button variant="ghost" size="icon" onClick={() => setSelectedQuery("all")} title="Limpiar filtro">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {selectedQuery !== "all" && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Mostrando datos filtrados para: "{selectedQuery}"
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {filteredResults && (
              <div className="grid gap-6 md:grid-cols-2">
                {/* Market Share de Genially */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Market Share de Genially</CardTitle>
                    <CardDescription>Porcentaje de queries donde aparece mencionada Genially</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-blue-600">
                        {filteredResults.geniallyMarketShare.toFixed(1)}%
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600" suppressHydrationWarning>
                        <div suppressHydrationWarning>
                          <div className="font-semibold">{filteredResults.queriesWithGenially}</div>
                          <div>Queries con Genially</div>
                        </div>
                        <div suppressHydrationWarning>
                          <div className="font-semibold">{filteredResults.totalQueriesWithBrands}</div>
                          <div>Total queries con marcas</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumen de Distribución */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Resumen de Marcas</CardTitle>
                    <CardDescription>Estadísticas generales de menciones de marcas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4" suppressHydrationWarning>
                      <div className="grid grid-cols-2 gap-4" suppressHydrationWarning>
                        <div className="text-center" suppressHydrationWarning>
                          <div className="text-2xl font-bold text-green-600">
                            {filteredResults.brandDistribution.length}
                          </div>
                          <div className="text-sm text-gray-600">Marcas únicas</div>
                        </div>
                        <div className="text-center" suppressHydrationWarning>
                          <div className="text-2xl font-bold text-purple-600">{filteredResults.totalBrandMentions}</div>
                          <div className="text-sm text-gray-600">Total menciones</div>
                        </div>
                      </div>
                      <div suppressHydrationWarning>
                        <h4 className="font-semibold mb-2">Top 3 Marcas:</h4>
                        <div className="space-y-1" suppressHydrationWarning>
                          {filteredResults.brandDistribution.slice(0, 3).map((brand, index) => (
                            <div key={brand.brand} className="flex justify-between items-center" suppressHydrationWarning>
                              <span className="text-sm">
                                {index + 1}. {brand.brand}
                              </span>
                              <Badge variant="secondary">{brand.percentage.toFixed(1)}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico de Barras */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Distribución de Market Share por Marca
                    </CardTitle>
                    <CardDescription>Porcentaje de menciones de cada marca</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredResults.brandDistribution.slice(0, 10)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="brand" 
                            angle={-45} 
                            textAnchor="end" 
                            height={80} 
                            fontSize={12}
                            interval={0}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value: number) => [`${value.toFixed(1)}%`, "Porcentaje"]}
                            labelFormatter={(label) => `Marca: ${label}`}
                          />
                          <Bar dataKey="percentage" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráfico Circular */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5" />
                      Distribución Visual de Marcas (Top 10)
                    </CardTitle>
                    <CardDescription>Representación visual del market share</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={filteredResults.brandDistribution.slice(0, 10)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ brand, percentage }) => `${brand}: ${percentage.toFixed(1)}%`}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="percentage"
                          >
                            {filteredResults.brandDistribution.slice(0, 10).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number, name: string, props: any) => [
                              `${value.toFixed(1)}%`,
                              props.payload.brand
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Nueva tabla de detalles por marca y gráfico de dispersión */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Distribución Detallada de Marcas</CardTitle>
                    <CardDescription>Lista completa de todas las marcas mencionadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Limitar altura y permitir scroll vertical */}
                    <div className="overflow-y-auto max-h-96">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">#</th>
                            <th className="text-left p-2">Marca</th>
                            <th className="text-right p-2">Menciones</th>
                            <th className="text-right p-2">Porcentaje</th>
                            <th className="text-right p-2">Sentimiento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredResults.brandDistribution.map((brand, index) => (
                            <tr key={brand.brand} className="border-b hover:bg-gray-50">
                              <td className="p-2">{index + 1}</td>
                              <td className="p-2 font-medium">
                                {brand.brand}
                                {brand.brand.toLowerCase().includes("genially") && (
                                  <Badge className="ml-2" variant="default">
                                    ⭐
                                  </Badge>
                                )}
                              </td>
                              <td className="p-2 text-right">{brand.count}</td>
                              <td className="p-2 text-right">{brand.percentage.toFixed(2)}%</td>
                              <td className="p-2 text-right">{brand.avgSentiment.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Market Share vs. Sentimiento (Top 10)</CardTitle>
                    <CardDescription>Relación entre presencia en el mercado y sentimiento para las 10 marcas mejor valoradas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[450px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                          }}
                        >
                          <CartesianGrid />
                          <XAxis 
                            type="number" 
                            dataKey="percentage" 
                            name="Market Share" 
                            unit="%" 
                            domain={[0, 'dataMax + 5']}
                            label={{ value: 'Market Share (%)', position: 'bottom' }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="avgSentiment" 
                            name="Sentimiento" 
                            domain={[0.6, 1]}
                            label={{ value: 'Sentimiento', angle: -90, position: 'left' }}
                          />
                          <ZAxis 
                            type="number" 
                            dataKey="count" 
                            range={[400, 1200]} 
                            name="Menciones"
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-2 border rounded shadow-sm">
                                    <p className="font-semibold">{data.brand}</p>
                                    <p>Market Share: {data.percentage.toFixed(1)}%</p>
                                    <p>Sentimiento: {data.avgSentiment.toFixed(2)}</p>
                                    <p>Menciones: {data.count}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Scatter
                            name="Marcas"
                            data={filteredResults.brandDistribution
                              .map(brand => ({
                                ...brand,
                                avgSentiment: brand.avgSentiment || 0
                              }))
                              .sort((a, b) => b.count - a.count)
                              .slice(0, 10)
                            }
                            fill="#8884d8"
                          >
                            {filteredResults.brandDistribution
                              .sort((a, b) => b.count - a.count)
                              .slice(0, 10)
                              .map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={COLORS[index % COLORS.length]} 
                                  fillOpacity={0.6}
                                />
                              ))
                            }
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            

            {/* Tabla de Queries - Solo mostrar cuando no hay filtro */}
            {selectedQuery === "all" && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Análisis de Queries</CardTitle>
                  <CardDescription>Frecuencia de cada query y su relación con marcas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Select 
                      value={selectedDetailBrand} 
                      onValueChange={setSelectedDetailBrand}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filtrar por marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Marcas</SelectLabel>
                          <SelectItem value="all">Todas las marcas</SelectItem>
                          {results.brandDistribution.map((brand) => (
                            <SelectItem key={brand.brand} value={brand.brand}>
                              {brand.brand}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="overflow-x-auto overflow-y-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">#</th>
                          <th className="text-left p-2">Query</th>
                          <th className="text-right p-2">Total</th>
                          <th className="text-right p-2">Con Marcas</th>
                          <th className="text-right p-2">Con Genially</th>
                          <th className="text-left p-2">Marcas Mencionadas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results?.queryFrequencies
                          .filter(queryData => {
                            if (selectedDetailBrand === "all") return true;
                            // Filtrar por la marca seleccionada
                            const queryDetails = results.rawData.find(q => q.query === queryData.query);
                            return queryDetails?.tools?.some(tool => 
                              (tool.name || tool.nombre || "").toLowerCase() === selectedDetailBrand.toLowerCase()
                            );
                          })
                          .map((queryData, index) => {
                            // Obtener las marcas mencionadas en esta query
                            const queryDetails = results.rawData.find(q => q.query === queryData.query);
                            const mentionedBrands = queryDetails?.tools?.map(tool => tool.name || tool.nombre || "").filter(Boolean) || [];
                            
                            return (
                              <tr key={queryData.query} className="border-b hover:bg-gray-50">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2 font-medium max-w-md">
                                  <div className="truncate" title={queryData.query}>
                                    {queryData.query}
                                  </div>
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
                                      <Badge 
                                        key={idx}
                                        variant={brand.toLowerCase().includes("genially") ? "default" : "secondary"}
                                      >
                                        {brand}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gráfico de Evolución Semanal - Solo mostrar cuando no hay filtro */}
            {results && weeklyEvolutionData.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Evolución semanal de menciones por marca (Top 10)
                  </CardTitle>
                  <CardDescription>
                    Número de menciones semanales para las 10 marcas más mencionadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyEvolutionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        {results.brandDistribution.slice(0, 10).map((brand, idx) => (
                          <Line
                            key={brand.brand}
                            type="monotone"
                            dataKey={brand.brand}
                            stroke={COLORS[idx % COLORS.length]}
                            strokeWidth={2}
                            dot={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nueva tabla de detalles por marca */}
            {filteredResults && (
              <Card className="md:col-span-2">
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
                          {Object.keys(getBrandDetails(filteredResults.rawData))
                            .sort()
                            .map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[600px]">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b">
                          <th className="text-left p-2">Marca</th>
                          <th className="text-left p-2">Query</th>
                          <th className="text-left p-2">Highlights</th>
                          <th className="text-left p-2">Pros</th>
                          <th className="text-left p-2">Contras</th>
                          <th className="text-right p-2">Sentimiento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(getBrandDetails(filteredResults.rawData))
                          .filter(([brand]) => selectedDetailBrand === "all" || brand === selectedDetailBrand)
                          .map(([brand, details]) =>
                            details.map((detail, detailIndex) => (
                              <tr key={`${brand}-${detailIndex}`} className="border-b hover:bg-gray-50">
                                <td className="p-2 font-medium">
                                  {brand}
                                  {brand.toLowerCase().includes("genially") && (
                                    <Badge className="ml-2" variant="default">
                                      ⭐
                                    </Badge>
                                  )}
                                </td>
                                <td className="p-2 max-w-[200px]">
                                  <div className="truncate" title={detail.query}>
                                    {detail.query}
                                  </div>
                                </td>
                                <td className="p-2 max-w-[300px]">
                                  <ul className="list-disc list-inside">
                                    {detail.highlights.map((highlight, idx) => (
                                      <li key={idx} className="whitespace-normal break-words" title={highlight}>
                                        {highlight}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="p-2 max-w-[300px]">
                                  <ul className="list-disc list-inside">
                                    {detail.pros.map((pro, idx) => (
                                      <li key={idx} className="whitespace-normal break-words" title={pro}>
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="p-2 max-w-[300px]">
                                  <ul className="list-disc list-inside">
                                    {detail.cons.map((con, idx) => (
                                      <li key={idx} className="whitespace-normal break-words" title={con}>
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="p-2 text-right">
                                  <Badge 
                                    variant={detail.sentimiento >= 0.8 ? "default" : 
                                            detail.sentimiento >= 0.6 ? "secondary" : "destructive"}
                                  >
                                    {detail.sentimiento.toFixed(2)}
                                  </Badge>
                                </td>
                              </tr>
                            ))
                          )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estadísticas de Queries - Solo mostrar cuando no hay filtro */}
            {selectedQuery === "all" && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Estadísticas & QA de Queries</CardTitle>
                  <CardDescription>Información sobre las consultas realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{results.totalQueries}</div>
                      <div className="text-sm text-gray-600">Total registros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{results.uniqueQueries}</div>
                      <div className="text-sm text-gray-600">Queries únicas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {(results.totalQueries / results.uniqueQueries).toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Promedio por query</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.max(...results.queryFrequencies.map((q) => q.count))}
                      </div>
                      <div className="text-sm text-gray-600">Máximo repeticiones</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Mostrar mensaje si no hay resultados */}
        {!results && !loading && isAuthenticated && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">No hay datos disponibles para mostrar</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
