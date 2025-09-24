"use client"
import React from "react";
import SidebarMenu from "@/components/SidebarMenu";
import Topbar from "@/components/Topbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";
import sampleDataset from "@/data/sample-dataset.json";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { useRef } from "react";

export default function AnalisisCompetidoresPage() {
  // Extraer las opciones únicas de IA para el filtro
  const iaOptions = useMemo(() => ["Todas", ...Array.from(new Set(sampleDataset.map((d) => d.ia).filter(Boolean)))], []);
  // Filtro de IA: select para una sola IA o 'Todas'
  const [selectedIa, setSelectedIa] = useState<string>(iaOptions[0] || "Todas");

  // Filtrar los datos por IA seleccionada y extraer herramientas únicas con posición
  const tools = useMemo(() => {
    // Si está seleccionado 'Todas', usar todos los datos
    const filtered = selectedIa === "Todas" ? sampleDataset : sampleDataset.filter((d) => d.ia === selectedIa);
    // Extraer herramientas de los campos json_content (si existen)
    let toolsArr: any[] = [];
    filtered.forEach((d) => {
      try {
        if (typeof d.json_content === "string") {
          const arr = JSON.parse(d.json_content);
          if (Array.isArray(arr)) toolsArr = toolsArr.concat(arr);
        }
      } catch {}
    });
    // Eliminar duplicados por nombre (mantener la mejor posición encontrada)
    const toolMap = new Map<string, any>();
    toolsArr.forEach((tool) => {
      if (!toolMap.has(tool.name) || (tool.position || 99) < (toolMap.get(tool.name).position || 99)) {
        toolMap.set(tool.name, tool);
      }
    });
    const uniqueTools = Array.from(toolMap.values());
    // Ordenar por posición ascendente
    uniqueTools.sort((a: any, b: any) => (a.position || 99) - (b.position || 99));
    return uniqueTools;
  }, [sampleDataset, selectedIa]);

  // Obtener todas las marcas únicas
  const allBrands = useMemo(() => {
    const set = new Set<string>();
    sampleDataset.forEach((d) => {
      try {
        if (typeof d.json_content === "string") {
          const arr = JSON.parse(d.json_content);
          if (Array.isArray(arr)) arr.forEach((tool: any) => {
            let name = tool?.name ?? tool?.nombre;
            if (typeof name !== "string" || !name) return;
            if (name.toLowerCase().includes("genially")) name = "Genially";
            set.add(name);
          });
        }
      } catch {}
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [sampleDataset]);

  // Marcas por defecto: Genially + las primeras 4 (que no sean Genially)
  const defaultBrands = useMemo(() => {
    const brands = ["Genially"];
    for (const b of allBrands) {
      if (b !== "Genially" && brands.length < 5) brands.push(b);
    }
    return brands;
  }, [allBrands]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(defaultBrands);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Sugerencias de marcas no seleccionadas
  const brandSuggestions = useMemo(() =>
    allBrands.filter(b => {
      if (typeof b !== "string") return false;
      if (selectedBrands.includes(b)) return false;
      const query = (inputValue || "").toLowerCase();
      return (b || "").toLowerCase().includes(query);
    }),
    [allBrands, selectedBrands, inputValue]
  );

  // Añadir marca desde input
  const handleAddBrand = (brand: string) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands([...selectedBrands, brand]);
      setInputValue("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  // Colores para chips
  const chipColors = [
    "bg-blue-100 text-blue-700 border-blue-300",
    "bg-green-100 text-green-700 border-green-300",
    "bg-orange-100 text-orange-700 border-orange-300",
    "bg-pink-100 text-pink-700 border-pink-300",
    "bg-yellow-100 text-yellow-700 border-yellow-300",
    "bg-purple-100 text-purple-700 border-purple-300",
    "bg-red-100 text-red-700 border-red-300",
    "bg-lime-100 text-lime-700 border-lime-300"
  ];

  // Actualizar marcas seleccionadas (Genially siempre incluida)
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (brand === "Genially") return; // Genially no se puede quitar
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  // Filtrar herramientas por marcas seleccionadas
  const filteredTools = useMemo(() => tools.filter((tool) => selectedBrands.includes(tool.name)), [tools, selectedBrands]);

  // Filtro de IA: checkboxes para seleccionar varias
  const [selectedIas, setSelectedIas] = useState<string[]>(iaOptions.slice(1)); // Por defecto todas menos 'Todas'

  // Handler para checkboxes de IA
  const handleIaChange = (ia: string, checked: boolean) => {
    if (checked) {
      setSelectedIas([...selectedIas, ia]);
    } else {
      setSelectedIas(selectedIas.filter((i) => i !== ia));
    }
  };

  // Calcular shareOfVoice por marca para la IA seleccionada o el promedio de todas
  const shareData = useMemo(() => {
    if (!selectedIa) return [];
    let filteredItems: typeof sampleDataset = [];
    let iaList: string[] = [];
    if (selectedIa === "Todas") {
      iaList = iaOptions.slice(1);
    } else {
      iaList = [selectedIa];
    }
    // Para cada IA seleccionada, filtrar los items y contar apariciones de cada marca
    const iaBrandStats: Record<string, Record<string, number>> = {};
    const iaTotals: Record<string, number> = {};
    sampleDataset.forEach(item => {
      if (!iaList.includes(item.ia)) return;
      iaTotals[item.ia] = (iaTotals[item.ia] || 0) + 1;
      if (!item.json_content) return;
      let toolsList: any[] = [];
      try {
        if (typeof item.json_content === "string") {
          const parsed = JSON.parse(item.json_content);
          if (Array.isArray(parsed)) toolsList = parsed;
        }
      } catch {}
      toolsList.forEach(tool => {
        let name = tool.name || tool.nombre;
        if (!name) return;
        if (name.toLowerCase().includes('genially')) name = 'Genially';
        if (!iaBrandStats[item.ia]) iaBrandStats[item.ia] = {};
        iaBrandStats[item.ia][name] = (iaBrandStats[item.ia][name] || 0) + 1;
      });
    });
    // Para cada marca seleccionada, calcular el promedio de share entre las IAs seleccionadas
    return selectedBrands.map((brand) => {
      let sum = 0;
      let count = 0;
      iaList.forEach((ia) => {
        const total = iaTotals[ia] || 0;
        const brandCount = iaBrandStats[ia]?.[brand] || 0;
        if (total > 0) {
          sum += (brandCount / total) * 100;
          count++;
        }
      });
      return {
        name: brand,
        share: count > 0 ? sum / count : 0
      };
    });
  }, [selectedBrands, selectedIa, sampleDataset, iaOptions]);

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
                <div className="mb-4">
                  <label className="font-semibold mr-2">Filtrar por IA:</label>
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedIa}
                    onChange={e => setSelectedIa(e.target.value)}
                  >
                    {iaOptions.map((ia) => (
                      <option key={ia} value={ia}>{ia}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="font-semibold mr-2">Marcas a comparar (mín. 5 por defecto):</label>
                  <div className="flex flex-wrap gap-2 mt-2 items-center">
                    {selectedBrands.map((brand, idx) => (
                      <span
                        key={brand}
                        className={`inline-flex items-center border rounded-full px-3 py-1 text-xs font-medium ${brand === "Genially" ? "bg-blue-100 text-blue-700 border-blue-300" : chipColors[idx % chipColors.length]} relative`}
                      >
                        {brand}
                        {brand === "Genially" && (
                          <span className="ml-2 bg-blue-200 text-blue-800 rounded px-1 text-[10px] font-bold">main</span>
                        )}
                        {brand !== "Genially" && (
                          <button
                            type="button"
                            className="ml-2 text-xs font-bold focus:outline-none"
                            onClick={() => handleBrandChange(brand, false)}
                            aria-label={`Quitar ${brand}`}
                          >
                            ×
                          </button>
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
                        onKeyDown={e => {
                          if (e.key === "Enter" && brandSuggestions.length > 0) {
                            handleAddBrand(brandSuggestions[0]);
                          }
                        }}
                        autoComplete="off"
                      />
                      {inputValue && brandSuggestions.length > 0 && (
                        <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                          {brandSuggestions.map((b) => (
                            <li
                              key={b}
                              className="px-3 py-1 hover:bg-accent cursor-pointer text-xs"
                              onMouseDown={() => handleAddBrand(b)}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <Card>
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
                </Card>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
} 