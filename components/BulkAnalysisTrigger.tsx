'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, Play, Layers } from 'lucide-react';
import { analyzeKeyword, getCSVKeywords } from '@/app/actions/analyze-keyword';
import { toast } from 'sonner';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function BulkAnalysisTrigger() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [keywords, setKeywords] = useState<{ keyword: string; prompt: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentKeyword, setCurrentKeyword] = useState('');

    useEffect(() => {
        if (open) {
            getCSVKeywords().then(setKeywords);
        }
    }, [open]);

    const handleBulkAnalyze = async () => {
        if (keywords.length === 0) return;

        setLoading(true);
        setCurrentIndex(0);
        const batchId = `bulk_${new Date().getTime()}`;

        toast.info(`Iniciando análisis de ${keywords.length} queries...`);

        for (let i = 0; i < keywords.length; i++) {
            const item = keywords[i];
            setCurrentIndex(i + 1);
            setCurrentKeyword(item.prompt);

            try {
                // Enviamos tanto el Cluster (keyword) como la consulta real (prompt)
                await analyzeKeyword(item.keyword, item.prompt, batchId);
            } catch (error) {
                console.error(`Error analizando "${item.prompt}":`, error);
                // Continuamos con la siguiente aunque una falle
            }
        }

        toast.success(`¡Análisis completado! Se han procesado ${keywords.length} queries.`);
        setLoading(false);
        setCurrentKeyword('');
        // No cerramos automáticamente para que vea el resumen final si quiere
    };

    const [isLocal, setIsLocal] = useState(false);

    useEffect(() => {
        setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    }, []);

    return (
        <TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                {!isLocal ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-full">
                                <Button 
                                    variant="ghost" 
                                    disabled 
                                    className="w-full gap-3 justify-start px-2 py-2 font-semibold text-white bg-slate-400 opacity-50 cursor-not-allowed text-sm"
                                >
                                    <Layers className="w-5 h-5 text-white" /> Ejecutar Análisis
                                </Button>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Solo puede correr el informe francis@genially.com</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full gap-3 justify-start px-2 py-2 font-semibold text-white bg-slate-500 text-sm hover:bg-slate-600 hover:text-white">
                            <Layers className="w-5 h-5 text-white" /> Ejecutar Análisis
                        </Button>
                    </DialogTrigger>
                )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Análisis en Bulk</DialogTitle>
                    <DialogDescription>
                        Esto ejecutará un análisis completo para las queries configuradas en el archivo CSV.
                        El proceso puede tardar varios minutos ya que se consultan múltiples IAs para cada query.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Queries del lote: {keywords.length}</p>
                        {loading && (
                            <span className="text-xs font-bold text-orange-600 animate-pulse">
                                {currentIndex} / {keywords.length}
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 space-y-2 overflow-hidden">
                            <p className="text-[10px] uppercase font-bold text-orange-400">Procesando ahora:</p>
                            <p className="text-sm font-medium text-orange-900 leading-relaxed break-words line-clamp-2" title={currentKeyword}>
                                {currentKeyword}
                            </p>
                            <div className="pt-1">
                                <div className="w-full bg-orange-200 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-orange-600 h-full transition-all duration-500 ease-in-out"
                                        style={{ width: `${(currentIndex / keywords.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : keywords.length > 0 ? (
                        <ul className="text-xs text-muted-foreground list-disc pl-5 max-h-40 overflow-y-auto">
                            {keywords.slice(0, 5).map((kw, i) => <li key={i}>{kw.prompt}</li>)}
                            {keywords.length > 5 && <li className="list-none italic">... + {keywords.length - 5} más</li>}
                        </ul>
                    ) : (
                        <p className="text-xs italic text-muted-foreground text-center">Cargando lista desde CSV...</p>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleBulkAnalyze} disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                        {loading ? 'Procesando Lote...' : 'Comenzar Lote'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </TooltipProvider>
    );
}
