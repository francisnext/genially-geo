"use client"
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Loader2, ExternalLink, AlertTriangle, Info } from "lucide-react";
import SidebarMenu from "@/components/SidebarMenu";
import Topbar from "@/components/Topbar";

interface AuditResult {
  entity: string;
  queries: Array<{
    query: string;
    covered: boolean;
    maxSimilarity: number;
    mostRelevantChunk: string;
  }>;
  totalCoverage: number;
  chunks: {
    title: string[];
    metaDescription: string[];
    headings: string[];
    paragraphs: string[];
    lists: string[];
    divs: string[];
  };
  logs: Array<{
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    details?: string;
  }>;
  geminiEntities?: {
    entities: string[];
    raw: string;
    error?: string;
  };
}

interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

export default function AuditPage() {
  // Estado para el modo de entrada: 'url' o 'text'
  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  const [url, setUrl] = useState('');
  const [manualText, setManualText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (type: LogEntry['type'], message: string, details?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      message,
      details
    };
    setLogs(prev => [...prev, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const handleAudit = async () => {
    if (inputMode === 'url' && !url.trim()) {
      setError("Por favor ingresa una URL válida");
      return;
    }
    if (inputMode === 'text' && !manualText.trim()) {
      setError("Por favor pega el texto a auditar");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    clearLogs();

    addLog('info', 'Iniciando auditoría', inputMode === 'url' ? url : 'Texto manual');

    try {
      addLog('info', 'Enviando solicitud al servidor...');
      
      const response = await fetch("/api/audit-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputMode === 'url' ? { url: url.trim() } : { text: manualText.trim() }),
      });

      addLog('info', `Respuesta del servidor recibida: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        // Mostrar logs del backend si están disponibles
        if (errorData.logs) {
          errorData.logs.forEach((log: any) => {
            addLog(log.type, log.message, log.details);
          });
        }
        addLog('error', `Error del servidor: ${response.status}`, errorData.error || errorData.details);
        throw new Error(errorData.error || errorData.details || "Error al auditar la URL");
      }

      addLog('success', 'Procesando resultados...');
      const auditResult = await response.json();
      
      // Mostrar logs detallados del backend
      if (auditResult.logs) {
        auditResult.logs.forEach((log: any) => {
          addLog(log.type, log.message, log.details);
        });
      }
      
      addLog('success', 'Auditoría completada exitosamente');
      addLog('info', `Entidad detectada: ${auditResult.entity}`);
      addLog('info', `Cobertura total: ${auditResult.totalCoverage.toFixed(1)}%`);
      addLog('info', `Consultas cubiertas: ${auditResult.queries.filter((q: any) => q.covered).length}/${auditResult.queries.length}`);
      
      setResult(auditResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      addLog('error', 'Error durante la auditoría', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAudit();
    }
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <>
      <Topbar />
      <div className="bg-[#F9F8FC] min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--primary)] flex">
        <SidebarMenu />
        <main className="flex-1 p-4">
          <div className="max-w-8xl mx-auto space-y-6">
            <Card className="bg-transparent shadow-none border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Auditoría de contenido en IA
                </CardTitle>
                <CardDescription>
                  Simula la visibilidad de una página en búsquedas por IA usando chunking estructurado y modelos de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Reemplazar el selector de modo de entrada por un diseño pill/tab */}
                  <div className="flex items-center mb-4">
                    <div className="flex bg-[#f5f5fa] rounded-full border border-gray-200 p-1 shadow-sm">
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 ${inputMode === 'url' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500 hover:text-black'}`}
                        onClick={() => setInputMode('url')}
                      >
                        Auditar por URL
                      </button>
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 ${inputMode === 'text' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500 hover:text-black'}`}
                        onClick={() => setInputMode('text')}
                      >
                        Auditar pegando texto
                      </button>
                    </div>
                  </div>

                  {/* Input de URL solo si inputMode === 'url' */}
                  {inputMode === 'url' && (
                    <Input
                      type="url"
                      placeholder="https://genially.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="mb-4"
                    />
                  )}

                  {/* Textarea solo si inputMode === 'text' */}
                  {inputMode === 'text' && (
                    <div className="mb-4">
                      <textarea
                        placeholder="Pega aquí el HTML completo de la página o documento (se mantendrán los headings, listas, etc.)"
                        value={manualText}
                        onChange={e => setManualText(e.target.value)}
                        className="w-full min-h-[120px] border rounded p-2 mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Pega el HTML completo del documento de Google. <a className="color:blue" href="https://www.docstomarkdown.pro/convert-google-docs-to-html/">Consigue el HTML con esta herramienta</a>. Si pegas HTML, se mantendrá la estructura (headings, listas, etc.).</span>
                        <button
                          type="button"
                          className="text-xs text-primary underline ml-2"
                          onClick={() => setManualText('')}
                        >
                          Limpiar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAudit} 
                      disabled={isLoading || (!url.trim() && !manualText.trim())}
                      className="min-w-[120px]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Auditando...
                        </>
                      ) : (
                        "Auditar"
                      )}
                    </Button>
                  </div>

                  {/* Logs en tiempo real */}
                  {logs.length > 0 && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Procesando...</CardTitle>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={clearLogs}
                            disabled={isLoading}
                          >
                            Limpiar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {logs.map((log) => (
                            <div 
                              key={log.id} 
                              className={`flex items-start gap-3 p-3 rounded-lg border ${getLogColor(log.type)}`}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {getLogIcon(log.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{log.message}</span>
                                  <span className="text-xs text-gray-500">
                                    {log.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                {log.details && (
                                  <div className="text-xs text-gray-600 mt-1 break-words">
                                    {log.details}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Error</p>
                          <p className="text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-6">
                      {/* Resumen */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Resumen de Auditoría</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-700">{result.entity}</div>
                              <div className="text-sm text-blue-600">Entidad Principal</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-700">
                                {result.totalCoverage.toFixed(1)}%
                              </div>
                              <div className="text-sm text-green-600">Cobertura Total</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-700">
                                {result.queries.filter(q => q.covered).length}/{result.queries.length}
                              </div>
                              <div className="text-sm text-purple-600">Consultas Cubiertas</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {result?.queries && (
                        <div className="mt-8">
                          <h2 className="text-xl font-bold mb-2">Consultas y cobertura ({result.totalCoverage.toFixed(1)}%)</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Consultas cubiertas */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Consultas cubiertas ({result.queries.filter(q => q.covered).length})</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc pl-5">
                                  {result.queries.filter(q => q.covered).map((q, idx) => (
                                    <li key={idx} className="mb-2">
                                      <span className="font-semibold">{q.query}</span>
                                      <details className="mt-1 text-xs">
                                        <summary className="cursor-pointer text-gray-500">Ver chunk relevante (similitud: {q.maxSimilarity.toFixed(2)})</summary>
                                        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap mt-1">{q.mostRelevantChunk}</pre>
                                      </details>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                            {/* Consultas NO cubiertas */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2"><XCircle className="text-red-500" /> Consultas NO cubiertas ({result.queries.filter(q => !q.covered).length})</CardTitle>
                              </CardHeader>
                              <CardContent>
                                {result.queries.filter(q => !q.covered).length > 0 ? (
                                  <ul className="list-disc pl-5">
                                    {result.queries.filter(q => !q.covered).map((q, idx) => (
                                      <li key={idx} className="mb-2 font-semibold text-red-700">{q.query}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500">¡Todas las consultas están cubiertas!</p>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}

                      {result?.chunks?.headings && result.chunks.headings.length > 0 && (
                        <div className="mt-8">
                          <h2 className="text-xl font-bold mb-2">Estructura de headings</h2>
                          <div className="bg-gray-50 p-4 rounded-lg border">
                            {result.chunks.headings.map((heading: string, idx: number) => {
                              const match = heading.match(/^(H[1-6]):\s*(.*)/);
                              if (match) {
                                const level = parseInt(match[1].replace('H', ''), 10);
                                const text = match[2];
                                return (
                                  <div key={idx} className="font-mono text-sm" style={{ marginLeft: `${(level - 1) * 20}px` }}>
                                    <span className="text-gray-400 font-bold">H{level}</span> <span className="ml-2 font-semibold">{text}</span>
                                  </div>
                                );
                              }
                              return (
                                <div key={idx} className="font-mono text-sm">
                                  <span className="text-gray-400 font-bold">H?</span> <span className="ml-2 font-semibold">{heading}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
} 