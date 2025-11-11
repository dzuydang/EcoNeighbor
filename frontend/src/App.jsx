import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import WasteCenters from "./pages/WasteCenters";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/wastecenters" element={<WasteCenters />} />
    </Routes>
  );
}

export default App;
