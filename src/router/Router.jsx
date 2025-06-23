import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import CriminalInfo from "../screens/CriminalInfo";
import MainDashboard from "../screens/MainDashboard";
import Report from "../screens/Report";
import AddCrimianl from "../screens/AddCrimianl";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
Report
const Router = () => {
  return (
    <Routes>
 
        <Route path="/" element={<Home />} />
    
     
      <Route path="/srs-dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<MainDashboard />} />
        <Route path="report" element={<Report />} />
        <Route path="criminalinfo" element={<CriminalInfo />} />
        <Route path="addcriminal" element={<AddCrimianl />}/>
        
      </Route>
    </Routes>
  );
};

export default Router;
