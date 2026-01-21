'use client';

import { useState, useEffect } from 'react';
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
import { Loader2, Beaker, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeKeyword } from '@/app/actions/analyze-keyword';
import { toast } from 'sonner';

export function TestAllModelsTrigger() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [isLocal, setIsLocal] = useState(false);

    useEffect(() => {
        setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    }, []);

    const testPrompts = [
        "What are the best interactive presentation tools in 2024?",
        "Compare Genially vs Canva for educational content",
        "Top AI tools for creating interactive infographics",
        "Best platforms for gamified learning experiences"
    ];

    const handleTest = async () => {
        setLoading(true);
        setResults([]);
        const randomPrompt = testPrompts[Math.floor(Math.random() * testPrompts.length)];
        const batchId = `test_${Date.now()}`;

        toast.info(`Probando todas las IAs con: "${randomPrompt}"`);

        try {
            const outcome = await analyzeKeyword("Test-Cluster", randomPrompt, batchId, true);
            if (outcome.success) {
                setResults(outcome.results || []);
                toast.success("Prueba completada con éxito");
            } else {
                toast.error("Error en la prueba: " + outcome.error);
            }
        } catch (error: any) {
            toast.error("Error inesperado: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isLocal) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full gap-3 justify-start px-2 py-2 font-semibold text-primary hover:bg-accent hover:rounded-xl text-sm">
                    <Beaker className="w-5 h-5 text-primary" /> Probar Conexión IAs
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Test de Conexión Multi-IA</DialogTitle>
                    <DialogDescription>
                        Esto lanzará una consulta real a todas las IAs configuradas (ChatGPT, Gemini y SearchGPT) para verificar que responden correctamente.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Consultando a los oráculos...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-2">
                            <p className="text-sm font-bold mb-2">Resultados del test:</p>
                            {results.map((res, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${res.success ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <div className="flex items-center gap-3">
                                        {res.success ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                                        <span className="text-sm font-medium font-mono">{res.client}</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                        {res.success ? 'Respuesta OK' : 'Error'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 border-2 border-dashed rounded-xl">
                            <p className="text-xs text-muted-foreground uppercase font-bold">Sin datos de prueba</p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                        Cerrar
                    </Button>
                    <Button onClick={handleTest} disabled={loading} className="bg-primary text-white">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Beaker className="mr-2 h-4 w-4" />}
                        {loading ? 'Consultando...' : 'Lanzar Test Aleatorio'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
