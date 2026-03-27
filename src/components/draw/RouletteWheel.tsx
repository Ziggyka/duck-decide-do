import { useState, useRef } from "react";
import { Plus, X, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const COLORS = [
  "hsl(316,100%,45%)", "hsl(46,100%,49%)", "hsl(142,71%,45%)",
  "hsl(220,70%,55%)", "hsl(0,84%,60%)", "hsl(280,70%,55%)",
  "hsl(180,60%,45%)", "hsl(38,92%,50%)",
];

const RouletteWheel = () => {
  const [options, setOptions] = useState<string[]>(["Filme", "Restaurante", "Jogo", "Passeio"]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  const addOption = () => {
    if (!input.trim()) return;
    if (options.length >= 12) { toast.error("Máximo 12 opções!"); return; }
    setOptions(prev => [...prev, input.trim()]);
    setInput("");
  };

  const removeOption = (i: number) => setOptions(prev => prev.filter((_, idx) => idx !== i));

  const spin = () => {
    if (options.length < 2) { toast.error("Adicione pelo menos 2 opções!"); return; }
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    // Calculate final angle so the winning slice is at top (pointer position)
    const targetAngle = 360 - (winIndex * sliceAngle + sliceAngle / 2);
    const totalRotation = rotation + 360 * 5 + targetAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(options[winIndex]);
      toast.success(`🎉 Resultado: ${options[winIndex]}!`);
    }, 3500);
  };

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  const getSlicePath = (index: number, total: number) => {
    const angle = (2 * Math.PI) / total;
    const startAngle = index * angle - Math.PI / 2;
    const endAngle = startAngle + angle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getTextPos = (index: number, total: number) => {
    const angle = (2 * Math.PI) / total;
    const mid = index * angle + angle / 2 - Math.PI / 2;
    return { x: cx + (r * 0.6) * Math.cos(mid), y: cy + (r * 0.6) * Math.sin(mid), angle: (mid * 180) / Math.PI };
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {/* Wheel */}
        <div className="flex flex-col items-center gap-4">
          {/* Pointer */}
          <div className="relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-primary drop-shadow-md" />
            <svg
              ref={wheelRef}
              width={size}
              height={size}
              className="drop-shadow-lg"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              }}
            >
              {options.map((opt, i) => {
                const pos = getTextPos(i, options.length);
                return (
                  <g key={i}>
                    <path d={getSlicePath(i, options.length)} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth="2" />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontWeight="bold"
                      fontSize={options.length > 6 ? 10 : 12}
                      transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                      className="pointer-events-none"
                    >
                      {opt.length > 12 ? opt.slice(0, 11) + "…" : opt}
                    </text>
                  </g>
                );
              })}
              <circle cx={cx} cy={cy} r="18" fill="hsl(var(--card))" stroke="white" strokeWidth="3" />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="16">🦆</text>
            </svg>
          </div>

          <button
            onClick={spin}
            disabled={spinning || options.length < 2}
            className="pato-btn-bounce bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold text-sm disabled:opacity-50 glow-pink"
          >
            {spinning ? "Girando..." : "🎰 Girar!"}
          </button>

          {result && !spinning && (
            <div className="pato-card text-center p-4 border-primary/40 glow-duck animate-bounce-in">
              <p className="text-xs text-muted-foreground mb-1">Resultado:</p>
              <p className="font-display font-bold text-xl text-primary">{result} 🎉</p>
            </div>
          )}
        </div>

        {/* Options panel */}
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
              placeholder="Adicionar opção..."
              className="rounded-xl"
            />
            <button onClick={addOption} className="pato-btn-bounce bg-primary text-primary-foreground px-3 rounded-xl">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-sm flex-1">{opt}</span>
                <button onClick={() => removeOption(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {options.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Adicione opções para girar a roleta!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
