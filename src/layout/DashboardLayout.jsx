import React, { Children } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex"
    >
      <Sidebar className="fixed overflow-hidden" />
      <div className="w-[20%] h-full"></div>
      <div className="w-[80%]">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
