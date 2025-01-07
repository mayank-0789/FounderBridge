import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Index";
import { DeveloperSignup } from './pages/DeveloperSignup';
import RecruiterSignup from "./pages/RecruiterSignup";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup/candidate" element={<DeveloperSignup />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />

        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;