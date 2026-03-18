import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import CreateQuackModal, { type QuackData } from "@/components/quack/CreateQuackModal";
import QuackCard from "@/components/quack/QuackCard";
import QuackSummaryChart from "@/components/quack/QuackSummaryChart";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusFilters = ["Todos", "Publicados", "Rascunhos"] as const;

const QuacksPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [quacks, setQuacks] = useState<QuackData[]>([
    {
      id: "demo-1",
      title: "Preparando PPT da noite de apresentações",
      description: "Vamos fazer uma noite de PPT na casa do Lucas, cada um apresenta um tema aleatório 🎤",
      category: "evento",
      startDate: new Date(2026, 2, 20),
      endDate: new Date(2026, 2, 20),
      taggedFriends: [{ id: 2, name: "QuackQueen", username: "@quackqueen" }],
      progress: 65,
      status: "published",
      updates: [
        { text: "Escolhi o tema: 'Por que patos são superiores' 🦆", date: new Date(2026, 2, 16) },
        { text: "Slides ficando lindos!", date: new Date(2026, 2, 17) },
      ],
      createdAt: new Date(2026, 2, 15),
    },
    {
      id: "demo-2",
      title: "Maratona de Attack on Titan",
      description: "Última temporada, sem spoilers!",
      category: "role",
      startDate: new Date(2026, 2, 18),
      taggedFriends: [
        { id: 3, name: "PatoNinja", username: "@patoninja" },
        { id: 4, name: "DuckMaster", username: "@duckmaster" },
      ],
      progress: 30,
      status: "published",
      updates: [],
      createdAt: new Date(2026, 2, 14),
    },
    {
      id: "demo-3",
      title: "Estudar React Native",
      description: "Quero criar um app de patos",
      category: "estudo",
      taggedFriends: [],
      progress: 0,
      status: "draft",
      updates: [],
      createdAt: new Date(2026, 2, 17),
    },
  ]);
  const [activeFilter, setActiveFilter] = useState<(typeof statusFilters)[number]>("Todos");
  const [editingQuack, setEditingQuack] = useState<QuackData | null>(null);

  const filtered = quacks.filter((q) => {
    if (activeFilter === "Publicados") return q.status === "published";
    if (activeFilter === "Rascunhos") return q.status === "draft";
    return true;
  });

  const handleSave = (quack: QuackData) => {
    setQuacks((prev) => [quack, ...prev]);
    toast.success(quack.status === "draft" ? "Quack salvo como rascunho! 📝" : "Quack publicado! 🦆🎉");
  };

  const handleDelete = (id: string) => {
    setQuacks((prev) => prev.filter((q) => q.id !== id));
    toast.success("Quack excluído com sucesso 💨");
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    setQuacks((prev) => prev.map((q) => (q.id === id ? { ...q, progress } : q)));
  };

  const handleAddUpdate = (id: string, text: string) => {
    setQuacks((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, updates: [...q.updates, { text, date: new Date() }] } : q
      )
    );
    toast.success("Atualização adicionada! ✨");
  };

  const handlePublish = (id: string) => {
    setQuacks((prev) => prev.map((q) => (q.id === id ? { ...q, status: "published" as const } : q)));
    toast.success("Quack publicado! 🦆🎉");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Meus Quacks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Compartilhe o que você está fazendo agora 🦆
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md glow-pink"
          >
            <Plus className="w-4 h-4" />
            Criar Quack
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "tag-pill py-1.5 px-4 text-sm transition-all",
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
          <span className="tag-pill bg-muted text-muted-foreground py-1.5 px-3 text-sm ml-auto">
            {filtered.length} quack{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quack cards */}
          <div className="lg:col-span-2 space-y-4">
            {filtered.length === 0 ? (
              <div className="pato-card text-center py-12">
                <p className="text-4xl mb-3">🦆</p>
                <p className="font-display font-bold text-lg">Nenhum quack ainda!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Crie seu primeiro quack e compartilhe o que está fazendo.
                </p>
              </div>
            ) : (
              filtered.map((q, i) => (
                <div key={q.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <QuackCard
                    quack={q}
                    onEdit={setEditingQuack}
                    onDelete={handleDelete}
                    onUpdateProgress={handleUpdateProgress}
                    onAddUpdate={handleAddUpdate}
                    onPublish={handlePublish}
                  />
                </div>
              ))
            )}
          </div>

          {/* Summary sidebar */}
          <div className="space-y-4">
            <QuackSummaryChart />
          </div>
        </div>
      </div>

      <CreateQuackModal open={showCreate} onClose={() => setShowCreate(false)} onSave={handleSave} />
    </AppLayout>
  );
};

export default QuacksPage;
