"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarMenu from "@/components/SidebarMenu";
import { getSampleDataset, SampleDatasetItem } from "@/data/sample-dataset";
import { notFound } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
    CheckCircle,
    Circle,
    XCircle,
    PlusCircle,
    MinusCircle,
    ExternalLink,
    TrendingUp,
    TrendingDown,
    Target,
    DollarSign,
    Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeywordPageClientProps {
    cluster: string
}

function getDataForKeyword(keyword: string, dataset: SampleDatasetItem[]) {
    // Filtrar por keyword exacta
    const items = dataset.filter(item => item.keyword === keyword);
    const totalResponses = items.length;

    // Listado de marcas y posición media (agrupando Genially)
    const brandStats: Record<string, { count: number; totalPos: number }> = {};
    items.forEach(item => {
        if (!item.json_content) return;
        let tools: any[] = [];
        try {
            const parsed = JSON.parse(item.json_content);
            if (Array.isArray(parsed)) tools = parsed;
        } catch { }
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
        avgPos: data.count > 0 ? data.totalPos / data.count : null,
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
                const parsed = JSON.parse(i.json_content);
                if (Array.isArray(parsed)) tools = parsed;
            } catch { }
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
                const parsed = i.json_content ? JSON.parse(i.json_content) : [];
                if (Array.isArray(parsed)) tools = parsed;
            } catch { }
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
            const parsed = JSON.parse(item.json_content);
            if (Array.isArray(parsed)) tools = parsed;
        } catch { }
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
                const parsed = JSON.parse(item.json_content);
                if (Array.isArray(parsed)) tools = parsed;
            } catch { }
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
            avgPos: data.count > 0 ? data.totalPos / data.count : null,
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
                const parsed = JSON.parse(item.json_content);
                if (Array.isArray(parsed)) tools = parsed;
            } catch { }
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

