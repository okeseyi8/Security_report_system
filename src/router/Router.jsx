import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import CriminalInfo from "../screens/CriminalInfo";
import MainDashboard from "../screens/MainDashboard";
import Report from "../screens/Report";
import AddCrimianl from "../screens/AddCrimianl";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { useAuthStore } from "../store/useAuthStore";

const Router = () => {
    const user = useAuthStore((s) => s.user
    )
    const indexElement =
    user?.userType === "Civilian" ? (
      <Navigate to="/srs-dashboard/report" />
    ) : (
      <MainDashboard />
    );

  return (
    <Routes>
 
        <Route path="/" element={<Home />} />
    
     
      <Route path="/srs-dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
       <Route index element={indexElement} />
       
        <Route path="report" element={<Report />} />
        <Route path="criminalinfo" element={<CriminalInfo />} />
        <Route path="addcriminal" element={<AddCrimianl />}/>
        
      </Route>
    </Routes>
  );
};

export default Router;
