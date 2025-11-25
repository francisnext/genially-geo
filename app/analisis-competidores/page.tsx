"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import SidebarMenu from "@/components/SidebarMenu"
import Topbar from "@/components/Topbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSampleDataset, SampleDatasetItem } from "@/data/sample-dataset"

export default function AnalisisCompetidoresPage() {
  // ---------- State ----------
  const [dataset, setDataset] = useState<SampleDatasetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UI state
  const [selectedIa, setSelectedIa] = useState<string>("Todas")
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")

  // Load data from Firestore on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSampleDataset()
        setDataset(data)
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e.message : "Error loading data")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ---------- Derived data ----------
  // IA options (unique IA values in dataset)
  const iaOptions = useMemo(() => {
    const set = new Set<string>()
    dataset.forEach(d => d.ia && set.add(d.ia))
    return ["Todas", ...Array.from(set)]
  }, [dataset])

  // Tools for the selected IA
  const tools = useMemo(() => {
    const filtered = selectedIa === "Todas" ? dataset : dataset.filter(d => d.ia === selectedIa)
    let toolsArr: any[] = []
    filtered.forEach(d => {
      try {
        if (typeof d.json_content === "string") {
          const arr = JSON.parse(d.json_content)
          if (Array.isArray(arr)) toolsArr = toolsArr.concat(arr)
        }
      } catch { }
    })
    const map = new Map<string, any>()
    toolsArr.forEach(t => {
      if (!map.has(t.name) || (t.position || 99) < (map.get(t.name).position || 99)) {
        map.set(t.name, t)
      }
    })
    const uniq = Array.from(map.values())
    uniq.sort((a, b) => (a.position || 99) - (b.position || 99))
    return uniq
  }, [dataset, selectedIa])

  // All unique brands (including Genially normalization)
  const allBrands = useMemo(() => {
    const set = new Set<string>()
    dataset.forEach(d => {
      try {
        if (typeof d.json_content === "string") {
          const arr = JSON.parse(d.json_content)
          if (Array.isArray(arr)) {
            arr.forEach((tool: any) => {
              let name = tool?.name ?? tool?.nombre
              if (typeof name !== "string" || !name) return
              if (name.toLowerCase().includes("genially")) name = "Genially"
              set.add(name)
            })
          }
        }
      } catch { }
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [dataset])

  // Default selected brands (Genially + first 4 others)
  const defaultBrands = useMemo(() => {
    const brands = ["Genially"]
    for (const b of allBrands) {
      if (b !== "Genially" && brands.length < 5) brands.push(b)
    }
    return brands
  }, [allBrands])

  const [selectedBrands, setSelectedBrands] = useState<string[]>(defaultBrands)

  // Brand suggestions for the input
  const brandSuggestions = useMemo(() => {
    return allBrands.filter(b => {
      if (!b) return false
      if (selectedBrands.includes(b)) return false
      const q = (inputValue || "").toLowerCase()
      return b.toLowerCase().includes(q)
    })
  }, [allBrands, selectedBrands, inputValue])

  const handleAddBrand = (brand: string) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands([...selectedBrands, brand])
      setInputValue("")
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const chipColors = [
    "bg-blue-100 text-blue-700 border-blue-300",
    "bg-green-100 text-green-700 border-green-300",
    "bg-orange-100 text-orange-700 border-orange-300",
    "bg-pink-100 text-pink-700 border-pink-300",
    "bg-yellow-100 text-yellow-700 border-yellow-300",
    "bg-purple-100 text-purple-700 border-purple-300",
    "bg-red-100 text-red-700 border-red-300",
    "bg-lime-100 text-lime-700 border-lime-300",
  ]

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (brand === "Genially") return
    if (checked) setSelectedBrands([...selectedBrands, brand])
    else setSelectedBrands(selectedBrands.filter(b => b !== brand))
  }

  const filteredTools = useMemo(() => tools.filter(t => selectedBrands.includes(t.name)), [tools, selectedBrands])

  // Share of Voice data for the chart
  const shareData = useMemo(() => {
    if (!selectedIa) return []
    const iaList = selectedIa === "Todas" ? iaOptions.slice(1) : [selectedIa]
    const iaTotals: Record<string, number> = {}
    const iaBrandStats: Record<string, Record<string, number>> = {}
    dataset.forEach(item => {
      if (!iaList.includes(item.ia || "")) return
      const iaKey = item.ia!
      iaTotals[iaKey] = (iaTotals[iaKey] || 0) + 1
      if (!item.json_content) return
      try {
        const arr = JSON.parse(item.json_content)
        if (Array.isArray(arr)) {
          arr.forEach((tool: any) => {
            let name = tool.name || tool.nombre
            if (!name) return
            if (name.toLowerCase().includes('genially')) name = 'Genially'
            if (!iaBrandStats[iaKey]) iaBrandStats[iaKey] = {}
            iaBrandStats[iaKey][name] = (iaBrandStats[iaKey][name] || 0) + 1
          })
        }
      } catch { }
    })
    return selectedBrands.map(brand => {
      let sum = 0
      let count = 0
      iaList.forEach(ia => {
        const total = iaTotals[ia] || 0
        const brandCount = iaBrandStats[ia]?.[brand] || 0
        if (total > 0) {
          sum += (brandCount / total) * 100
          count++
        }
      })
      return { name: brand, share: count > 0 ? sum / count : 0 }
    })
  }, [selectedBrands, selectedIa, dataset, iaOptions])

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
                <CardTitle>Análisis de competidores (WIP)</CardTitle>
                <CardDescription>Explora el análisis comparativo de Genially frente a sus principales competidores en el sector EdTech.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* IA selector */}
                <div className="mb-4">
                  <label className="font-semibold mr-2">Filtrar por IA:</label>
                  <select className="border rounded px-2 py-1" value={selectedIa} onChange={e => setSelectedIa(e.target.value)}>
                    {iaOptions.map(ia => (
                      <option key={ia} value={ia}>{ia}</option>
                    ))}
                  </select>
                </div>
                {/* Brand selector */}
                <div className="mb-4">
                  <label className="font-semibold mr-2">Marcas a comparar (mín. 5 por defecto):</label>
                  <div className="flex flex-wrap gap-2 mt-2 items-center">
                    {selectedBrands.map((brand, idx) => (
                      <span key={brand} className={`inline-flex items-center border rounded-full px-3 py-1 text-xs font-medium ${brand === "Genially" ? "bg-blue-100 text-blue-700 border-blue-300" : chipColors[idx % chipColors.length]} relative`}>
                        {brand}
                        {brand === "Genially" && (<span className="ml-2 bg-blue-200 text-blue-800 rounded px-1 text-[10px] font-bold">Genially</span>)}
                        {brand !== "Genially" && (
                          <button type="button" className="ml-2 text-xs font-bold focus:outline-none" onClick={() => handleBrandChange(brand, false)} aria-label={`Quitar ${brand}`}>×</button>
                        )}
                      </span>
                    ))}
                    <div className="relative min-w-[160px]">
                      <input
                        ref={inputRef}
                        type="text"
                        className="border rounded-full px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary w-full"
                        placeholder="Añadir marca..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter" && brandSuggestions.length > 0) handleAddBrand(brandSuggestions[0]) }}
                        autoComplete="off"
                      />
                      {inputValue && brandSuggestions.length > 0 && (
                        <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                          {brandSuggestions.map(b => (
                            <li key={b} className="px-3 py-1 hover:bg-accent cursor-pointer text-xs" onMouseDown={() => handleAddBrand(b)}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shareData} layout="vertical" margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                      <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} allowDecimals={false} label={{ value: "Share of Voice (%)", position: "insideBottom", offset: -5 }} />
                      <YAxis type="category" dataKey="name" width={180} />
                      <Tooltip formatter={(v: any) => `${v.toFixed(1)}%`} />
                      <Bar dataKey="share" fill="#a78bfa">
                        <LabelList dataKey="share" position="right" formatter={(v: any) => `${v.toFixed(1)}%`} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}