function RichResponse({ content }: { content: string }) {
    const [isJson, setIsJson] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);

    useEffect(() => {
        try {
            // Limpiar posibles bloques de código markdown
            let jsonStr = content.trim();
            if (jsonStr.startsWith('```')) {
                // Extraer el contenido entre los bloques de código
                const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (match) jsonStr = match[1];
            }

            const parsed = JSON.parse(jsonStr);
            // Verificar si es el formato de herramientas/fuentes
            if (parsed && (parsed.tools || parsed.sources)) {
                setParsedData(parsed);
                setIsJson(true);
            } else {
                setIsJson(false);
            }
        } catch (e) {
            setIsJson(false);
        }
    }, [content]);

    if (!isJson) {
        return (
            <div className="prose prose-sm max-w-none prose-p:mb-4 prose-a:underline prose-a:text-primary">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    }

    const { tools = [], sources = [] } = parsedData;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {tools.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {tools.map((tool: any, idx: number) => (
                        <Card key={idx} className="group overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-200/50">
                            <div className="p-6 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative group-hover:scale-110 transition-transform duration-500">
                                            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            {tool.domain ? (
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                                                    alt={tool.name}
                                                    className="relative w-14 h-14 rounded-2xl shadow-xl bg-white p-1.5 object-contain border border-slate-100"
                                                />
                                            ) : (
                                                <div className="relative w-14 h-14 rounded-2xl shadow-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-black text-2xl border border-primary/20">
                                                    {tool.name?.[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-900 tracking-tight leading-none">{tool.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 border-none text-[10px] uppercase tracking-wider">
                                                    Rank #{tool.position}
                                                </Badge>
                                                {tool.pricing && (
                                                    <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/50 font-bold text-[10px] uppercase tracking-wider">
                                                        <DollarSign className="w-3 h-3 mr-1" /> {tool.pricing}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {tool.sentiment !== undefined && (
                                        <div className="flex flex-col items-end">
                                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black shadow-lg shadow-black/5 ${tool.sentiment > 0.7 ? 'bg-emerald-500 text-white' :
                                                tool.sentiment > 0.4 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                                                }`}>
                                                {tool.sentiment > 0.5 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                                {(tool.sentiment * 10).toFixed(1)}/10
                                            </div>
                                            <span className="text-[9px] text-slate-400 mt-1.5 font-bold uppercase tracking-[0.15em]">Analysis Sentiment</span>
                                        </div>
                                    )}
                                </div>

                                {tool.features && tool.features.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {tool.features.map((f: string, i: number) => (
                                                <span key={i} className="text-[10px] font-bold bg-slate-50 border border-slate-100/50 text-slate-500 px-2.5 py-1.5 rounded-full shadow-sm hover:border-primary/30 transition-colors cursor-default">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tool.pros && tool.pros.length > 0 && (
                                        <div className="p-4 rounded-[2rem] bg-emerald-50/30 border border-emerald-100/30 group-hover:bg-emerald-50/50 transition-colors duration-500">
                                            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest mb-4 px-1">
                                                <div className="p-1.5 bg-emerald-500 rounded-xl text-white shadow-md shadow-emerald-200">
                                                    <PlusCircle className="w-3 h-3" />
                                                </div>
                                                Strengths
                                            </div>
                                            <ul className="space-y-2.5">
                                                {tool.pros.map((p: string, i: number) => (
                                                    <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-2.5 font-medium">
                                                        <CheckCircle className="w-3.5 h-3.5 mt-0 text-emerald-400 shrink-0" /> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {tool.cons && tool.cons.length > 0 && (
                                        <div className="p-4 rounded-[2rem] bg-rose-50/30 border border-rose-100/30 group-hover:bg-rose-50/50 transition-colors duration-500">
                                            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-[11px] uppercase tracking-widest mb-4 px-1">
                                                <div className="p-1.5 bg-rose-500 rounded-xl text-white shadow-md shadow-rose-200">
                                                    <MinusCircle className="w-3 h-3" />
                                                </div>
                                                Weaknesses
                                            </div>
                                            <ul className="space-y-2.5">
                                                {tool.cons.map((c: string, i: number) => (
                                                    <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-2.5 font-medium">
                                                        <XCircle className="w-3.5 h-3.5 mt-0 text-rose-400 shrink-0" /> {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {tool.url && (
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 hover:bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-500 shadow-xl shadow-slate-200 hover:shadow-primary/30 group/btn active:scale-[0.98]"
                                    >
                                        <span className="truncate max-w-[250px]">{getDomainFromUrl(tool.url) || tool.url}</span> <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {sources.length > 0 && (
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-200/60 p-8 shadow-inner">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                        <Layers className="w-48 h-48" />
                    </div>
                    <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2.5">
                                <div className="w-8 h-[2px] bg-slate-200" />
                                <Layers className="w-4 h-4 text-primary" /> Verified Sources
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">{sources.length} links found</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {sources.map((url: string, idx: number) => {
                                const domain = getDomainFromUrl(url);
                                return (
                                    <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-white hover:bg-primary/5 px-4 py-2.5 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-[11px] font-bold text-slate-600 hover:text-primary group/source"
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center group-hover/source:bg-white transition-colors border border-slate-100 shadow-inner">
                                            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt="" className="w-4 h-4 grayscale group-hover/source:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <span className="truncate max-w-[250px]">{domain}</span>
                                        <ExternalLink className="w-3.5 h-3.5 opacity-20 group-hover/source:opacity-100 transition-all duration-300" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function KeywordPageClient({ cluster }: KeywordPageClientProps) {
    if (!cluster) return notFound();
    const decodedKeyword = decodeURIComponent(cluster);

    // Estado para los datos del dataset
    const [dataset, setDataset] = useState<SampleDatasetItem[]>([]);
    const [datasetLoading, setDatasetLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [viewMode, setViewMode] = useState<'current' | 'all'>('current');

    // Cargar datos de Firestore al montar el componente
    useEffect(() => {
        const loadData = async () => {
            setDatasetLoading(true);
            try {
                const data = await getSampleDataset();
                setDataset(data);
                setDataLoaded(true);
            } catch (error) {
                console.error('Error loading dataset:', error);
            } finally {
                setDatasetLoading(false);
            }
        };
        loadData();
    }, []);

    // Obtener los datos filtrados por modo de vista y metadatos del dataset
    const { filteredDataset, latestBatchDate, totalBatches } = useMemo(() => {
        if (!dataLoaded) return { filteredDataset: [], latestBatchDate: null, totalBatches: 0 };
        const keywordItems = dataset.filter(item => item.keyword === decodedKeyword);

        // Identificar capturas únicas (por batch_id o por fecha si no hay batch_id)
        const batchIds = new Set(keywordItems.map(item => item.batch_id).filter(Boolean));
        const uniqueDates = new Set(keywordItems.map(item => item.date).filter(Boolean));
        const captureCount = batchIds.size > 0 ? batchIds.size : uniqueDates.size;

        // Encontrar el item más reciente
        const sortedItems = [...keywordItems].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });

        const latestItem = sortedItems[0];
        const latestBatchId = latestItem?.batch_id;
        const latestDateValue = latestItem?.date;
        const latestDateFormatted = latestDateValue ? new Date(latestDateValue).toLocaleDateString() : null;

        // Filtrado por modo de vista
        const filtered = viewMode === 'current'
            ? (latestBatchId
                ? keywordItems.filter(item => item.batch_id === latestBatchId)
                : keywordItems.filter(item => item.date === latestDateValue))
            : keywordItems;

        return {
            filteredDataset: filtered,
            latestBatchDate: latestDateFormatted,
            totalBatches: captureCount
        };
    }, [dataset, dataLoaded, decodedKeyword, viewMode]);

    // Solo calcular datos cuando el dataset esté cargado
    const keywordData = dataLoaded ? getDataForKeyword(decodedKeyword, filteredDataset) : null;

    const [openPrompt, setOpenPrompt] = useState<string | null>(null);
    const [openIa, setOpenIa] = useState<string | null>(null);
    const [hideHomes, setHideHomes] = useState(false);
    const [selectedIa, setSelectedIa] = useState<string | null>(null);
    const [showOnlyGeniallyPrompts, setShowOnlyGeniallyPrompts] = useState(false);
    const [showNoGeniallyPrompts, setShowNoGeniallyPrompts] = useState(false);

    // Estado para ordenación de la tabla de marcas
    type BrandCol = 'brand' | 'count' | 'avgPos' | 'shareOfVoice';
    const [brandSort, setBrandSort] = useState<{ col: BrandCol, dir: 'asc' | 'desc' }>({ col: 'shareOfVoice', dir: 'desc' });
    // Estado para ordenación de la tabla de prompts
    type PromptCol = 'prompt' | 'totalTools' | 'totalSources';
    const [promptSort, setPromptSort] = useState<{ col: PromptCol, dir: 'asc' | 'desc' }>({ col: 'totalTools', dir: 'desc' });
    // Estado para ordenación de la tabla de sources
    type SourceCol = 'index' | 'url' | 'shareOfVoice' | 'brands';
    const [sourceSort, setSourceSort] = useState<{ col: SourceCol, dir: 'asc' | 'desc' }>({ col: 'shareOfVoice', dir: 'desc' });

    const brandsFiltered = keywordData ? keywordData.getBrandsByIa(selectedIa) : [];

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
    const promptsSorted = keywordData ? [...keywordData.prompts].sort((a, b) => {
        const { col, dir } = promptSort;
        let valA = a[col as PromptCol];
        let valB = b[col as PromptCol];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return dir === 'asc' ? -1 : 1;
        if (valA > valB) return dir === 'asc' ? 1 : -1;
        return 0;
    }) : [];
    // Ordenar sources según el estado
    const sourcesSorted = keywordData ? [...keywordData.getSourcesByIa(selectedIa)].sort((a, b) => {
        const { col, dir } = sourceSort;
        let valA: any;
        let valB: any;
        if (col === 'brands') {
            valA = a.brands.length;
            valB = b.brands.length;
        } else if (col === 'index') {
            // Ordenar por el índice original del array (no por propiedad)
            valA = keywordData.getSourcesByIa(selectedIa).indexOf(a);
            valB = keywordData.getSourcesByIa(selectedIa).indexOf(b);
        } else {
            valA = a[col as Exclude<SourceCol, 'brands' | 'index'>];
            valB = b[col as Exclude<SourceCol, 'brands' | 'index'>];
        }
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return dir === 'asc' ? -1 : 1;
        if (valA > valB) return dir === 'asc' ? 1 : -1;
        return 0;
    }) : [];

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
                                    <div className="flex flex-col">
                                        <CardTitle>Cluster: {decodedKeyword}</CardTitle>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex bg-muted p-1 rounded-full gap-1">
                                        <button
                                            onClick={() => setViewMode('current')}
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${viewMode === 'current' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            Foto Actual
                                        </button>
                                        <button
                                            onClick={() => setViewMode('all')}
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${viewMode === 'all' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            Evolución Histórica
                                        </button>
                                    </div>
                                    {totalBatches > 1 ? (
                                        <div className="text-[10px] text-muted-foreground mt-1 text-right italic px-2">
                                            {viewMode === 'current' ? `Viendo última captura (${latestBatchDate})` : `Viendo histórico (${totalBatches} capturas)`}
                                        </div>
                                    ) : (
                                        <div className="text-[10px] text-amber-600/70 mt-1 text-right italic px-2">
                                            * Solo hay una captura disponible ({latestBatchDate || 'N/A'})
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader >
                        {
                            datasetLoading ? (
                                <Card className="bg-transparent shadow-none border-none" >
                                    <CardContent className="pt-4">
                                        <div className="text-center py-8">
                                            <p className="text-muted-foreground">Cargando datos...</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : !keywordData ? (
                                <Card className="bg-transparent shadow-none border-none">
                                    <CardContent className="pt-4">
                                        <div className="text-center py-8">
                                            <p className="text-muted-foreground">No se encontraron datos para esta keyword.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="bg-transparent shadow-none border-none">

                                    <CardContent className="pt-4">
                                        <Tabs defaultValue="brands">
                                            <TabsList className="rounded-full gap-3">
                                                <TabsTrigger value="brands">Marcas y posición (cuando aparece)</TabsTrigger>
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
                                                        {keywordData.iaList.map(ia => (
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
                                                                    <th className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => setBrandSort(s => ({ col: 'brand', dir: s.col === 'brand' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                        Marca {brandSort.col === 'brand' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                                                                    </th>
                                                                    <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setBrandSort(s => ({ col: 'count', dir: s.col === 'count' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                        Apariciones {brandSort.col === 'count' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                                                                    </th>
                                                                    <th className="px-4 py-2 text-right cursor-pointer select-none min-w-[180px]" onClick={() => setBrandSort(s => ({ col: 'avgPos', dir: s.col === 'avgPos' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                        Posición (cuando aparece) {brandSort.col === 'avgPos' && (brandSort.dir === 'asc' ? '▲' : '▼')}
                                                                    </th>
                                                                    <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setBrandSort(s => ({ col: 'shareOfVoice', dir: s.col === 'shareOfVoice' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
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
                                                                        <td className="px-4 py-2 text-right">{b.avgPos !== null ? b.avgPos.toFixed(2) : '-'}</td>
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
                                                            onChange={e => {
                                                                setShowOnlyGeniallyPrompts(e.target.checked);
                                                                if (e.target.checked) setShowNoGeniallyPrompts(false);
                                                            }}
                                                            className="accent-primary"
                                                        />
                                                        Aparece Genially
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={showNoGeniallyPrompts}
                                                            onChange={e => {
                                                                setShowNoGeniallyPrompts(e.target.checked);
                                                                if (e.target.checked) setShowOnlyGeniallyPrompts(false);
                                                            }}
                                                            className="accent-primary"
                                                        />
                                                        NO aparece Genially
                                                    </label>
                                                </div>
                                                <div className="space-y-2">
                                                    {(!keywordData || keywordData.prompts.length === 0) && (
                                                        <div className="text-muted-foreground px-4 py-2">No hay prompts para esta keyword.</div>
                                                    )}
                                                    {keywordData && keywordData.prompts
                                                        .filter(p => {
                                                            const mentionsGenially = Object.values(p.iaStats).some((ia) => ia.items.some((item: SampleDatasetItem) => {
                                                                if (!item.json_content) return false;
                                                                let tools: any[] = [];
                                                                try {
                                                                    const parsed = JSON.parse(item.json_content);
                                                                    if (Array.isArray(parsed)) tools = parsed;
                                                                } catch { }
                                                                return tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"));
                                                            }));

                                                            if (showOnlyGeniallyPrompts) return mentionsGenially;
                                                            if (showNoGeniallyPrompts) return !mentionsGenially;
                                                            return true;
                                                        })
                                                        .map((p, i) => {
                                                            // ¿Alguna respuesta de este prompt menciona a Genially?
                                                            const mentionsGenially = p.iaStats && Object.values(p.iaStats).some((ia) => ia.items.some((item: SampleDatasetItem) => {
                                                                if (!item.json_content) return false;
                                                                let tools: any[] = [];
                                                                try {
                                                                    const parsed = JSON.parse(item.json_content);
                                                                    if (Array.isArray(parsed)) tools = parsed;
                                                                } catch { }
                                                                return tools.some((tool: any) => (tool.name || tool.nombre || "").toLowerCase().includes("genially"));
                                                            }));
                                                            // Total marcas y sources
                                                            let totalBrands = 0;
                                                            let totalSources = 0;
                                                            Object.values(p.iaStats).forEach((ia) => {
                                                                ia.items.forEach((item: SampleDatasetItem) => {
                                                                    if (!item.json_content) return;
                                                                    let tools: any[] = [];
                                                                    try {
                                                                        const parsed = JSON.parse(item.json_content);
                                                                        if (Array.isArray(parsed)) tools = parsed;
                                                                    } catch { }
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
                                                                            {Object.entries((p.iaStats || {}) as Record<string, { marcas: number; sources: number; items: SampleDatasetItem[] }>).map(
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
                                                                                                    <div key={idx} className="mb-2 p-4 bg-white/40 rounded-2xl shadow-sm border border-white/50 text-sm max-w-none">
                                                                                                        <RichResponse content={item.content || ""} />
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
                                                                    <span className="cursor-pointer text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#e9e9e9" /><text x="8" y="12" textAnchor="middle" fontSize="10" fill="#333">i</text></svg></span>
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
                                                            {keywordData && keywordData.iaList.map((ia: string) => (
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
                                                                        <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({ col: 'index', dir: s.col === 'index' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                            #
                                                                        </th>
                                                                        <th className="px-4 py-2 text-left cursor-pointer select-none" onClick={() => setSourceSort(s => ({ col: 'url', dir: s.col === 'url' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                            Source {sourceSort.col === 'url' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                                                        </th>
                                                                        <th className="px-4 w-48 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({ col: 'shareOfVoice', dir: s.col === 'shareOfVoice' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                            Share of Voice (%) {sourceSort.col === 'shareOfVoice' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                                                        </th>
                                                                        <th className="px-4 py-2 text-right cursor-pointer select-none" onClick={() => setSourceSort(s => ({ col: 'brands', dir: s.col === 'brands' && s.dir === 'asc' ? 'desc' : 'asc' }))}>
                                                                            Brands {sourceSort.col === 'brands' && (sourceSort.dir === 'asc' ? '▲' : '▼')}
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {sourcesSorted
                                                                        .filter(s => !hideHomes || !isHomeUrl(s.url))
                                                                        .map((s, i) => ({ ...s, index: i + 1 }))
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
                            )
                        }
                    </div >
                </main >
            </div >
        </>
    );
}
