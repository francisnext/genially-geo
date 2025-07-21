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
import Topbar from "@/components/Topbar";
import { CheckCircle, Circle } from "lucide-react";

interface KeywordPageProps {
  params: { keyword: string }
}

function getDataForKeyword(keyword: string) {
  // Filtrar por keyword exacta
  const items = SAMPLE_DATASET.filter(item => item.keyword === keyword);
  const totalResponses = items.length;

  // Listado de marcas y posición media (agrupando Genially)
  const brandStats: Record<string, { count: number; totalPos: number }> = {};
  items.forEach(item => {
    if (!item.json_content) return;
    let tools: any[] = [];
    try {
      tools = JSON.parse(item.json_content);
    } catch {}
    tools.forEach(tool => {
      let name = tool.name || tool.nombre;
      const pos = tool.position || tool.posicion || 0;
      if (!name) return;
      // Normalizar Genially
      if (name.toLowerCase().includes('genially')) {
        name = 'Genially';
      }
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

// Añadir función auxiliar para obtener la imagen de la IA
function getIaImage(ia: string): string | null {
  if (/chatgpt|openai/i.test(ia)) return "/openai-chatgpt.webp";
  if (/gemini|google/i.test(ia)) return "/google-gemini.webp";
  return null;
}

// Mapping manual de marcas a dominios
const BRAND_DOMAIN_MAP: Record<string, string> = {
  'Genially': 'genially.com',
  'H5P': 'h5p.org',
  'Typeform': 'typeform.com',
  'Kahoot!': 'kahoot.com',
  'ThingLink': 'thinglink.com',
  'Quizizz': 'quizizz.com',
  'Outgrow': 'outgrow.co',
  'LearningApps.org': 'learningapps.org',
  'Google Forms': 'forms.google.com',
  'Nearpod': 'nearpod.com',
  'Articulate 360 (Storyline & Rise)': 'articulate.com',
  'Thinglink': 'thinglink.com',
  'Mentimeter': 'mentimeter.com',
  'Eko': 'eko.com',
  'Ceros': 'ceros.com',
  'Prezi': 'prezi.com',
  'Articulate Rise 360': 'articulate.com',
  'Quizlet': 'quizlet.com',
  'Dot.vu': 'dot.vu',
  'Canva': 'canva.com',
  'Vyond': 'vyond.com',
  'Socrative': 'socrative.com',
  'Adobe Captivate': 'adobe.com',
};

// Función auxiliar para obtener el dominio de la marca
function getBrandDomain(brand: string): string | null {
  // Buscar el dominio en el nombre
  const match = brand.match(/([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/);
  if (match) return match[1];
  // Buscar en el mapping manual (case-insensitive)
  const found = Object.entries(BRAND_DOMAIN_MAP).find(([key]) => key.toLowerCase() === brand.toLowerCase());
  if (found) return found[1];
  return null;
}

// Función auxiliar para obtener el dominio de una URL
function getDomainFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
}

// Añadir componente auxiliar para la mini barra de progreso
function MiniBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2 mt-1 bg-gray-200 rounded">
      <div
        className="h-2 rounded bg-orange-400"
        style={{ width: `${percent}%`, minWidth: percent > 0 ? '8px' : 0 }}
      />
    </div>
  );
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
  const [showOnlyGeniallyPrompts, setShowOnlyGeniallyPrompts] = useState(false);

  // Estado para ordenación de la tabla de marcas
  type BrandCol = 'brand' | 'count' | 'avgPos' | 'shareOfVoice';
  const [brandSort, setBrandSort] = useState<{col: BrandCol, dir: 'asc'|'desc'}>({col: 'shareOfVoice', dir: 'desc'});
  // Estado para ordenación de la tabla de prompts
  type PromptCol = 'prompt' | 'totalTools' | 'totalSources';
  const [promptSort, setPromptSort] = useState<{col: PromptCol, dir: 'asc'|'desc'}>({col: 'totalTools', dir: 'desc'});
  // Estado para ordenación de la tabla de sources
  type SourceCol = 'index' | 'url' | 'shareOfVoice' | 'brands';
  const [sourceSort, setSourceSort] = useState<{col: SourceCol, dir: 'asc'|'desc'}>({col: 'shareOfVoice', dir: 'desc'});

  const brandsFiltered = getBrandsByIa(selectedIa);

  // Ordenar marcas según el estado
  const brandsSorted = [...brandsFiltered].sort((a, b) => {
    const { col, dir } = brandSort;
    let valA = a[col as BrandCol];
    let valB = b[col as BrandCol];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });
  // Ordenar prompts según el estado
  const promptsSorted = [...prompts].sort((a, b) => {
    const { col, dir } = promptSort;
    let valA = a[col as PromptCol];
    let valB = b[col as PromptCol];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });
  // Ordenar sources según el estado
  const sourcesSorted = [...getSourcesByIa(selectedIa)].sort((a, b) => {
    const { col, dir } = sourceSort;
    let valA: any;
    let valB: any;
    if (col === 'brands') {
      valA = a.brands.length;
      valB = b.brands.length;
    } else if (col === 'index') {
      // Ordenar por el índice original del array (no por propiedad)
      valA = getSourcesByIa(selectedIa).indexOf(a);
      valB = getSourcesByIa(selectedIa).indexOf(b);
    } else {
      valA = a[col as Exclude<SourceCol, 'brands' | 'index'>];
      valB = b[col as Exclude<SourceCol, 'brands' | 'index'>];
    }
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });

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
      const u = new URL(url.trim());
      // Normaliza el path quitando todos los slashes finales
      const normalizedPath = u.pathname.replace(/\/+$/, "");
      return (normalizedPath === "" || normalizedPath === ".") && !u.search && !u.hash;
    } catch {
      return false;
    }
  }

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
        <SidebarMenu />
        <main className="flex-1 p-4">
          <div className="max-w-8xl mx-auto space-y-2 pl-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="px-2 py-1 rounded text-primary hover:bg-primary hover:text-white transition-colors text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/50">
                    ←
                  </Link>
                  <CardTitle>Keyword: {decodedKeyword}</CardTitle>
                </div>
              </div>
            </CardHeader>
              <Card  className="bg-transparent shadow-none border-none">

              <CardContent className="pt-4">
                <Tabs defaultValue="brands">
                  <TabsList className="rounded-full gap-3">
                    <TabsTrigger value="brands">Marcas y posición media</TabsTrigger>
                    <TabsTrigger value="prompts">Prompts</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                  </TabsList>
                  <TabsContent value="brands">
                    <div className="mb-2 flex justify-end items-center gap-2">
                      <select
                        id="ia-select"
                        value={selectedIa || ""}
                        onChange={e => setSelectedIa(e.target.value || null)}
                        className="border rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        <option value="">Todas las IAs</option>
                        {iaList.map(ia => (
                          <option key={ia} value={ia}>{ia}</option>
                        ))}
                      </select>
                    </div>
                    {brandsSorted.length === 0 ? (
                      <div className="text-muted-foreground">No hay marcas para esta keyword{selectedIa ? ` en la IA seleccionada` : ""}.</div>
                    ) : (
                      <div className="overflow-x-auto  border rounded-xl">
                        <table className="min-w-full bg-white">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => setBrandSort(s => ({col: 'brand', dir: s.col === 'brand' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                Marca {brandSort.col === 'brand' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                              </th>
                              <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setBrandSort(s => ({col: 'count', dir: s.col === 'count' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                Apariciones {brandSort.col === 'count' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                              </th>
                              <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setBrandSort(s => ({col: 'avgPos', dir: s.col === 'avgPos' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                Posición media {brandSort.col === 'avgPos' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                              </th>
                              <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setBrandSort(s => ({col: 'shareOfVoice', dir: s.col === 'shareOfVoice' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                Share of Voice (%) {brandSort.col === 'shareOfVoice' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {brandsSorted.map(b => (
                              <tr key={b.brand} className="border-b last:border-b-0 hover:bg-muted/40">
                                <td className="px-4 py-2 font-semibold flex items-center gap-2">
                                  {(() => {
                                    const domain = getBrandDomain(b.brand);
                                    return domain ? (
                                      <img src={`https://www.google.com/s2/favicons?domain=${domain}`} alt={b.brand} className="w-5 h-5 rounded" />
                                    ) : null;
                                  })()}
                                  {b.brand}
                                </td>
                                <td className="px-4 py-2 text-right">{b.count}</td>
                                <td className="px-4 py-2 text-right">{b.avgPos.toFixed(2)}</td>
                                <td className="px-4 py-2 text-right">
                                  {b.shareOfVoice.toFixed(1)}%
                                  <MiniBar percent={b.shareOfVoice} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="prompts">
                    <div className="mb-2 flex justify-end items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                        <input
                          type="checkbox"
                          checked={showOnlyGeniallyPrompts}
                          onChange={e => setShowOnlyGeniallyPrompts(e.target.checked)}
                          className="accent-primary"
                        />
                        Mostrar prompts donde aparece Genially
                      </label>
                    </div>
                    <div className="space-y-2">
                      {prompts.length === 0 && (
                        <div className="text-muted-foreground px-4 py-2">No hay prompts para esta keyword.</div>
                      )}
                      {prompts
                        .filter(p => {
                          if (!showOnlyGeniallyPrompts) return true;
                          // ¿Alguna respuesta de este prompt menciona a Genially?
                          return Object.values(p.iaStats).some((ia) => ia.items.some((item: SampleDatasetItem) => {
                            if (!item.json_content) return false;
                            let tools: any[] = [];
                            try { tools = JSON.parse(item.json_content); } catch {}
                            return tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"));
                          }));
                        })
                        .map((p, i) => {
                          // ¿Alguna respuesta de este prompt menciona a Genially?
                          const mentionsGenially = p.iaStats && Object.values(p.iaStats).some((ia) => ia.items.some((item: SampleDatasetItem) => {
                            if (!item.json_content) return false;
                            let tools: any[] = [];
                            try { tools = JSON.parse(item.json_content); } catch {}
                            return tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"));
                          }));
                          // Total marcas y sources
                          let totalBrands = 0;
                          let totalSources = 0;
                          Object.values(p.iaStats).forEach((ia) => {
                            ia.items.forEach((item: SampleDatasetItem) => {
                              if (!item.json_content) return;
                              let tools: any[] = [];
                              try { tools = JSON.parse(item.json_content); } catch {}
                              totalBrands += Array.isArray(tools) ? tools.length : 0;
                              if (item.sources) {
                                try {
                                  let src = item.sources;
                                  if (typeof src === "string" && src.trim().startsWith("[")) {
                                    const arr = JSON.parse(src);
                                    if (Array.isArray(arr)) totalSources += arr.length;
                                  } else {
                                    totalSources += src.split(/,|;/).filter((s: string) => s.trim()).length;
                                  }
                                } catch {
                                  totalSources += 1;
                                }
                              }
                            });
                          });
                          return (
                            <React.Fragment key={i}>
                              <div
                                className={`bg-white flex items-center gap-4 px-4 py-3 rounded-lg border hover:bg-muted/40 cursor-pointer transition-all ${openPrompt === p.prompt ? 'bg-muted/30' : ''}`}
                                onClick={() => {
                                  setOpenPrompt(openPrompt === p.prompt ? null : p.prompt);
                                  setOpenIa(null);
                                }}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{p.prompt}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {mentionsGenially ? (
                                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-4 h-4" />Mentioned</span>
                                  ) : null}
                                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold">{totalBrands} Brands</span>
                                  <span className="bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 text-xs font-semibold">{totalSources} Sources</span>
                                </div>
                              </div>
                              {openPrompt === p.prompt && (
                                <div className="bg-muted/40 rounded-lg p-4 mt-2 mb-2">
                                  {Object.entries((p.iaStats || {}) as Record<string, { marcas: number; sources: number; items: SampleDatasetItem[] }> ).map(
                                    ([ia, stats]: [string, { marcas: number; sources: number; items: SampleDatasetItem[] }]) => (
                                      <div key={ia} className="mb-4">
                                        <div
                                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer select-none transition-all ${openIa === `${p.prompt}__${ia}` ? 'bg-muted/30 border-primary' : 'bg-white border hover:bg-muted/40'}`}
                                          onClick={() => setOpenIa(openIa === `${p.prompt}__${ia}` ? null : `${p.prompt}__${ia}`)}
                                        >
                                          {getIaImage(ia) && <img src={getIaImage(ia)!} alt={ia} className="w-5 h-5 rounded-full" />}
                                          <span className="font-bold">{ia}</span>
                                          <span className="ml-2 text-xs text-gray-500">({stats.items.length} respuesta{stats.items.length !== 1 ? 's' : ''})</span>
                                        </div>
                                        {openIa === `${p.prompt}__${ia}` && (
                                          <div className="pl-4 mt-2">
                                            {stats.items.map((item: SampleDatasetItem, idx: number) => (
                                              <div key={idx} className="mb-2 p-2 bg-white rounded shadow-sm border text-sm max-w-none prose prose-sm prose-p:mb-4 prose-a:underline prose-a:text-primary">
                                                <ReactMarkdown>{item.content}</ReactMarkdown>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </TabsContent>
                  <TabsContent value="sources">
                    <TooltipProvider>
                      <div className="mb-2 flex justify-end items-center gap-8">
                      <div className="mb-2 flex justify-end items-center gap-1">
                        <input
                          type="checkbox"
                          id="hide-homes"
                          checked={hideHomes}
                          onChange={e => setHideHomes(e.target.checked)}
                          className="accent-primary"
                        />
                        <label htmlFor="hide-homes" className="text-sm select-none cursor-pointer mr-1">
                          Hide Homepages
                        </label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-pointer text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#e9e9e9"/><text x="8" y="12" textAnchor="middle" fontSize="10" fill="#333">i</text></svg></span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-white border shadow-lg p-2 rounded text-xs max-w-xs">
                            Si está activado, se ocultarán los enlaces que apunten a la página principal (home) de los dominios, mostrando solo URLs internas o específicas.
                          </TooltipContent>
                        </Tooltip>
                        </div>
                        <select
                          id="ia-select-sources"
                          value={selectedIa || ""}
                          onChange={e => setSelectedIa(e.target.value || null)}
                          className="border rounded-full px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="">Todas las IAs</option>
                          {iaList.map(ia => (
                            <option key={ia} value={ia}>{ia}</option>
                          ))}
                        </select>
                      </div>
                      {sourcesSorted.length === 0 ? (
                        <div className="text-muted-foreground">No hay sources para esta keyword{selectedIa ? ` en la IA seleccionada` : ""}.</div>
                      ) : (
                        <div className="overflow-x-auto  border rounded-xl">
                          <table className="min-w-full bg-white">
                            <thead className="bg-muted">
                              <tr>
                                <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({col: 'index', dir: s.col === 'index' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                  #
                                </th>
                                <th className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => setSourceSort(s => ({col: 'url', dir: s.col === 'url' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                  Source {sourceSort.col === 'url' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="px-4 w-48 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({col: 'shareOfVoice', dir: s.col === 'shareOfVoice' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                  Share of Voice (%) {sourceSort.col === 'shareOfVoice' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({col: 'brands', dir: s.col === 'brands' && s.dir === 'asc' ? 'desc' : 'asc'}))}>
                                  Brands {sourceSort.col === 'brands' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {sourcesSorted
                                .filter(s => !hideHomes || !isHomeUrl(s.url))
                                .map((s, i) => ({...s, index: i + 1}))
                                .map((s, i) => (
                                  <tr key={s.url} className="border-b last:border-b-0 hover:bg-muted/40">
                                    <td className="px-4 py-2 text-right font-bold">{s.index}</td>
                                    <td className="px-4 py-2 font-medium flex items-center gap-2">
                                      {(() => {
                                        const domain = getDomainFromUrl(s.url);
                                        return domain ? (
                                          <img src={`https://www.google.com/s2/favicons?domain=${domain}`} alt={domain} className="w-5 h-5 rounded" />
                                        ) : null;
                                      })()}
                                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">{s.url}</a>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      {s.shareOfVoice.toFixed(1)}%
                                      <MiniBar percent={s.shareOfVoice} />
                                    </td>
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
    </>
  );
} 