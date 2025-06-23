import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import io from "socket.io-client";
import { useSocketStore } from "../store/useSocketStore";
import { useDashboardStore } from "../store/useDashboardStore";

const Report = () => {
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const emitReportMsg = useSocketStore((state) => state.emitReportMsg);
  const reports = useSocketStore((state) => state.reports);
  const units = useDashboardStore((state) => state.units);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [report, setReport] = useState("");
  const toggleRecipient = (id) => {
    // set state
    setSelectedRecipients((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    const allIds = filteredUnits.map((rp) => rp._id);

    if (selectedRecipients.length === allIds.length) {
      // All are selected → uncheck all
      setSelectedRecipients([]);
    } else {
      // Not all selected → select all
      setSelectedRecipients(allIds);
    }
  };
  console.log("Hi Recipient:", selectedRecipients);
  useEffect(() => {
    if (roleFilter === "All" || !roleFilter) {
      setFilteredUnits(units);
    } else {
      const filtered = units?.filter((unit) => unit.role === roleFilter);
      setFilteredUnits(filtered);
    }
  }, [roleFilter, units]);

  useEffect(() => {
    connectSocket();
    console.log("Hi again:", units);
    return () => {
      useSocketStore.getState().disconnect();
    };
  }, []);

  const handleSendReport = () => {
    console.log("Clicked");
    emitReportMsg({
      reportToIds: selectedRecipients,
      report: report,
    });
  };
  const roles = ["All", "Floor Member", "Unit Commander", "Brigade Commander"];
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  console.log("🔔 Current reports array:", reports);
  return (
    <div className="w-full p-10 bg-[#F9F7F7]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#5d7186] text-[21px]">Security Info & Report</h1>
        </div>
        <div>
          <ul className="flex text-[#8a949e] items-center text-[23px] gap-6">
            <li>
              <IoNotifications className="" />
            </li>
            <li>
              <FaClock />
            </li>
          </ul>
        </div>
      </div>
      <div className="p-3 px-7 rounded-lg shadow-lg mt-7 bg-white">
        <h1 className="mt-[32px]  mb-[16px] text-center font-semibold text-[26px]">
          Report A Threat
        </h1>
        <form className="flex flex-col gap-4 text-[16px] text-[#5d7186]">
          <div className="col-span-4 flex flex-col">
            <label htmlFor="threat">Threat</label>

            <textarea
              id="threat"
              onChange={(e) => setReport(e.target.value)}
              placeholder="Report Threat"
              className="border h-[150px] rounded-md border-[#D8DFE7] py-1.5 pl-3 outline-none"
            ></textarea>
          </div>

          <div className=" flex justify-between  items-center gap-5 px-5 -mb-4 py-4  bg-[#F9F7F7] rounded-t-lg">
            <h2 className="font-bold text-[#313b5e] ">Army Personnels</h2>

            <div className="flex gap-3 items-center">
              <h3 className="text-black"> Filter by role:</h3>
              <select
                onChange={(e) => setRoleFilter(e.target.value)}
                id="personnel"
                className="border rounded-md border-[#D8DFE7] py-2 pl-3 bg-transparent outline-none"
              >
                <option>All </option>
                <option>Unit Member</option>
                <option>Unit Commander</option>
                <option>Brigade Commander</option>
              </select>
            </div>
          </div>

          <table className="w-full border-collapse bg-white">
            <thead className="border border-[#eee]">
              <tr className="border-b border-[#eee] text-left">
                <th className="pl-5 py-2">
                  {/* // this should check all */}
                  <input
                    type="checkbox"
                    checked={
                      selectedRecipients.length === filteredUnits.length &&
                      filteredUnits.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-[#4A6211]"
                  />
                </th>
                <th className="px-5 py-2">Name</th>
                <th className="px-5 py-2">Position</th>
                <th className="px-5 py-2">Unit</th>
              </tr>
            </thead>
            <tbody className="border border-[#eee]">
              {filteredUnits && filteredUnits.length > 0 ? (
                filteredUnits.map((rp, i) => (
                  <tr  key={rp?._id} className="border-b border-[#eee]">
                    <td className="pl-5 py-2">
                      {/* <input type="checkbox" className="accent-[#4A6211]" />
                       */}
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(rp._id)}
                        onChange={() => toggleRecipient(rp._id)}
                        className="accent-[#4A6211]"
                      />
                    </td>
                    <td className="px-5 py-2">{rp?.name}</td>
                    <td className="px-5 py-2">{rp?.role}</td>
                    <td className="px-5 py-2">{rp?.unit.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">
                    No Member Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Status */}
        </form>

        <button
          onClick={handleSendReport}
          disabled={selectedRecipients.length === 0}
          className={`w-full mt-7 mb-[52px] py-3 rounded-sm cursor-pointer
    ${
      selectedRecipients.length === 0
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-[#496212] text-white"
    }
  `}
        >
          Submit Report
        </button>
      </div>

      <div className="w-full font-medium text-[#4f4f4f] text-[14px] py-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-md">
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
                <tr data-aos="fade-up" key={i} className="border-b border-[#eee]">
                  <td className="px-5 py-2">{r?.report}</td>
                  <td className="px-5 py-2">{r?.reportedBy}</td>
                  <td className="px-5 py-2">{r?.unit}</td>
                  <td className="px-5 py-2">
                    {new Date(r.date).toLocaleString()} {/* Format the date */}
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
  );
};

export default Report;
