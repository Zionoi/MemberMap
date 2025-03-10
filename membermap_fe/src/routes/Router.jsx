// src/routes/Router.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/DashboardPage";
import MapPage from "../pages/MapPage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/map" element={<MapPage />} />
  </Routes>
);

export default AppRouter;
