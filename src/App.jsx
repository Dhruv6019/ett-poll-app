import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FrontendPollPage from "./pages/FrontendPollPage";
import BackendPollPage from "./pages/BackendPollPage";
import DevToolsPollPage from "./pages/DevToolsPollPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./LoadingScreen"; // ✅ import loading screen

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading will last until 100 (~5s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {loading ? (
          <LoadingScreen /> // ✅ Show animated loading screen
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/frontend-poll" element={<FrontendPollPage />} />
              <Route path="/backend-poll" element={<BackendPollPage />} />
              <Route path="/devtools-poll" element={<DevToolsPollPage />} />
              <Route path="/results/:pollType" element={<ResultsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
