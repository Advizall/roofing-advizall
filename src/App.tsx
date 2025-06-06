import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Run the update-contact-tables function once when the app loads
    const updateTables = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("update-contact-tables");
        if (error) {
          console.error("Error updating tables:", error);
        } else {
          console.log("Tables updated successfully:", data);
        }
      } catch (err) {
        console.error("Failed to invoke function:", err);
      }
    };
    updateTables();
  }, []);

  useEffect(() => {
    const protectedRoutes = ['/client-dashboard', '/admin-dashboard'];
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        !session &&
        protectedRoutes.includes(location.pathname)
      ) {
        navigate('/login');
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
