import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { useDashboardStore } from "../store/useDashboardStore";
import Loader from "../components/Loader";

const AddCrimianl = () => {
  const [name, setName] = useState("");
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [lockUpDate, setlockUpDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const loading = useDashboardStore((s) => s.loading)
  const addCloading = useDashboardStore(s => s.addCloading)
  const postImage = useDashboardStore((state) => state.postImage);
  const imageUrl = useDashboardStore((state) => state.imageUrl);
  const addCriminalInfo = useDashboardStore((state) => state.addCriminalInfo);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(imageUrl);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      document.getElementById("file-name").textContent = file.name;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent form from submitting
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }
    postImage(selectedFile)
    // try {
    //   const uploadedUrl = await postImage(selectedFile); // ✅ Wait for image to upload

     
    // } catch (err) {
    //  console.error(err)
    // }
  };
  console.log({
    name,
    dob,
    lockUpDate,
    releaseDate,
    bvn,
    nin,
    address,
    phoneNumber,
    imageUrl,
  });
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting
    try {
      addCriminalInfo(
        name,
        dob,
        lockUpDate,
        releaseDate,
        bvn,
        nin,
        address,
        phoneNumber,
        imageUrl
      );
    } catch (error) {
      console.error(error);
    }
  };

  console.log("thr url", imageUrl);
  return (
    <div className="w-[100%] p-10 bg-[#F9F7F7]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#5d7186] text-[21px]">Add Criminals Info</h1>
        </div>
        <div>
          <ul className="flex text-[#8a949e] items-center text-[23px] gap-6">
            <li>
              {/* <IoNotifications className="" /> */}
            </li>
            <li>
              <FaClock />
            </li>
            {/* <li className="w-9 h-9 overflow-hidden rounded-full border border-gray-300">
                                 <img
                                   src="/images/general.jpg"
                                   alt="User Avatar"
                                   className="w-full h-full object-cover"
                                 />
                               </li> */}
          </ul>
        </div>
      </div>
      <div className="w-full mt-10 p-3 px-7 rounded-lg shadow-lg  bg-white">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          <div className="flex gap-4">
            <div className="w-full flex flex-col ">
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md border-[#D8DFE7] py-1.5 pl-3 outline-none"
                type="text"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="dob">Date Of Birth</label>
              <input
                onChange={(e) => setDob(e.target.value)}
                type="date"
                id="dob"
                name="dob"
                className="border rounded-md border-[#D8DFE7] py-2 pl-3 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col">
              <label htmlFor="lockUpDate">Lock Up Date</label>
              <input
                onChange={(e) => setlockUpDate(e.target.value)}
                type="date"
                id="lockUpDate"
                name="lockUpDate"
                className="border rounded-md border-[#D8DFE7] py-2 pl-3 bg-transparent outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="rel-date">Release Date</label>
              <input
                onChange={(e) => setReleaseDate(e.target.value)}
                type="date"
                id="rel-date"
                name="rel-date"
                className="border rounded-md border-[#D8DFE7] py-2 pl-3 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col">
              <label>BVN</label>
              <input
                onChange={(e) => setBvn(e.target.value)}
                className="w-full border rounded-md border-[#D8DFE7] py-1.5 pl-3 outline-none"
                type="number"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="nin">NIN</label>
              <input
                onChange={(e) => setNin(e.target.value)}
                type="number"
                id="nin"
                name="nin"
                className="border rounded-md border-[#D8DFE7] py-1.5 pl-3 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col">
              <label>Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-md border-[#D8DFE7] py-1.5 pl-3 outline-none"
                type="text"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="p-number">Phone Number</label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                id="p-number"
                name="p-number"
                className="border rounded-md border-[#D8DFE7] py-1.5 pl-3 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="photo">
              Upload Image
            </label>

            <div className="h-[200px] w-full gap-3 border border-dashed border-[#D8DFE7] bg-[#F9F7F7] rounded-md flex flex-col items-center justify-center relative p-4">
              <label
                htmlFor="photo"
                className="cursor-pointer px-4 py-2 bg-white border border-[#D8DFE7] rounded-md text-sm hover:bg-gray-100 transition"
              >
                Choose File
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="text-sm text-gray-600" id="file-name">
                No file chosen
              </div>

              <button
                type="button"
                onClick={handleUpload}
                className="cursor-pointer mt-3 px-4 py-2 rounded-md bg-[#78a30d] text-white"
              >
                {loading ? <Loader /> : "Upload Photo"}
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={() =>
            addCriminalInfo(
              name,
              dob,
              lockUpDate,
              releaseDate,
              bvn,
              nin,
              address,
              phoneNumber,
              imageUrl
            )
          }
          className="w-full bg-[#496212] text-white mt-7 mb-[52px] py-3 rounded-sm cursor-pointer"
        >
           {addCloading ? <Loader /> : "Add Criminal"}
        </button>
      </div>
    </div>
  );
};

export default AddCrimianl;
