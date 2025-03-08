import api from "@/lib/axios";
import { User } from "@/types";

const ENDPOINT = "/api/auth";

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const response = await api.post(`${ENDPOINT}/login`, { email, password });
    return response.data;
};

export const getCurrentLoggedInUser = async () => {
    const response = await api.get(`${ENDPOINT}/me`);
    return response.data as User;
};
