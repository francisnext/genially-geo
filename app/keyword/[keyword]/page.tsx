"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarMenu from "@/components/SidebarMenu";
import { SAMPLE_DATASET, SampleDatasetItem } from "@/data/sample-dataset";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import { useEffect } from "react";

interface KeywordPageProps {
  params: { keyword: string }
}

function getDataForKeyword(keyword: string) {
  // Filtrar por keyword exacta
  const items = SAMPLE_DATASET.filter(item => item.keyword === keyword);
  const totalResponses = items.length;

  // Listado de marcas y posición media
  const brandStats: Record<string, { count: number; totalPos: number }> = {};
  items.forEach(item => {
    if (!item.json_content) return;
    let tools: any[] = [];
    try {
      tools = JSON.parse(item.json_content);
    } catch {}
    tools.forEach(tool => {
      const name = tool.name || tool.nombre;
      const pos = tool.position || tool.posicion || 0;
      if (!name) return;
      if (!brandStats[name]) brandStats[name] = { count: 0, totalPos: 0 };
      brandStats[name].count++;
      brandStats[name].totalPos += Number(pos) || 0;
    });
  });
  const brands = Object.entries(brandStats).map(([brand, data]) => ({
    brand,
    count: data.count,
    avgPos: data.count > 0 ? data.totalPos / data.count : 0,
    shareOfVoice: totalResponses > 0 ? (data.count / totalResponses) * 100 : 0
  })).sort((a, b) => a.avgPos - b.avgPos);

  // Prompts agrupados con tools y sources
  const promptsMap: Record<string, { items: SampleDatasetItem[] }> = {};
  items.forEach(item => {
    if (!item.prompt) return;
    if (!promptsMap[item.prompt]) promptsMap[item.prompt] = { items: [] };
    promptsMap[item.prompt].items.push(item);
  });
  const prompts = Object.entries(promptsMap).map(([prompt, { items }]) => {
    // Total tools y sources para el prompt
    let totalTools = 0;
    let sourcesSet = new Set<string>();
    items.forEach(i => {
      if (!i.json_content) return;
      let tools: any[] = [];
      try {
        tools = JSON.parse(i.json_content);
      } catch {}
      totalTools += Array.isArray(tools) ? tools.length : 0;
      if (i.sources) {
        try {
          let src = i.sources;
          if (typeof src === "string" && src.trim().startsWith("[")) {
            const arr = JSON.parse(src);
            if (Array.isArray(arr)) arr.forEach((s: string) => sourcesSet.add(s));
          } else {
            src.split(/,|;/).forEach((s: string) => sourcesSet.add(s.trim()));
          }
        } catch {
          sourcesSet.add(i.sources);
        }
      }
    });
    // Agrupar por IA y asociar los items
    const iaMap: Record<string, { marcas: number; sources: number; items: SampleDatasetItem[] }> = {};
    items.forEach(i => {
      const ia = i.ia || "Desconocida";
      if (!iaMap[ia]) iaMap[ia] = { marcas: 0, sources: 0, items: [] };
      // Marcas
      let tools: any[] = [];
      try {
        tools = i.json_content ? JSON.parse(i.json_content) : [];
      } catch {}
      iaMap[ia].marcas += Array.isArray(tools) ? tools.length : 0;
      // Sources
      if (i.sources) {
        try {
          let src = i.sources;
          if (typeof src === "string" && src.trim().startsWith("[")) {
            const arr = JSON.parse(src);
            if (Array.isArray(arr)) iaMap[ia].sources += arr.length;
          } else {
            iaMap[ia].sources += src.split(/,|;/).filter((s: string) => s.trim()).length;
          }
        } catch {
          iaMap[ia].sources += 1;
        }
      }
      iaMap[ia].items.push(i);
    });
    return {
      prompt,
      totalTools,
      totalSources: sourcesSet.size,
      iaStats: iaMap
    };
  });

  // Sources normalizados
  const sourcesSet = new Set<string>();
  items.forEach(item => {
    if (item.sources) {
      try {
        let src = item.sources;
        if (typeof src === "string" && src.trim().startsWith("[")) {
          const arr = JSON.parse(src);
          if (Array.isArray(arr)) arr.forEach((s: string) => sourcesSet.add(s));
        } else {
          src.split(/,|;/).forEach((s: string) => sourcesSet.add(s.trim()));
        }
      } catch {
        sourcesSet.add(item.sources);
      }
    }
  });
  const sources = Array.from(sourcesSet).filter(Boolean);

  // Nuevo: obtener todos los sources (urls) a partir de los tools de json_content
  const urlMap: Record<string, { count: number; items: any[] }> = {};
  items.forEach(item => {
    if (!item.json_content) return;
    let tools: any[] = [];
    try {
      tools = JSON.parse(item.json_content);
    } catch {}
    tools.forEach(tool => {
      let toolUrls: string[] = [];
      if (typeof tool.url === "string") toolUrls = [tool.url];
      else if (Array.isArray(tool.url)) toolUrls = tool.url;
      toolUrls.forEach(url => {
        if (!url) return;
        if (!urlMap[url]) urlMap[url] = { count: 0, items: [] };
        urlMap[url].count++;
        urlMap[url].items.push({ tool, item });
      });
    });
  });
  const sourcesEnriched = Object.entries(urlMap).map(([url, data]) => {
    const brandsSet = new Set<string>();
    data.items.forEach(({ tool }) => {
      const name = tool.name || tool.nombre;
      if (name) brandsSet.add(name);
    });
    return {
      url,
      count: data.count,
      brands: Array.from(brandsSet),
      shareOfVoice: totalResponses > 0 ? (data.count / totalResponses) * 100 : 0
    };
  }).sort((a, b) => b.count - a.count);

  // Obtener listado de IAs únicas
  const iaSet = new Set<string>();
  items.forEach(item => {
    if (item.ia) iaSet.add(item.ia);
  });
  const iaList = Array.from(iaSet);

  // Para Marcas y posición media, agrupado por IA
  function getBrandsByIa(selectedIa: string | null) {
    const filteredItems = selectedIa ? items.filter(item => item.ia === selectedIa) : items;
    const brandStats: Record<string, { count: number; totalPos: number }> = {};
    filteredItems.forEach(item => {
      if (!item.json_content) return;
      let tools: any[] = [];
      try {
        tools = JSON.parse(item.json_content);
      } catch {}
      tools.forEach(tool => {
        const name = tool.name || tool.nombre;
        const pos = tool.position || tool.posicion || 0;
        if (!name) return;
        if (!brandStats[name]) brandStats[name] = { count: 0, totalPos: 0 };
        brandStats[name].count++;
        brandStats[name].totalPos += Number(pos) || 0;
      });
    });
    return Object.entries(brandStats).map(([brand, data]) => ({
      brand,
      count: data.count,
      avgPos: data.count > 0 ? data.totalPos / data.count : 0,
      shareOfVoice: filteredItems.length > 0 ? (data.count / filteredItems.length) * 100 : 0
    })).sort((a, b) => a.avgPos - b.avgPos);
  }

  // Para Sources, filtrado por IA
  function getSourcesByIa(selectedIa: string | null) {
    // Si no hay filtro, devuelve todos los sourcesEnriched
    if (!selectedIa) return sourcesEnriched;
    // Filtra los items por IA
    const filteredItems = items.filter(item => item.ia === selectedIa);
    // Recalcula sourcesEnriched solo con esos items
    const urlMapIa: Record<string, { count: number; items: any[] }> = {};
    filteredItems.forEach(item => {
      if (!item.json_content) return;
      let tools: any[] = [];
      try {
        tools = JSON.parse(item.json_content);
      } catch {}
      tools.forEach(tool => {
        let toolUrls: string[] = [];
        if (typeof tool.url === "string") toolUrls = [tool.url];
        else if (Array.isArray(tool.url)) toolUrls = tool.url;
        toolUrls.forEach(url => {
          if (!url) return;
          if (!urlMapIa[url]) urlMapIa[url] = { count: 0, items: [] };
          urlMapIa[url].count++;
          urlMapIa[url].items.push({ tool, item });
        });
      });
    });
    return Object.entries(urlMapIa).map(([url, data]) => {
      const brandsSet = new Set<string>();
      data.items.forEach(({ tool }) => {
        const name = tool.name || tool.nombre;
        if (name) brandsSet.add(name);
      });
      return {
        url,
        count: data.count,
        brands: Array.from(brandsSet),
        shareOfVoice: filteredItems.length > 0 ? (data.count / filteredItems.length) * 100 : 0
      };
    }).sort((a, b) => b.count - a.count);
  }

  return { brands, prompts, sources: Object.keys(urlMap), sourcesEnriched, iaList, getBrandsByIa, getSourcesByIa };
}

