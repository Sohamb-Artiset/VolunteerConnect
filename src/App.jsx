import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import Organizations from "./pages/Organizations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NGOSignIn from "./pages/NGOSignIn";
import NGORegister from "./pages/NGORegister";
import Dashboard from "./pages/Dashboard";
import GetStarted from "./pages/GetStarted";
import OpportunityDetail from "./pages/OpportunityDetail";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/opportunities" element={<Opportunities />} />
                  <Route path="/opportunities/:id" element={<OpportunityDetail />} />
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/ngo-signin" element={<NGOSignIn />} />
                  <Route path="/ngo-register" element={<NGORegister />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;