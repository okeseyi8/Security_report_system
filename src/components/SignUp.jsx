import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "./Loader";

const SignUp = () => {
  const selectUnit = useAuthStore((state) => state.selectUnit);
  const register = useAuthStore((state) => state.register);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const unit = useAuthStore((state) => state.unit);
  const loading = useAuthStore((state) => state.loading)
  console.log(unit);

  useEffect(() => {
    selectUnit();
  }, []);

  return (
    <div className="w-full flex mt-[80px] justify-center px-10 ">
      <div className=" flex flex-col   bg-[#F9F7F7] md:w-[40%] text-black rounded-sm">
        <h1 className="mt-[42px] text-center font-semibold text-[36px]">
          Register
        </h1>
        <form className="flex flex-col px-10 gap-3">
          <label className="text-[14px]" htmlFor="Name">
            Name
            
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="Name"
            placeholder="Name"
            className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3"
            type="text"
          />

          <label className="text-[14px]" htmlFor="Password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="Password"
            placeholder="****************"
            className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3"
            type="password"
          />

          <label className="text-[14px]" htmlFor="BatchNumber">
            Batch Number
          </label>
          <input
            id="BatchNumber"
            onChange={(e) => setBatch(e.target.value)}
            placeholder="12345"
            className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3"
            type="text"
          />
          <label className="text-[14px]" htmlFor="BatchNumber">
            Select Unit
          </label>
          <select onChange={(e) => setSelectedUnit(e.target.value)}  className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3">
            {unit?.map((u, i) => {
              return <option value={u._id}  key={u._id}>{u.name}</option>;
            })}
          </select>
          {/* {selectedUnit} */}
        </form>

        <button onClick={() => register(name, password, batch, selectedUnit)} className="bg-[#496212] text-white mx-10 mt-7 mb-[52px] py-3 rounded-sm cursor-pointer">
         {loading ? <Loader /> : "Register"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
