import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // URL du backend Laravel
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajout du token automatiquement
  },
});

/*apiClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
})*/

export default apiClient;