import axios from "axios";

const API_BASE_URL = "https://localhost:7044";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            try {
                const response = await api.post(
                    "/api/auth/login/refresh-token"
                );
                console.log(response.status);
                return api(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
