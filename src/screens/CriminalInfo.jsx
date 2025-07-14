import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { IoNotifications, IoPersonAddSharp } from "react-icons/io5";
import { CgWorkAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../store/useDashboardStore";
import { InfoRow } from "./InfoRow";
import { FaExternalLinkAlt } from "react-icons/fa";
const CriminalInfo = () => {
  const getCriminalInfo = useDashboardStore((state) => state.getCriminalInfo);
  const criminalInfo = useDashboardStore((state) => state.criminalInfo);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState();

  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCriminals = criminalInfo.filter((criminal) =>
    criminal.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    getCriminalInfo();
  }, [getCriminalInfo]);

  const handleViewProfile = (id) => {
    const profile = criminalInfo.find((criminal) => criminal._id === id);
    setSelectedProfile(profile);
  };

  const handleBack = () => setSelectedProfile(null);

  return (
    <div className="w-full p-10 bg-[#F9F7F7]">
      {/* === If viewing full profile === */}
      {selectedProfile ? (
        <div>
          <button
            onClick={handleBack}
            className="mb-6 bg-[#334155] text-white px-4 py-2 rounded"
          >
            ← Back to List
          </button>

          <div className="flex gap-10 items-center bg-white shadow-sm px-10 py-5">
            <div>
              <div className="w-[250px] h-[250px] overflow-hidden rounded-full border border-gray-300">
                <img
                  src={selectedProfile.imageUrl || "/images/general.jpg"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center ">
              <h1 className="text-[#000] font-medium text-[25px]">
                {selectedProfile.name}
              </h1>
              <p className="text-[14px] text-[#5d7186]">
                {selectedProfile.address || "No address provided"}
              </p>
              <div className="w-full h-[1.5px] bg-[#ccc] mt-8"></div>
              <div className="flex flex-wrap gap-10 mt-6 text-sm text-[#334155]">
                <div className="flex flex-col gap-5 min-w-[260px]">
                  <InfoRow label="Date of Birth" value={selectedProfile.dob} />
                  <InfoRow
                    label="Lock Up Date"
                    value={new Date(
                      selectedProfile.lockUpDate
                    ).toLocaleDateString()}
                  />
                  <InfoRow
                    label="Release Date"
                    value={new Date(
                      selectedProfile.releaseDate
                    ).toLocaleDateString()}
                  />
                  <InfoRow label="BVN" value={selectedProfile.bvn || "N/A"} />
                  <InfoRow label="NIN" value={selectedProfile.nin || "N/A"} />
                </div>
                <div className="flex flex-col gap-5 min-w-[260px]">
                  <InfoRow
                    label="Locked Up By"
                    value={selectedProfile.lockedUpBy || "N/A"}
                  />
                  <InfoRow
                    label="Created At"
                    value={new Date(
                      selectedProfile.createdAt
                    ).toLocaleDateString()}
                  />
                  <InfoRow
                    label="Unit"
                    value={selectedProfile.unit}
                    valueClass="text-[14px] font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* === Top Header === */}
          <div className="flex justify-between items-center">
            <h1 className="text-[#5d7186] text-[21px]">Criminals Info</h1>
            <ul className="flex text-[#8a949e] items-center text-[23px] gap-6">
              <li>
                <IoNotifications />
              </li>
              <li>
                <FaClock />
              </li>
            </ul>
          </div>

          {/* === Search + Add New === */}
          <div className="w-full flex justify-between items-center mt-3">
            <div className="relative bg-[#EAE8E8] w-[196px] rounded-md">
              <input
                className="w-full pl-8 py-2.5 text-[#5D7186] outline-0 rounded-md"
                placeholder="Search"
                type="text"
                value={searchQuery || ""}
                onChange={handleSearchChange}
              />
              <CiSearch className="text-[#8386A7] absolute top-3 left-2 text-[20px]" />
            </div>
            <button
              onClick={() => navigate("/srs-dashboard/addcriminal")}
              className="bg-[#496212] p-[10px] text-white flex items-center gap-1 rounded-sm"
            >
              Add New Criminal <IoPersonAddSharp />
            </button>
          </div>

          {/* === Table List === */}
          <div className="flex flex-col mt-6 rounded-sm bg-white shadow-sm">
            <div className="w-full border-b border-[#eee] font-semibold text-[16px] pl-5 py-3">
              Criminal Records
            </div>
            <div className="w-full font-medium text-[#4f4f4f] text-[14px] py-2 overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-[#eee] text-left">
                    <th className="px-5 py-2 w-[18%]">Prisoner name</th>
                    <th className="px-5 py-2 w-[18%]">D.O.B</th>
                    <th className="px-5 py-2 w-[24%]">Arrested Unit</th>
                    <th className="px-5 py-2 w-[14%]">Lock Up Date</th>
                    <th className="px-5 py-2 w-[14%]">Release Day</th>
                    <th className="py-2 w-[13%]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(searchQuery ? filteredCriminals : criminalInfo).map(
                    (criminal, i) => (
                      <tr
                        key={criminal._id || i}
                        className="border-b border-[#eee]"
                      >
                        <td className="px-5 py-2">{criminal.name}</td>
                        <td className="px-5 py-2">{criminal.dob}</td>
                        <td className="px-5 py-2">{criminal.unit}</td>
                        <td className="pl-8 py-2">
                          {new Date(criminal.lockUpDate).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-2 text-red-600 font-semibold">
                          {new Date(criminal.releaseDate).toLocaleDateString()}
                        </td>
                        <td className="py-2 font-semibold">
                          <div
                            onClick={() => handleViewProfile(criminal._id)}
                            className="flex gap-1 items-center text-blue-600 cursor-pointer"
                          >
                            See full profile
                            <FaExternalLinkAlt className="text-sm" />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CriminalInfo;
