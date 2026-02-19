"use client"

import React from "react"
import SidebarMenu from "@/components/SidebarMenu"
import Topbar from "@/components/Topbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, Globe, TrendingUp, BarChart3, Clock, Filter, ChevronDown, PieChart as PieIcon, List } from "lucide-react"
import { getSearchConsoleData } from "@/app/actions/google-search-console"
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts"
import { toast } from "sonner"

const SITES = [
  { label: "genially.com", value: "https://genially.com/" },
  { label: "view.genially.com", value: "sc-domain:view.genially.com" }
]

const COLORS = ['#5028FF', '#94a3b8'];

// Helper para formatear números con puntos para los miles
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(Math.round(num));
};

// Helper para calcular el cambio porcentual
const calcGrowth = (current: number, prev: number) => {
  if (!prev) return current > 0 ? 100 : 0;
  return ((current - prev) / prev) * 100;
};

export default function VisibilidadGooglePage() {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [selectedSite, setSelectedSite] = React.useState(SITES[0].value)
  const [brandFilter, setBrandFilter] = React.useState<'all' | 'branded' | 'non-branded'>('all')

  React.useEffect(() => {
    async function fetchGSC() {
      setLoading(true)
      try {
        const res = await getSearchConsoleData(60, selectedSite)
        if (res.success) {
          setData(res.data)
        } else {
          toast.error("Error al cargar datos de Google: " + res.error)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchGSC()
  }, [selectedSite])

  // Filtrado de datos por marca si es necesario
  const filteredWeeklyRows = React.useMemo(() => {
    if (!data) return [];
    if (brandFilter === 'all') return data.weeklyRows;
    return data.weeklyRows.map((row: any) => ({
      ...row,
      clicks: brandFilter === 'branded' ? row.brandedClicks : row.nonBrandedClicks,
    }));
  }, [data, brandFilter]);

  const stats = React.useMemo(() => {
    if (!data) return null;
    if (brandFilter === 'all') return { 
      clicks: data.totals.clicks, 
      impressions: data.totals.impressions,
      brandedPercent: data.branding.brandedPercent,
      prevClicks: data.totals.prevClicks,
      prevImpressions: data.totals.prevImpressions
    };
    if (brandFilter === 'branded') return { 
      clicks: data.branding.branded.clicks, 
      impressions: data.branding.branded.impressions,
      brandedPercent: 100,
      prevClicks: data.totals.branding.prevBrandedClicks,
      prevImpressions: data.totals.prevImpressions // Estimación simplificada
    };
    return { 
      clicks: data.branding.nonBranded.clicks, 
      impressions: data.branding.nonBranded.impressions,
      brandedPercent: 0,
      prevClicks: data.totals.branding.prevNonBrandedClicks,
      prevImpressions: data.totals.prevImpressions // Estimación simplificada
    };
  }, [data, brandFilter]);

  const pieData = data ? [
    { name: 'De Marca', value: data.branding.branded.clicks },
    { name: 'Sin Marca', value: data.branding.nonBranded.clicks }
  ] : [];

  const GrowthBadge = ({ current, prev }: { current?: number, prev?: number }) => {
    const growth = calcGrowth(current || 0, prev || 0);
    const isPositive = growth >= 0;
    if (prev === undefined) return null;

    return (
      <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? '+' : ''}{growth.toFixed(1)}% <span className="font-normal text-slate-400">vs año pasado</span>
      </div>
    );
  };

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex text-slate-800">
        <SidebarMenu />
        <main className="flex-1 p-6 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Globe className="text-primary w-6 h-6" />
                  Visibilidad en Google (Search Console)
                </h1>
                <p className="text-slate-500 text-sm">Análisis estratégico de {SITES.find(s => s.value === selectedSite)?.label}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Selector de Marca */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                  <PieIcon className="w-4 h-4 text-slate-400" />
                  <select
                    className="text-sm border-none focus:ring-0 bg-transparent pr-8 cursor-pointer font-medium"
                    value={brandFilter}
                    onChange={e => setBrandFilter(e.target.value as any)}
                  >
                    <option value="all">Todo el tráfico</option>
                    <option value="branded">Consultas de Marca</option>
                    <option value="non-branded">Sin Marca (SEO Genérico)</option>
                  </select>
                </div>

                {/* Selector de Sitio */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    className="text-sm border-none focus:ring-0 bg-transparent pr-8 cursor-pointer"
                    value={selectedSite}
                    onChange={e => setSelectedSite(e.target.value)}
                  >
                    {SITES.map(site => (
                      <option key={site.value} value={site.value}>{site.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </header>

            {loading ? (
              <div className="p-20 text-center text-muted-foreground animate-pulse font-medium">Actualizando analíticas estratégicas...</div>
            ) : !data || !stats ? (
              <Card className="md:col-span-3 border-dashed border-2 bg-slate-50/50">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h2 className="text-xl font-bold text-slate-800">No hay datos disponibles</h2>
                    <p className="text-slate-500 text-sm">
                      Comprueba los permisos o los filtros seleccionados.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-2 uppercase tracking-wider">Tránsito Total</span>
                    <h3 className="text-2xl font-black">{formatNumber(stats.clicks)}</h3>
                    <GrowthBadge current={stats.clicks} prev={stats.prevClicks} />
                  </Card>

                  <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mb-2 uppercase tracking-wider">Brand Awareness</span>
                    <h3 className="text-2xl font-black">{stats.brandedPercent.toFixed(1)}%</h3>
                    <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Peso de la marca Genially</p>
                  </Card>

                  <Card className="bg-white border-none shadow-sm h-32 flex flex-col justify-center px-5">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit mb-2 uppercase tracking-wider">Oportunidad SEO</span>
                    <h3 className="text-2xl font-black">{formatNumber(data.branding.nonBranded.clicks)}</h3>
                    <GrowthBadge current={data.branding.nonBranded.clicks} prev={data.totals.branding.prevNonBrandedClicks} />
                  </Card>

                  <Card className="bg-slate-800 border-none shadow-sm h-32 flex flex-col justify-center px-5 text-white">
                    <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full w-fit mb-2 uppercase tracking-wider">Alcance Global</span>
                    <h3 className="text-2xl font-black text-white">{formatNumber(stats.impressions / 1000)}k</h3>
                    <GrowthBadge current={stats.impressions} prev={data.totals.prevImpressions} />
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Evolution Chart */}
                  <Card className="lg:col-span-2 border-none shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Evolución Semanal
                      </CardTitle>
                      <CardDescription>Clics {brandFilter === 'branded' ? 'de Marca' : brandFilter === 'non-branded' ? 'Genéricos' : 'Totales'} por semana.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={filteredWeeklyRows}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            {brandFilter !== 'non-branded' && (
                              <Bar dataKey="brandedClicks" name="Búsquedas Marca" stackId="a" fill="#5028FF" radius={brandFilter === 'branded' ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                            )}
                            {brandFilter !== 'branded' && (
                              <Bar dataKey="nonBrandedClicks" name="Búsquedas Genéricas" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                            )}
                            <Legend iconType="circle" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Branding Pie */}
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-primary" />
                        Composición de Tráfico
                      </CardTitle>
                      <CardDescription>Distribución porcentual de clics</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <div className="w-3 h-3 rounded-full bg-[#5028FF]" /> Marca
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <div className="w-3 h-3 rounded-full bg-[#94a3b8]" /> Genérico
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Non-Branded Queries */}
                  <Card className="lg:col-span-3 border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <List className="w-5 h-5 text-primary" />
                        Top Consultas Sin Marca (Oportunidad SEO)
                      </CardTitle>
                      <CardDescription>Queries genéricas que traen más tráfico.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                            <tr>
                              <th className="px-6 py-3">Consulta</th>
                              <th className="px-6 py-3 text-right">Clics</th>
                              <th className="px-6 py-3 text-right">Impresiones</th>
                              <th className="px-6 py-3 text-right">Posición</th>
                              <th className="px-6 py-3 text-right">CTR</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {data.topNonBranded.map((q: any, i: number) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700">{q.query}</td>
                                <td className="px-6 py-4 text-right font-bold">{formatNumber(q.clicks)}</td>
                                <td className="px-6 py-4 text-right text-slate-500">{formatNumber(q.impressions)}</td>
                                <td className="px-6 py-4 text-right">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.position < 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {q.position.toFixed(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-xs">
                                  {((q.clicks / (q.impressions || 1)) * 100).toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

          </div>
        </main>
      </div>
    </>
  )
}
