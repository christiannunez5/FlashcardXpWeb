import api from "@/lib/axios";
import { TUser } from "@/types";

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
    return response.data as TUser | null;
};

export const logoutUser = async () => {
    await api.post(`${ENDPOINT}/logout`);
};
