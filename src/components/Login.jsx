import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/authService";
import {useAuthStore} from "../store/useAuthStore"
import Loader from "./Loader";
const Login = () => {
  const [serviceNumber, setServiceNumber] = useState();
  const [password, setPassword] = useState();
 

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login)
  const loading = useAuthStore((state) => state.loading)
  return (
    <div className="w-full flex mt-[80px] justify-center px-10 ">
      <div className=" flex flex-col   bg-[#F9F7F7] md:w-[40%] text-black rounded-sm">
        <h1 className="mt-[42px] text-center font-semibold text-[36px]">
          Login
        </h1>
        <form className="flex flex-col px-10 gap-3">
          <label className="text-[14px]" htmlFor="Name">
            Service Number
          </label>
          <input
            id="Name"
            onChange={(e) => setServiceNumber(e.target.value)}
            placeholder="Enter Service Number"
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
        </form>

        <button
          onClick={() => login(serviceNumber, password)}
          className="bg-[#496212] text-white mx-10 mt-7 mb-[52px] py-3 rounded-sm cursor-pointer"
        >
          {loading ? <Loader /> : <>Login</>}
        </button>
      </div>
    </div>
  );
};

export default Login;
