import axios from "axios";

const API_BASE_URL = "https://localhost:7269/";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
