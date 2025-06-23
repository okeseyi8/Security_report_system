import Axios from "axios"

const api = Axios.create(
    {
        baseURL: "https://criminal-fonj.onrender.com/",
        headers:{
            "Content-Type": "application/json",

        }
    }
)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token){
         config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;