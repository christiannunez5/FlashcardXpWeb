import axios from "axios";

const API_BASE_URL = "http://localhost:5173";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
