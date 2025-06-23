import api from "../api";

export async function loginUser ({serviceNumber, password}) {
    const res =  await api.post("/user/login", {serviceNumber, password});
    return res.data

}
export async function registerUser(data){
    const res = await api.post("/user/register", data);
    return res.data
}
export async function getUnit(){
    const res = await api.get("/category/get/units");
    return res.data
}