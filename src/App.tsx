import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Nominees from "./pages/Nominees";
import Insurance from "./pages/Insurance";
import Banking from "./pages/Banking";
import Medical from "./pages/Medical";
import Properties from "./pages/Properties";
import Pins from "./pages/Pins";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/dashboard/nominees" element={<ProtectedRoute><Nominees /></ProtectedRoute>} />
            <Route path="/dashboard/insurance" element={<ProtectedRoute><Insurance /></ProtectedRoute>} />
            <Route path="/dashboard/banking" element={<ProtectedRoute><Banking /></ProtectedRoute>} />
            <Route path="/dashboard/medical" element={<ProtectedRoute><Medical /></ProtectedRoute>} />
            <Route path="/dashboard/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
            <Route path="/dashboard/pins" element={<ProtectedRoute><Pins /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
