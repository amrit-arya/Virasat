import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<Upload />} />
          <Route path="/dashboard/nominees" element={<Nominees />} />
          <Route path="/dashboard/insurance" element={<Insurance />} />
          <Route path="/dashboard/banking" element={<Banking />} />
          <Route path="/dashboard/medical" element={<Medical />} />
          <Route path="/dashboard/properties" element={<Properties />} />
          <Route path="/dashboard/pins" element={<Pins />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
