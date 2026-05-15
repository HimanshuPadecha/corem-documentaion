/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import DocsPage from "./pages/DocsPage";
import ExamplesPage from "./pages/ExamplesPage";
import { useEffect } from "react";

function AppRoutes() {
  const location = useLocation();
  
  return (
    <Routes location={location}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/docs/:slug" element={<DocsPage />} />
      <Route path="/examples" element={<ExamplesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  // Ensure dark mode is active
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary flex flex-col relative">
        <div className="z-50 shrink-0">
          <Navbar />
        </div>
        <AppRoutes />
        <Toaster position="bottom-right" expand={false} richColors />
      </div>
    </Router>
  );
}
