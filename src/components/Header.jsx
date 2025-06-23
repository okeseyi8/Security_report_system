import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const showForm =  useAuthStore((state) => state.showForm)
  const setShowForm = useAuthStore((state) => state.setShowForm)
  console.log(showForm)
  return (
    <div className="w-full px-[60px] py-5 flex justify-between items-center bg-transparent">
      <div>
        <img className="w-[60px]" src="/images/mililogo.png" />
      </div>
      <div>
        <ul className="flex  gap-10 ">
          <li>
          
            <button className="cursor-pointer" onClick={() => setShowForm(false)}>Login</button>
           {showForm}
          </li>
          <li><button className="cursor-pointer" onClick={() => setShowForm(true)}>Register</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
