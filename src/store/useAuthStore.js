import { create } from "zustand";
import { getUnit, loginUser, registerUser } from "../services/auth/authService";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";



export const useAuthStore = create((set) => ({
  showForm: true,
  token: localStorage.getItem("authToken") || null,
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: false,
  unit: localStorage.getItem("listOfUnits")
    ? JSON.parse(localStorage.getItem("listOfUnits"))
    : [],

  login: async (serviceNumber, password) => {
    set({ loading: true, error: null });

    try {
      const data = await loginUser({ serviceNumber, password });

      set({ token: data.token });
      localStorage.setItem("authToken", data.token);

      set({ user: data.response });
      localStorage.setItem("userInfo", JSON.stringify(data.response));

      toast.success("Login Successful");
    } catch (error) {
      toast.error("Internal Server Error");
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  register: async (name, password, serviceNumber, unitId) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser({
        name,
        password,
        serviceNumber,
        unitId,
      });
      toast.success("User Successfully Registered");
      set({ showForm: false });
    } catch (err) {
      console.error(err);
      toast.error("Internal Server Error");
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.clear();
 
  },
  selectUnit: async () => {
    try {
      const data = await getUnit();
      set({ unit: data });
      localStorage.setItem("listOfUnits", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  },
  setShowForm: (value) => {
    set({ showForm: value });
  },
}));
