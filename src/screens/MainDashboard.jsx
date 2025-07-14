import React, { useEffect } from "react";
import { FaClock } from "react-icons/fa6";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";
import { useDashboardStore } from "../store/useDashboardStore";

const MainDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const emitReportMsg = useSocketStore((state) => state.emitReportMsg);
  const reports = useSocketStore((state) => state.reports);
  const getAllUnits = useDashboardStore((state) => state.getAllUnits);
  const units = useDashboardStore((state) => state.units);
  useEffect(() => {;
    getAllUnits();
  
    connectSocket();
    return () => {
      useSocketStore.getState().disconnect();
    };
  }, []);

  const handleSendReport = () => {
    emitReportMsg({
      reportToIds: ["681dc66c1783d3ae8c63615d"],
      report: "Reports",
    });
  };

  console.log("🔔 Current reports array:", reports);
  return (
    <div className="w-full p-10 bg-[#F9F7F7]">
      <div className="flex justify-between items-center">
        {/* <button onClick={handleSendReport}>
          Emit
        </button>
       */}
        <div>
          <h1 className="text-[#5d7186] text-[21px]">Welcome, {user?.role}</h1>
        </div>
        <div>
          <ul className="flex text-[#8a949e] items-center text-[23px] gap-6">
            <li>
              {/* <IoNotifications className="" /> */}
            </li>
            <li>
              <FaClock />
            </li>
            <li className="w-9 h-9 overflow-hidden rounded-full border border-gray-300">
              <img
                src="/images/general.jpg"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 p-10 rounded-sm bg-white shadow-sm">
        <div>
          <h1 className="flex text-[22px]  font-medium items-center gap-2">
            {user.name}

            <RiPoliceBadgeFill className="text-[#4A6211] text-[26px]" />
          </h1>
          <p className="text-[14px] text-[#5d7186]">{user?.role}</p>

          <div className="flex gap-5">
            <div className="flex items-center gap-2.5 mt-4">
              <CgWorkAlt className="text-[#FFB69B] text-[26px]" />
              <div>
                <h2 className="text-[14px] font-medium">Service Number</h2>
                <p className="text-[12px]">{user.serviceNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-4">
              <CgWorkAlt className="text-[#FFB69B] text-[26px]" />
              <div>
                <h2 className="text-[14px] font-medium">Category</h2>
                <p className="text-[12px]">{user.categoryName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-4">
              <CgWorkAlt className="text-[#FFB69B] text-[26px]" />
              <div>
                <h2 className="text-[14px] font-medium">Unit</h2>
                <p className="text-[12px]">{user.unit}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-[150px] h-[150px] overflow-hidden rounded-full border border-gray-300 object-cover"
            src="/images/general.jpg"
          />
        </div>
      </div>
      <div className="flex flex-col  mt-10 rounded-sm bg-white shadow-sm">
        <div className="w-full border-b border-[#eee] font-semibold text-[16px] pl-5 py-3 ">
          Security Threats
        </div>

        <div className="w-full font-medium text-[#4f4f4f] text-[14px] py-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#eee] text-left px-5 py-2">
                  <th className="px-5 py-2">Threat</th>
                  <th className="px-5 py-2">Reported By</th>
                  <th className=" pr-5 pl-[100px] py-2">Unit</th>
                  <th className="px-5 py-2">Time Of Report</th>
                  <th className="px-5 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports?.map((r, i) => (
                  <tr key={i} className="border-b border-[#eee]">
                    <td className="px-5 py-2">{r.report}</td>
                    <td className="px-5 py-2">{r.reportedBy}</td>
                    <td className="px-5 py-2">{r.unit}</td>
                    <td className="px-5 py-2">
                      {new Date(r.date).toLocaleString()}{" "}
                      {/* Format the date */}
                    </td>
                    <td className="px-5 py-2 text-red-600 font-semibold">
                      Urgent
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
