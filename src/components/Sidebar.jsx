import React from "react";
import { FaHandcuffs } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { GiSiren } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Dashboard from "../pages/Dashboard";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const logout  = useAuthStore((s) => s.logout)
  console.log(location.pathname);
  return (
    <div className=" fixed w-[20%] bg-[#262D35] h-[150vh] pt-[30px] pl-[20px]">
      <div className="flex items-center gap-4">
        <img className="w-[50px] " src="/images/mililogo.png" />
        <h1 className="text-white font-semibold">Security Report System</h1>
      </div>
      <div className="mt-10">
        <ul>
          <li className="relative flex gap-3 items-center h-[50px]">
            <MdDashboard
              className={`text-[22px] ${
                location.pathname === "/srs-dashboard"
                  ? "text-[#FF6C2F]"
                  : "text-[#5d7186]"
              }`}
            />
            <button
              className={`font-medium ${
                location.pathname === "/srs-dashboard"
                  ? "text-[#fff]"
                  : "text-[#5d7186]"
              }`}
            >
              <NavLink to="/srs-dashboard">Dashboard</NavLink>
            </button>
            {location.pathname === "/srs-dashboard" && (
              <div className="absolute -left-[20px] h-full bg-[#FF6C2F] w-[3px]"></div>
            )}
          </li>

          <li className="relative flex gap-3 items-center h-[50px]">
            <GiSiren
              className={`text-[24px] ${
                location.pathname === "/srs-dashboard/report"
                  ? "text-[#FF6C2F]"
                  : "text-[#5d7186]"
              }`}
            />
            <button
              className={`font-medium ${
                location.pathname === "/srs-dashboard/report"
                  ? "text-[#fff]"
                  : "text-[#5d7186]"
              }`}
            >
              <NavLink to="/srs-dashboard/report">
                Report Security Threat
              </NavLink>
            </button>
            {location.pathname === "/srs-dashboard/report" && (
              <div className="absolute -left-[20px] h-full bg-[#FF6C2F] w-[3px]"></div>
            )}
          </li>

          <li className="relative flex gap-3 items-center h-[50px]">
            <FaHandcuffs
              className={`text-[24px] ${
                location.pathname === "/srs-dashboard/criminalinfo"
                  ? "text-[#FF6C2F]"
                  : "text-[#5d7186]"
              }`}
            />
            <button
              className={`font-medium ${
                location.pathname === "/srs-dashboard/criminalinfo"
                  ? "text-[#fff]"
                  : "text-[#5d7186]"
              }`}
            >
              <NavLink to="/srs-dashboard/criminalinfo">Criminal Info</NavLink>
            </button>
            {location.pathname === "/srs-dashboard/criminalinfo" && (
              <div className="absolute -left-[20px] h-full bg-[#FF6C2F] w-[3px]"></div>
            )}
          </li>
          <li  onClick={() => {
            logout();
            navigate("/")
          }} className="relative flex gap-3 items-center h-[50px]">
            <IoIosLogOut
              className={`text-[24px] text-[#5d7186] `}
            />
            <button

              className={`font-medium text-[#5d7186] `}
            >
              Log Out
            </button>
           
          </li>
        </ul>
      </div>
    </div>
  );
};
// text-[#FF6C2F]
export default Sidebar;
