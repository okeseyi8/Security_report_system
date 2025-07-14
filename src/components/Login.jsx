import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/authService";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "./Loader";
import { FaPerson } from "react-icons/fa6";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
const Login = () => {
  const [serviceNumber, setServiceNumber] = useState();
  const [password, setPassword] = useState();
  const [userRole, setUserRole] = useState("civilian");
  const [details, setDetails] = useState({
    password: "",
    serviceNumber: "",
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const genericInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({...prev, [name]: value}))
  };

  return (
    <div className="w-full flex mt-[80px] justify-center px-10 ">
      <div className=" flex flex-col   bg-[#F9F7F7] md:w-[40%] text-black rounded-sm">
        <h1 className="mt-[42px] text-center font-semibold text-[36px]">
          Login
        </h1>
        {/* <div className="flex gap-3 text-md text-gray-500 font-light justify-center items-center ">
          <hr className="w-16 border-t border-gray-300 rounded-full" />
          <span className=" tracking-wide text-sm text-gray-400">as</span>
          <hr className="w-16 border-t border-gray-300 rounded-full" />
        </div> */}
        {/* <div className="flex justify-center  items-center">
          <div className="flex flex-col items-center mx-4 my-2">
            <span
              onClick={() => setUserRole("civilian")}
              className={`w-9 cursor-pointer h-9 rounded-full flex items-center justify-center text-[20px] transition-all duration-300 ease-in-out ${
                userRole === "civilian"
                  ? "text-white bg-[#496212]"
                  : "text-[#496212]  border border-[#777]"
              } `}
            >
              {" "}
              <FaPerson className="" />
            </span>
            <span>Civilian</span>
          </div>
          <div className="flex flex-col mx-4 my-2 items-center">
            <span
              onClick={() => setUserRole("miltary")}
              className={`w-9 h-9 cursor-pointer rounded-full flex items-center justify-center text-[20px]  transition-all duration-300 ease-in-out ${
                userRole === "miltary"
                  ? "text-white bg-[#496212]"
                  : "text-[#496212]  border border-[#777]"
              } `}
            >
              {" "}
              <FaPersonMilitaryRifle />
            </span>

            <span>Miltary</span>
          </div>
          <div></div>
        </div> */}
        <form className="flex flex-col px-10 gap-3">
          <label className="text-[14px]" htmlFor="Name">
            Service Number
          </label>
          <input
            id="Name"
            name="serviceNumber"
            onChange={genericInputChangeHandler}
            placeholder="Enter Service Number"
            className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3"
            type="text"
          />

          <label className="text-[14px]" htmlFor="Password">
            Password
          </label>
          <input
            onChange={genericInputChangeHandler}
            id="Password"
            name="password"
            placeholder="****************"
            className="border-1 border-[#a7a7a7] h-[44px] bg-[#FFE2D5] rounded-sm text-[#662b13] pl-3"
            type="password"
          />
        </form>

        <button
          onClick={() => login(details)}
          className="bg-[#496212] text-white mx-10 mt-7 mb-[52px] py-3 rounded-sm cursor-pointer"
        >
          {loading ? <Loader /> : <>Login</>}
        </button>
      </div>
    </div>
  );
};

export default Login;
