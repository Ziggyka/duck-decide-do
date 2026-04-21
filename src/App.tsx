import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import ChatPage from "./pages/ChatPage";
import AchievementsPage from "./pages/AchievementsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: JSX.Element }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/" element={<Protected><FeedPage /></Protected>} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="/lists" element={<Protected><ListsPage /></Protected>} />
            <Route path="/quacks" element={<Protected><QuacksPage /></Protected>} />
            <Route path="/draw" element={<Protected><DrawPage /></Protected>} />
            <Route path="/groups" element={<Protected><GroupsPage /></Protected>} />
            <Route path="/challenges" element={<Protected><ChallengesPage /></Protected>} />
            <Route path="/achievements" element={<Protected><AchievementsPage /></Protected>} />
            <Route path="/memories" element={<Protected><MemoriesPage /></Protected>} />
            <Route path="/ranking" element={<Protected><RankingPage /></Protected>} />
            <Route path="/pato-vidente" element={<Protected><PatoVidentePage /></Protected>} />
            <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
            <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
            <Route path="/notifications" element={<Protected><NotificationsPage /></Protected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
