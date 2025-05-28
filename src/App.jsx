
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Bookings from "@/pages/Bookings";
import Destinations from "@/pages/Destinations";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import { initializeData } from "@/lib/data";

const App = () => {
  // Initialize data when the app loads
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