export default function KeywordPage({ params }: KeywordPageProps) {
  const { keyword } = params;
  if (!keyword) return notFound();
  const decodedKeyword = decodeURIComponent(keyword);
  const { brands, prompts, sources, sourcesEnriched, iaList, getBrandsByIa, getSourcesByIa } = getDataForKeyword(decodedKeyword);
  const [openPrompt, setOpenPrompt] = useState<string | null>(null);
  const [openIa, setOpenIa] = useState<string | null>(null);
  const [hideHomes, setHideHomes] = useState(true);
  const [selectedIa, setSelectedIa] = useState<string | null>(null);

  const brandsFiltered = getBrandsByIa(selectedIa);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("geo-authenticated")
      if (isAuth === "true") {
        // setIsAuthenticated(true) // This state variable is not defined in the original file
        // analyzeData() // This function is not defined in the original file
      }
    }
  }, [])

  // Función para detectar si una URL es home
  function isHomeUrl(url: string) {
    try {
      const u = new URL(url);
      // Considera home si termina en / y no tiene más path, o si el path es vacío
      return (u.pathname === "/" || u.pathname === "") && !u.search && !u.hash;
    } catch {
      // Si no es una URL válida, no la ocultes
      return false;
    }
  }

  return (
    <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
      <SidebarMenu />
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Keyword: {decodedKeyword}</CardTitle>
                <Link href="/" className="ml-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition-colors text-sm font-semibold shadow">
                  ← Volver a keywords
                </Link>
              </div>
            </CardHeader>
            <Card>
            
            <CardContent className="pt-4">
              <Tabs defaultValue="brands">
                <TabsList>
                  <TabsTrigger value="brands">Marcas y posición media</TabsTrigger>
                  <TabsTrigger value="prompts">Prompts</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>
                <TabsContent value="brands">
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="ia-select" className="text-sm">Filtrar por IA:</label>
                    <select
                      id="ia-select"
                      value={selectedIa || ""}
                      onChange={e => setSelectedIa(e.target.value || null)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="">Todas</option>
                      {iaList.map(ia => (
                        <option key={ia} value={ia}>{ia}</option>
                      ))}
                    </select>
                  </div>
                  {brandsFiltered.length === 0 ? (
                    <div className="text-muted-foreground">No hay marcas para esta keyword{selectedIa ? ` en la IA seleccionada` : ""}.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border rounded-lg bg-white">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Marca</th>
                            <th className="px-4 py-2 text-right">Apariciones</th>
                            <th className="px-4 py-2 text-right">Posición media</th>
                            <th className="px-4 py-2 text-right">Share of Voice (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brandsFiltered.map(b => (
                            <tr key={b.brand} className="border-b last:border-b-0 hover:bg-muted/40">
                              <td className="px-4 py-2 font-semibold">{b.brand}</td>
                              <td className="px-4 py-2 text-right">{b.count}</td>
                              <td className="px-4 py-2 text-right">{b.avgPos.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">{b.shareOfVoice.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="prompts">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg bg-white">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left">Prompt</th>
                          <th className="px-4 py-2 text-right"># Tools</th>
                          <th className="px-4 py-2 text-right"># Sources</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prompts.length === 0 && (
                          <tr><td colSpan={3} className="text-muted-foreground px-4 py-2">No hay prompts para esta keyword.</td></tr>
                        )}
                        {prompts.map((p, i) => (
                          <React.Fragment key={i}>
                            <tr
                              className={`border-b last:border-b-0 hover:bg-muted/40 cursor-pointer ${openPrompt === p.prompt ? 'bg-muted/30' : ''}`}
                              onClick={() => {
                                setOpenPrompt(openPrompt === p.prompt ? null : p.prompt);
                                setOpenIa(null);
                              }}
                            >
                              <td className="px-4 py-2 font-semibold w-full">{p.prompt}</td>
                              <td className="px-4 py-2 text-right">{p.totalTools}</td>
                              <td className="px-4 py-2 text-right">{p.totalSources}</td>
                            </tr>
                            {openPrompt === p.prompt && (
                              <tr>
                                <td colSpan={3} className="bg-muted/40 px-4 py-2">
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full border rounded bg-white">
                                      <thead className="bg-muted">
                                        <tr>
                                          <th className="px-3 py-1 text-left">IA</th>
                                          <th className="px-3 py-1 text-right"># Marcas</th>
                                          <th className="px-3 py-1 text-right"># Sources</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {Object.entries(p.iaStats).map(([ia, stats]) => (
                                          <React.Fragment key={ia}>
                                            <tr
                                              className="border-b last:border-b-0 hover:bg-muted/40 cursor-pointer"
                                              onClick={() => setOpenIa(openIa === ia ? null : ia)}
                                            >
                                              <td className="px-3 py-1 font-medium">{ia}</td>
                                              <td className="px-3 py-1 text-right">{stats.marcas}</td>
                                              <td className="px-3 py-1 text-right">{stats.sources}</td>
                                            </tr>
                                            {openIa === ia && (
                                              <tr>
                                                <td colSpan={3} className="bg-muted/40 px-3 py-2">
                                                  {stats.items
                                                    .map(item => item.content)
                                                    .filter(Boolean)
                                                    .map((content, idx) => (
                                                      <div key={idx} className="mb-4 p-4 bg-white rounded shadow-sm border text-sm prose prose-sm max-w-none">
                                                        <ReactMarkdown>{content}</ReactMarkdown>
                                                      </div>
                                                    ))}
                                                </td>
                                              </tr>
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="sources">
                  <TooltipProvider>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="ia-select-sources" className="text-sm">Filtrar por IA:</label>
                      <select
                        id="ia-select-sources"
                        value={selectedIa || ""}
                        onChange={e => setSelectedIa(e.target.value || null)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="">Todas</option>
                        {iaList.map(ia => (
                          <option key={ia} value={ia}>{ia}</option>
                        ))}
                      </select>
                      <input
                        type="checkbox"
                        id="hide-homes"
                        checked={hideHomes}
                        onChange={e => setHideHomes(e.target.checked)}
                        className="accent-primary ml-4"
                      />
                      <label htmlFor="hide-homes" className="text-sm select-none cursor-pointer">
                        Ocultar enlaces a home (activado por defecto)
                      </label>
                    </div>
                    {getSourcesByIa(selectedIa).length === 0 ? (
                      <div className="text-muted-foreground">No hay sources para esta keyword{selectedIa ? ` en la IA seleccionada` : ""}.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border rounded-lg bg-white">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-right">#</th>
                              <th className="px-4 py-2 text-left">Source</th>
                              <th className="px-4 py-2 text-right">Share of Voice (%)</th>
                              <th className="px-4 py-2 text-right">Brands</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getSourcesByIa(selectedIa)
                              .filter(s => !hideHomes || !isHomeUrl(s.url))
                              .map((s, i) => (
                                <tr key={s.url} className="border-b last:border-b-0 hover:bg-muted/40">
                                  <td className="px-4 py-2 text-right font-bold">{i + 1}</td>
                                  <td className="px-4 py-2 font-medium">
                                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">{s.url}</a>
                                  </td>
                                  <td className="px-4 py-2 text-right">{s.shareOfVoice.toFixed(1)}%</td>
                                  <td className="px-4 py-2 text-right">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="cursor-pointer underline text-primary font-semibold">{s.brands.length}</span>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="bg-white border shadow-lg p-2 rounded text-xs max-w-xs">
                                        <div className="font-bold mb-1">Marcas:</div>
                                        <ul className="list-disc pl-4">
                                          {s.brands.map((b, idx) => (
                                            <li key={idx}>{b}</li>
                                          ))}
                                        </ul>
                                      </TooltipContent>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </TooltipProvider>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 