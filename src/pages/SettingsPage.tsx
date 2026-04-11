import { useState } from "react";
import { User, Shield, Lock, Bell, Eye, Palette, Database, AlertTriangle, ExternalLink, Globe, Clock, Monitor, Moon, Sun, Link2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import ConnectionsTab from "@/components/settings/ConnectionsTab";

const sections = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "account", label: "Conta", icon: Globe },
  { id: "connections", label: "Conexões", icon: Link2 },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "privacy", label: "Privacidade", icon: Lock },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "accessibility", label: "Acessibilidade", icon: Palette },
  { id: "data", label: "Dados e Atividade", icon: Database },
  { id: "danger", label: "Conta", icon: AlertTriangle },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
  };

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl mb-6">⚙️ Configurações</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === s.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeSection === "profile" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Perfil</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome completo</Label>
                    <Input placeholder="Seu nome" className="rounded-xl" defaultValue="QuackMaster" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome de usuário</Label>
                    <Input placeholder="@username" className="rounded-xl" defaultValue="@quackmaster" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea placeholder="Conte sobre você..." className="rounded-xl resize-none" rows={3} defaultValue="Explorando o mundo uma atividade por vez! 🌍" />
                  </div>
                  <div className="space-y-2">
                    <Label>Link externo</Label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="https://seusite.com" className="rounded-xl pl-10" />
                    </div>
                  </div>
                  <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold pato-btn-bounce">
                    Salvar alterações
                  </button>
                </div>
              </div>
            )}

            {activeSection === "connections" && <ConnectionsTab />}

            {activeSection === "account" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Conta</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" className="rounded-xl" defaultValue="quack@pato.app" />
                  </div>
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select defaultValue="pt-br">
                      <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuso horário</Label>
                    <Select defaultValue="brt">
                      <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brt">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="est">Eastern (GMT-5)</SelectItem>
                        <SelectItem value="pst">Pacific (GMT-8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold pato-btn-bounce">
                    Salvar alterações
                  </button>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Segurança</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Senha atual</Label>
                    <Input type="password" className="rounded-xl" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nova senha</Label>
                    <Input type="password" className="rounded-xl" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar nova senha</Label>
                    <Input type="password" className="rounded-xl" placeholder="••••••••" />
                  </div>
                  <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold pato-btn-bounce">
                    Alterar senha
                  </button>
                </div>
                <div className="border-t border-border pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Autenticação em dois fatores</p>
                      <p className="text-xs text-muted-foreground">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Sessões ativas</p>
                      <p className="text-xs text-muted-foreground">2 dispositivos conectados</p>
                    </div>
                    <button className="text-xs text-destructive font-medium hover:underline">Encerrar outras sessões</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Privacidade</h2>
                <div className="space-y-4">
                  {[
                    { label: "Conta privada", desc: "Apenas seguidores aprovados veem seu conteúdo" },
                    { label: "Quem pode ver publicações", desc: "Todos / Amigos / Ninguém" },
                    { label: "Quem pode comentar", desc: "Todos / Amigos" },
                    { label: "Quem pode enviar mensagens", desc: "Todos / Amigos / Ninguém" },
                    { label: "Quem pode marcar você", desc: "Todos / Amigos / Ninguém" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch />
                    </div>
                  ))}
                  <button className="text-sm text-destructive font-medium hover:underline">
                    Gerenciar usuários bloqueados →
                  </button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Notificações</h2>
                <div className="space-y-4">
                  {[
                    { label: "Notificações push", desc: "Receba alertas no navegador" },
                    { label: "Notificações por email", desc: "Receba resumos por email" },
                    { label: "Curtidas", desc: "Quando alguém curtir seu post" },
                    { label: "Comentários", desc: "Quando alguém comentar" },
                    { label: "Novos seguidores", desc: "Quando alguém te seguir" },
                    { label: "Menções", desc: "Quando for mencionado" },
                    { label: "Mensagens", desc: "Novas mensagens diretas" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            )}


            {activeSection === "data" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display">Dados e Atividade</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Baixar dados da conta</p>
                      <p className="text-xs text-muted-foreground">Receba uma cópia de todos os seus dados</p>
                    </div>
                    <button className="text-sm text-primary font-medium hover:underline">Solicitar</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Atividade recente</p>
                      <p className="text-xs text-muted-foreground">Veja seu histórico de ações</p>
                    </div>
                    <button className="text-sm text-primary font-medium hover:underline">Ver →</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Permissões e uso de dados</p>
                      <p className="text-xs text-muted-foreground">Gerencie como seus dados são usados</p>
                    </div>
                    <button className="text-sm text-primary font-medium hover:underline">Gerenciar →</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "danger" && (
              <div className="pato-card p-6 space-y-5 animate-fade-in">
                <h2 className="text-lg font-display text-destructive">Zona de Perigo</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="text-sm font-semibold">Desativar conta temporariamente</p>
                      <p className="text-xs text-muted-foreground">Sua conta ficará invisível até reativar</p>
                    </div>
                    <button className="text-sm text-warning font-medium border border-warning/30 px-4 py-1.5 rounded-xl hover:bg-warning/10 transition-colors">
                      Desativar
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                    <div>
                      <p className="text-sm font-semibold text-destructive">Excluir conta permanentemente</p>
                      <p className="text-xs text-muted-foreground">Esta ação não pode ser desfeita</p>
                    </div>
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="text-sm text-destructive-foreground font-medium bg-destructive px-4 py-1.5 rounded-xl hover:opacity-90 transition-opacity">
                          Excluir conta
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-destructive">⚠️ Excluir conta permanentemente</DialogTitle>
                          <DialogDescription>
                            Esta ação é irreversível. Todos os seus dados, posts, listas, conquistas e amizades serão permanentemente removidos.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-2">
                          <div className="p-3 rounded-xl bg-destructive/10 text-sm text-destructive">
                            <p className="font-semibold mb-1">Você perderá:</p>
                            <ul className="list-disc list-inside text-xs space-y-1">
                              <li>Todas as atividades e avaliações</li>
                              <li>Listas e conquistas</li>
                              <li>Amigos e grupos</li>
                              <li>Inventário de itens</li>
                              <li>Nível e XP acumulados</li>
                            </ul>
                          </div>
                          <Input placeholder="Digite 'EXCLUIR' para confirmar" className="rounded-xl" />
                          <div className="flex gap-3">
                            <button onClick={() => setDeleteDialogOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                              Cancelar
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                              Excluir permanentemente
                            </button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
