import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import LoadingPage from "./pages/LoadingPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ListsPage from "./pages/ListsPage";
import QuacksPage from "./pages/QuacksPage";
import DrawPage from "./pages/DrawPage";
import GroupsPage from "./pages/GroupsPage";
import ChallengesPage from "./pages/ChallengesPage";
import MemoriesPage from "./pages/MemoriesPage";
import RankingPage from "./pages/RankingPage";
import PatoVidentePage from "./pages/PatoVidentePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lists" element={<ListsPage />} />
          <Route path="/quacks" element={<QuacksPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/pato-vidente" element={<PatoVidentePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
