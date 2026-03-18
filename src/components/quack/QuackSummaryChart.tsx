import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from "recharts";

const summaryData = [
  { category: "Filmes", count: 18 },
  { category: "Jogos", count: 15 },
  { category: "Séries", count: 12 },
  { category: "Eventos", count: 8 },
  { category: "Estudos", count: 10 },
  { category: "Rolês", count: 6 },
  { category: "Projetos", count: 9 },
  { category: "Restaurantes", count: 3 },
];

const QuackSummaryChart = () => {
  return (
    <div className="pato-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📊</span>
        <h3 className="font-display font-bold text-base">Resumo dos Quacks</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Veja quais categorias você mais quackou! 🦆
      </p>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={summaryData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 20]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Quacks"
              dataKey="count"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {summaryData.map((d) => (
          <div key={d.category} className="text-center">
            <p className="text-lg font-bold text-foreground">{d.count}</p>
            <p className="text-[10px] text-muted-foreground">{d.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuackSummaryChart;
