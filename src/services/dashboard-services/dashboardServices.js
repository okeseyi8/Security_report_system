import api from "../api"

export async function criminalInfo() {
    const res = await api.get("/user/criminal-records");
    return res.data
}
export async function getUnit(){
  const res = await api.get("/user/all/unit-users");
  return res.data
}
export async function postCriminalInfo(name, dob, lockUpDate, releaseDate, bvn, nin, address, phoneNumber, imageUrl){
    const res = await api.post("/user/criminal-record", {name, dob, lockUpDate, releaseDate, bvn, nin, address, phoneNumber, imageUrl })
    return res.data
}
export async function addImage(file) {
  const formData = new FormData();
  formData.append("media", file); 

  const res = await api.post("/user/upload-files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}