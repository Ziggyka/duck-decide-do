import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ListsPage from "./pages/ListsPage";
import DrawPage from "./pages/DrawPage";
import GroupsPage from "./pages/GroupsPage";
import InventoryPage from "./pages/InventoryPage";
import MemoriesPage from "./pages/MemoriesPage";
import RankingPage from "./pages/RankingPage";
import PatoVidentePage from "./pages/PatoVidentePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lists" element={<ListsPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/pato-vidente" element={<PatoVidentePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
