import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // J'ai retiré Navigate qui ne sert plus ici
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// IMPORT DE TES PAGES
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PulsiaLanding from "./pages/PulsiaLanding"; // Assure-toi que le chemin est bon !

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* --- CHANGEMENT ICI --- */}
            {/* Avant : Redirection forcée vers Login */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            
            {/* Maintenant : Affiche ta Landing Page Spline */}
            <Route path="/" element={<PulsiaLanding />} />

            {/* Les autres routes restent accessibles */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
