import { create } from "zustand";
import { addImage, criminalInfo as fetchCriminalInfo, getUnit, postCriminalInfo } from "../services/dashboard-services/dashboardServices";
import toast from "react-hot-toast";

export const useDashboardStore = create((set) => ({
  criminalInfo: JSON.parse(localStorage.getItem("criminalInfo")) || [],
  imageUrl: null,
  loading: false,
  addCloading: false,
  units: JSON.parse(localStorage.getItem("units")) || [],

  getCriminalInfo: async () => {
    try {
      const data = await fetchCriminalInfo();
      set({ criminalInfo: data });
      localStorage.setItem("criminalInfo", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to fetch criminal info:", error);
    }
  },
  getAllUnits:  async () => {
    try{
      const data = await getUnit();
      set({units: data});
      localStorage.setItem("units", JSON.stringify(data))
      
    }catch(err){
      console.error(err)
    }
  }
  ,
  addCriminalInfo: async (name, dob, lockUpDate, releaseDate, bvn, nin, address, phoneNumber, imageUrl) => {
    set({addCloading: true})
    try {
      const data  = await postCriminalInfo(name, dob, lockUpDate, releaseDate, bvn, nin, address, phoneNumber, imageUrl);
      toast.success("Criminal Added Succesfully")
    } catch (error) {
      console.error(error)
      
    }finally{
      set({addCloading: false})
    }
  },
  postImage: async (file) => {
    set({loading: true})
    try {
      const data = await addImage(file);
      set({imageUrl: data.mediaURLs[0]})
      localStorage.setItem("imageUrlObj", JSON.stringify(data));
      toast.success("Upload Image Successfully")
    } catch (error) {
      console.error(error)
    } finally{
      set({loading: false})
    }
  },
  

}));
