import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // URL du backend Laravel (backend-tasks)
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Ajout du token automatiquement
  },
});

/*apiClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`
    return config;
})*/

export default apiClient;