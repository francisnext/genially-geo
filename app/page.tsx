"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Target, Trophy, Search, Activity, AlertCircle, TrendingUp, Globe } from "lucide-react"
import { getSampleDataset, getUniqueKeywords, SampleDatasetItem } from "@/data/sample-dataset"
import { normalizeBrandName } from "@/lib/competitors"
import SidebarMenu from "@/components/SidebarMenu"
import { useRouter } from "next/navigation"
import Topbar from "@/components/Topbar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts"
import { getLatestDataBatch } from "@/lib/strategic-report-service"

// Domain map for favicons
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

function getBrandDomain(brand: string): string | null {
  const match = brand.match(/([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/);
  if (match) return match[1];
  const found = Object.entries(BRAND_DOMAIN_MAP).find(([key]) => key.toLowerCase() === brand.toLowerCase());
  if (found) return found[1];
  return null;
}

function getKeywordStats(keyword: string, datasetItems: SampleDatasetItem[]) {
  const items = datasetItems.filter((item: SampleDatasetItem) => (item.keyword || '').toLowerCase() === keyword.toLowerCase());
  let geniallyPositions: number[] = [];
  let geniallyMentions = 0;
  let totalMentions = 0;
  const brandCount: Record<string, { count: number; avgPos: number }> = {};

  items.forEach((item: SampleDatasetItem) => {
    if (!item.json_content) return;
    try {
      const tools = JSON.parse(item.json_content);
      if (!Array.isArray(tools)) return;

      tools.forEach(tool => {
        const rawName = tool.name || tool.nombre;
        const name = normalizeBrandName(rawName);
        const pos = tool.position || tool.posicion || 0;
        if (!name) return;

        if (!brandCount[name]) brandCount[name] = { count: 0, avgPos: 0 };
        brandCount[name].count++;
        brandCount[name].avgPos += Number(pos) || 0;
        totalMentions++;

        if (name === 'Genially') {
          geniallyMentions++;
          if (pos) geniallyPositions.push(Number(pos));
        }
      });
    } catch { }
  });

  const geniallyAvgPos = geniallyPositions.length > 0 ? (geniallyPositions.reduce((a, b) => a + b, 0) / geniallyPositions.length) : null;
  const geniallyShare = totalMentions > 0 ? (geniallyMentions / totalMentions) * 100 : null;
  const topBrands = Object.entries(brandCount)
    .map(([brand, data]) => ({ brand, count: data.count, avgPos: data.count > 0 ? data.avgPos / data.count : 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return { geniallyAvgPos, geniallyShare, topBrands };
}

function MiniBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
      <div
        className={`h-full rounded-full ${percent > 50 ? 'bg-emerald-500' : percent > 20 ? 'bg-primary' : 'bg-slate-300'}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function MarketShareAnalyzer() {
  const [dataset, setDataset] = useState<SampleDatasetItem[]>([]);
  const [latestBatch, setLatestBatch] = useState<SampleDatasetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'sov' | 'avgPos'>('sov');
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fullData, latestData] = await Promise.all([
          getSampleDataset(),
          getLatestDataBatch()
        ]);
        setDataset(fullData);
        setLatestBatch(latestData);
      } catch (error) {
        console.error('Error loading dataset:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Global Metrics (from latest batch only)
  const globalStats = useMemo(() => {
    if (latestBatch.length === 0) return null;

    let totalMentions = 0;
    let geniallyMentions = 0;
    let geniallyPositions: number[] = [];
    let promptsWithGenially = new Set<string>();
    const totalPrompts = new Set(latestBatch.map(d => d.prompt)).size;

    latestBatch.forEach(item => {
      try {
        const tools = JSON.parse(item.json_content || '[]');
        if (!Array.isArray(tools)) return;

        tools.forEach(tool => {
          const name = normalizeBrandName(tool.name || tool.nombre || "");
          totalMentions++;
          if (name === 'Genially') {
            geniallyMentions++;
            promptsWithGenially.add(item.prompt || "");
            if (tool.position) geniallyPositions.push(Number(tool.position));
          }
        });
      } catch { }
    });

    return {
      sov: totalMentions > 0 ? (geniallyMentions / totalMentions) * 100 : 0,
      avgPos: geniallyPositions.length > 0 ? geniallyPositions.reduce((a, b) => a + b, 0) / geniallyPositions.length : null,
      reach: (promptsWithGenially.size / totalPrompts) * 100,
      totalClusters: new Set(latestBatch.map(d => d.keyword)).size,
      totalPrompts: totalPrompts
    };
  }, [latestBatch]);

  const uniqueKeywords = useMemo(() => getUniqueKeywords(dataset), [dataset]);

  // Evolution data: Genially metrics per cluster over time
  const evolutionData = useMemo(() => {
    if (dataset.length === 0) return [];

    // Group by date and cluster
    const dataMap = new Map<string, Map<string, { positions: number[], mentions: number, totalMentions: number }>>();

    dataset.forEach(item => {
      if (!item.date || !item.keyword) return;
      const dateKey = new Date(item.date).toISOString().split('T')[0];
      const cluster = item.keyword;

      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, new Map());
      }
      const dateData = dataMap.get(dateKey)!;

      if (!dateData.has(cluster)) {
        dateData.set(cluster, { positions: [], mentions: 0, totalMentions: 0 });
      }
      const clusterData = dateData.get(cluster)!;

      try {
        const tools = JSON.parse(item.json_content || '[]');
        if (!Array.isArray(tools)) return;

        tools.forEach(tool => {
          const name = normalizeBrandName(tool.name || tool.nombre || "");
          clusterData.totalMentions++;

          if (name === 'Genially') {
            clusterData.mentions++;
            if (tool.position) clusterData.positions.push(Number(tool.position));
          }
        });
      } catch { }
    });

    // Convert to chart format
    const chartData: any[] = [];
    const sortedDates = Array.from(dataMap.keys()).sort();

    sortedDates.forEach(dateKey => {
      const dateData = dataMap.get(dateKey)!;
      const dataPoint: any = { date: new Date(dateKey).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) };

      dateData.forEach((clusterData, cluster) => {
        if (selectedMetric === 'sov') {
          dataPoint[cluster] = clusterData.totalMentions > 0
            ? (clusterData.mentions / clusterData.totalMentions) * 100
            : 0;
        } else {
          dataPoint[cluster] = clusterData.positions.length > 0
            ? clusterData.positions.reduce((a, b) => a + b, 0) / clusterData.positions.length
            : null;
        }
      });

      chartData.push(dataPoint);
    });

    return chartData;
  }, [dataset, selectedMetric]);

  const queriesByDay = useMemo(() => {
    const counts: Record<string, number> = {};
    dataset.forEach(item => {
      if (!item.date) return;
      const key = new Date(item.date).toISOString().split('T')[0];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({ dateKey: key, displayDate: new Date(key).toLocaleDateString(), count }))
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  }, [dataset]);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Cargando dashboard...</div>

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
        <SidebarMenu />
        <main className="flex-1 p-6 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">

            <header>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Globe className="text-primary w-6 h-6" />
                Dashboard de Visibilidad IA
              </h1>
              <p className="text-slate-500 text-sm">Resumen global del impacto de Genially en motores de respuesta IA.</p>
            </header>

            {/* Global Scorecards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><TrendingUp className="w-5 h-5" /></div>
                    <Badge variant="outline" className="text-[10px]">SOV GLOBAL</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{globalStats?.sov.toFixed(1)}%</h3>
                  <p className="text-xs text-slate-500">Cuota de voz acumulada</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Target className="w-5 h-5" /></div>
                    <Badge variant="outline" className="text-[10px]">POSICIÓN</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{globalStats?.avgPos !== null ? `#${globalStats?.avgPos.toFixed(1)}` : '-'}</h3>
                  <p className="text-xs text-slate-500">Posición (cuando aparece)</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Search className="w-5 h-5" /></div>
                    <Badge variant="outline" className="text-[10px]">ALCANCE</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{globalStats?.reach.toFixed(1)}%</h3>
                  <p className="text-xs text-slate-500">Presencia en prompts únicos</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Activity className="w-5 h-5" /></div>
                    <Badge variant="outline" className="text-[10px]">COBERTURA</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{globalStats?.totalClusters}</h3>
                  <p className="text-xs text-slate-500">Áreas de contenido analizadas</p>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-400"><span className="font-bold text-purple-600">{new Set(dataset.map(d => d.prompt)).size}</span> prompts totales</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clusters Table */}
            <Card className="bg-white shadow-sm border-none overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50">
                <CardTitle className="text-lg">Clusters de Contenido</CardTitle>
                <CardDescription>Explora el detalle por categoría de búsqueda.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Categoría</th>
                        <th className="px-6 py-4 font-semibold">Posición (cuando aparece)</th>
                        <th className="px-6 py-4 font-semibold w-48">Share of Voice</th>
                        <th className="px-6 py-4 font-semibold">Principales Alternativas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {uniqueKeywords.map((kw) => {
                        const stats = getKeywordStats(kw, latestBatch);
                        return (
                          <tr
                            key={kw}
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => router.push(`/cluster/${encodeURIComponent(kw)}`)}
                          >
                            <td className="px-6 py-4 text-left font-medium text-slate-800">{kw}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${stats.geniallyAvgPos && stats.geniallyAvgPos <= 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                {stats.geniallyAvgPos !== null ? `#${stats.geniallyAvgPos.toFixed(1)}` : '-'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col items-center">
                                <span className="text-xs mb-1 font-semibold">{stats.geniallyShare !== null ? `${stats.geniallyShare.toFixed(1)}%` : '-'}</span>
                                {stats.geniallyShare !== null && <MiniBar percent={stats.geniallyShare} />}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center -space-x-2">
                                {stats.topBrands.map((b) => {
                                  const domain = getBrandDomain(b.brand);
                                  return (
                                    <Popover key={b.brand}>
                                      <PopoverTrigger asChild>
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center cursor-help overflow-hidden">
                                          {domain ? (
                                            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt={b.brand} className="w-5 h-5 object-contain" />
                                          ) : (
                                            <span className="text-[10px] font-bold text-slate-400">{b.brand[0]}</span>
                                          )}
                                        </div>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-2 text-xs font-semibold">{b.brand}</PopoverContent>
                                    </Popover>
                                  );
                                })}
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

            {/* Evolution Chart */}
            <Card className="bg-white shadow-sm border-none overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Evolución de Genially por Cluster</CardTitle>
                    <CardDescription>Rendimiento histórico en cada área de contenido</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMetric('sov')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${selectedMetric === 'sov'
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      Share of Voice
                    </button>
                    <button
                      onClick={() => setSelectedMetric('avgPos')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedMetric === 'avgPos'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      Posición (cuando aparece)
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        label={{
                          value: selectedMetric === 'sov' ? 'Share of Voice (%)' : 'Posición (cuando aparece)',
                          angle: -90,
                          position: 'insideLeft',
                          style: { fontSize: 12, fill: '#64748b' }
                        }}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value: any) => {
                          if (value === null) return ['-', ''];
                          return selectedMetric === 'sov'
                            ? [`${Number(value).toFixed(1)}%`, '']
                            : [`#${Number(value).toFixed(1)}`, ''];
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: '11px' }}
                        iconType="line"
                      />
                      {uniqueKeywords.map((cluster, idx) => {
                        const colors = ['#5028FF', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];
                        return (
                          <Line
                            key={cluster}
                            type="monotone"
                            dataKey={cluster}
                            stroke={colors[idx % colors.length]}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                            connectNulls
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Histórico de Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {queriesByDay.map((row) => (
                      <div key={row.dateKey} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-slate-600">{row.displayDate}</span>
                        <span className="font-bold text-slate-800">{row.count} consultas</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Resumen de Ejecución</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-around py-4">
                  <div className="text-center group">
                    <p className="text-3xl font-black text-primary group-hover:scale-110 transition-transform">{dataset.length}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Capturas Totales</p>
                  </div>
                  <div className="text-center group text-orange-500">
                    <p className="text-3xl font-black group-hover:scale-110 transition-transform">{new Set(dataset.map(d => d.prompt)).size}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prompts Analíticos</p>
                  </div>
                  <div className="text-center group text-emerald-500">
                    <p className="text-3xl font-black group-hover:scale-110 transition-transform">{new Set(dataset.map(d => d.ia)).size}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">IAs Evaluadas</p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
