"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Upload, BarChart3, PieChartIcon } from "lucide-react"

interface MarcaMencionada {
  marca: string
  sentimiento: number
  highlights: string[]
}

interface QueryData {
  _id: string
  menciona_marca: boolean
  marcasMencionadas?: MarcaMencionada[]
  query: string
  fecha: string
  ia: string
}

interface MarketShareResult {
  geniallyMarketShare: number
  totalQueriesWithBrands: number
  queriesWithGenially: number
  brandDistribution: { brand: string; count: number; percentage: number }[]
  totalBrandMentions: number
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

export default function MarketShareAnalyzer() {
  const [jsonInput, setJsonInput] = useState("")
  const [results, setResults] = useState<MarketShareResult | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const analyzeData = () => {
    setLoading(true)
    setError("")

    try {
      const data: QueryData[] = JSON.parse(jsonInput)

      if (!Array.isArray(data)) {
        throw new Error("Los datos deben ser un array JSON")
      }

      // Filtrar queries que mencionan marcas
      const queriesWithBrands = data.filter((query) => query.menciona_marca && query.marcasMencionadas)

      // Contar queries que mencionan Genially
      const queriesWithGenially = queriesWithBrands.filter((query) =>
        query.marcasMencionadas?.some((marca) => marca.marca.toLowerCase().includes("genially")),
      )

      // Contar todas las menciones de marcas
      const brandCounts: { [key: string]: number } = {}
      let totalBrandMentions = 0

      queriesWithBrands.forEach((query) => {
        query.marcasMencionadas?.forEach((marca) => {
          const brandName = marca.marca
          brandCounts[brandName] = (brandCounts[brandName] || 0) + 1
          totalBrandMentions++
        })
      })

      // Crear distribución de marcas
      const brandDistribution = Object.entries(brandCounts)
        .map(([brand, count]) => ({
          brand,
          count,
          percentage: (count / totalBrandMentions) * 100,
        }))
        .sort((a, b) => b.count - a.count)

      // Calcular market share de Genially
      const geniallyMarketShare =
        queriesWithBrands.length > 0 ? (queriesWithGenially.length / queriesWithBrands.length) * 100 : 0

      setResults({
        geniallyMarketShare,
        totalQueriesWithBrands: queriesWithBrands.length,
        queriesWithGenially: queriesWithGenially.length,
        brandDistribution,
        totalBrandMentions,
      })
    } catch (err) {
      setError(`Error al procesar los datos: ${err instanceof Error ? err.message : "Error desconocido"}`)
    } finally {
      setLoading(false)
    }
  }

  const clearData = () => {
    setJsonInput("")
    setResults(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Analizador de Market Share</h1>
          <p className="text-gray-600">Analiza el market share de Genially y la distribución de marcas en tus datos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Datos JSON
            </CardTitle>
            <CardDescription>Pega aquí tu JSON con los datos de las queries para analizar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Pega aquí tu JSON..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={analyzeData} disabled={!jsonInput.trim() || loading} className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {loading ? "Analizando..." : "Analizar Datos"}
              </Button>
              <Button variant="outline" onClick={clearData}>
                Limpiar
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {results && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Market Share de Genially */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Market Share de Genially</CardTitle>
                <CardDescription>Porcentaje de queries donde aparece mencionada Genially</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">{results.geniallyMarketShare.toFixed(1)}%</div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <div className="font-semibold">{results.queriesWithGenially}</div>
                      <div>Queries con Genially</div>
                    </div>
                    <div>
                      <div className="font-semibold">{results.totalQueriesWithBrands}</div>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{results.brandDistribution.length}</div>
                      <div className="text-sm text-gray-600">Marcas únicas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{results.totalBrandMentions}</div>
                      <div className="text-sm text-gray-600">Total menciones</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Top 3 Marcas:</h4>
                    <div className="space-y-1">
                      {results.brandDistribution.slice(0, 3).map((brand, index) => (
                        <div key={brand.brand} className="flex justify-between items-center">
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
            <Card className="md:col-span-2">
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
                    <BarChart data={results.brandDistribution.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="brand" angle={-45} textAnchor="end" height={80} fontSize={12} />
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
            <Card className="md:col-span-2">
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
                        data={results.brandDistribution.slice(0, 10)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ brand, percentage }) => `${brand}: ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {results.brandDistribution.slice(0, 10).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tabla Detallada */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Distribución Detallada de Marcas</CardTitle>
                <CardDescription>Lista completa de todas las marcas mencionadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">#</th>
                        <th className="text-left p-2">Marca</th>
                        <th className="text-right p-2">Menciones</th>
                        <th className="text-right p-2">Porcentaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.brandDistribution.map((brand, index) => (
                        <tr key={brand.brand} className="border-b hover:bg-gray-50">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2 font-medium">
                            {brand.brand}
                            {brand.brand.toLowerCase().includes("genially") && (
                              <Badge className="ml-2" variant="default">
                                Genially
                              </Badge>
                            )}
                          </td>
                          <td className="p-2 text-right">{brand.count}</td>
                          <td className="p-2 text-right">{brand.percentage.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
