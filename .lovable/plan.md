

# Plano de Evolucao Completa da Interface Pato App

Este plano cobre as 10 areas solicitadas. A implementacao sera feita em etapas logicas, priorizando componentes reutilizaveis.

---

## Arquivos que serao criados

| Arquivo | Descricao |
|---------|-----------|
| `src/components/settings/ConnectionsTab.tsx` | Aba de conexoes com plataformas (Spotify, Steam, etc.) |
| `src/pages/GroupDetailPage.tsx` | Pagina interna de um grupo |
| `src/components/groups/CreateGroupModal.tsx` | Modal de criacao de grupo |
| `src/components/groups/GroupCard.tsx` | Card reutilizavel de grupo |
| `src/components/draw/RouletteWheel.tsx` | Componente de roleta 2D funcional |

## Arquivos que serao editados

| Arquivo | Mudancas |
|---------|----------|
| `src/components/layout/LeftSidebar.tsx` | Adicionar botao de recolher/expandir, transicoes animadas, modo icone |
| `src/components/layout/AppLayout.tsx` | Suportar sidebar recolhivel com estado |
| `src/components/layout/RightSidebar.tsx` | Adicionar acoes nos amigos online (chat, ocultar, desfazer amizade) via dropdown |
| `src/pages/SettingsPage.tsx` | Adicionar secao "Conexoes" com cards de plataformas |
| `src/pages/GroupsPage.tsx` | Refazer com grid 3 colunas, cards visuais, busca, modal criar grupo, link para pagina interna |
| `src/pages/ChallengesPage.tsx` | Remover barra de progresso, adicionar estados feito/em andamento/descartado com chips |
| `src/pages/QuacksPage.tsx` | Mover grafico de resumo para o final da pagina |
| `src/pages/DrawPage.tsx` | Adicionar roleta 2D funcional na aba Roleta |
| `src/components/profile/AvatarCustomizeModal.tsx` | Remover acessorios, reformular para skins de pato de borracha com cores |
| `src/App.tsx` | Adicionar rota `/groups/:id` |
| `src/index.css` | Refinar utilitarios globais (transicoes sidebar, hover states) |

---

## Detalhes por Feature

### 1. Configuracoes — Aba "Conexoes"
- Adicionar item `{ id: "connections", label: "Conexoes", icon: Link2 }` na sidebar de settings
- Criar `ConnectionsTab.tsx` com grid de cards (2 colunas) para cada plataforma
- Cada card: icone colorido da plataforma (usando emojis/lucide como fallback), nome, badge de status (Conectado/Nao conectado), botao Conectar/Desconectar
- Estado local para toggle de conexao com toast de feedback
- Plataformas: Spotify, Instagram, YouTube, Steam, Epic Games, Crunchyroll, Blizzard, Xbox, GitHub, X (Twitter), Pinterest, Twitch

### 2. Grupos — Grid visual
- Refazer `GroupsPage.tsx` com barra de pesquisa no topo
- Grid `grid-cols-3` de `GroupCard` com: emoji/avatar de capa, titulo, descricao, membros, posts, badge publico/privado, botao "Entrar"
- Secao lateral ou acima mostrando "Meus Grupos"
- `CreateGroupModal.tsx`: dialog com campos nome, descricao, tipo (publico/privado), categoria, botao criar

### 3. Pagina interna do Grupo
- Nova rota `/groups/:id` com `GroupDetailPage.tsx`
- Capa, avatar, nome, descricao, lista de membros, feed de posts, badge publico/privado, botao "Sair do grupo"
- Navegacao de volta para lista de grupos

### 4. Menu lateral recolhivel
- Adicionar estado `collapsed` no `LeftSidebar` (ou via context em `AppLayout`)
- Botao seta/chevron no topo da sidebar para toggle
- Quando recolhido: `w-16`, apenas icones centralizados, tooltip no hover
- Transicao `transition-all duration-300`
- `AppLayout` ajusta `main-content` conforme largura da sidebar

### 5. Desafios — Novo sistema de status
- Remover `<Progress>` bar e checkmarks da secao "Seu Progresso"
- Em cada challenge card, adicionar 3 botoes/chips: "Feito", "Em andamento", "Descartar"
- Estado local por desafio: `Record<number, 'done' | 'in_progress' | 'discarded'>`
- Ao marcar "Feito": XP computado, badge verde. "Descartado": card some com animacao. "Em andamento": aparece no perfil (mock)
- Chips com cores distintas: verde (feito), amarelo (em andamento), vermelho (descartado)

### 6. Quacks — Grafico no final
- Mover `<QuackSummaryChart />` de dentro do grid lateral para abaixo da lista de quacks
- Layout: lista de quacks full-width, depois grafico em secao separada no final

### 7. Roleta funcional
- Criar `RouletteWheel.tsx`: canvas ou CSS-based wheel
- Componente com: input para adicionar opcoes, lista de opcoes com botao remover, botao "Girar", animacao de rotacao CSS (`transform: rotate(Xdeg)` com transition), ponteiro fixo no topo, resultado destacado em modal/toast
- Logica: sortear indice aleatorio, calcular angulo final, animar com `ease-out` por ~3s
- Integrar na aba "Roleta" do `DrawPage.tsx`

### 8. Sidebar direita — Acoes nos amigos
- Em cada item de amigo online, adicionar icone de `MoreVertical` que abre dropdown
- Opcoes: "Chamar para chat", "Ocultar", "Desfazer amizade"
- Usar `DropdownMenu` do shadcn
- Toast de feedback ao clicar

### 9. Avatar — Pato de borracha
- Remover secao de "Acessorios" do `AvatarCustomizeModal`
- Manter secao de cores/skins expandida
- Renomear cores com nomes divertidos (ex: "Pato Classico", "Pato Rosa", "Pato Galaxia")
- Ao selecionar cor, aplicar um overlay colorido no preview do pato (CSS filter ou tint)
- Remover variavel `selectedAccessory` e toda logica relacionada

### 10. Polish geral
- Adicionar `transition-all duration-200` em todos os nav-items
- Hover scale sutil nos cards (ja existe `pato-btn-bounce`, reforcar)
- Garantir `animate-fade-in` em todas as transicoes de tab/secao
- Espacamento consistente (`space-y-6`, `gap-4`)

---

## Ordem de implementacao

1. Layout core: sidebar recolhivel + AppLayout
2. Settings Conexoes tab
3. Grupos (page + card + modal + detail page)
4. Desafios novo sistema
5. Quacks reordenacao
6. Roleta funcional
7. Right sidebar acoes
8. Avatar reformulacao
9. Polish geral

