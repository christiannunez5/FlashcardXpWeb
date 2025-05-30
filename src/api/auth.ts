import { TCreateUserSchema, TLoginSchema } from "@/features/auth/hooks";
import api from "@/lib/axios";
import { TUser } from "@/types";

const ENDPOINT = "/api/auth";

export const login = async (data: TLoginSchema) => {
    const response = await api.post(`${ENDPOINT}/login`, data);
    return response.data;
};

export const register = async (data: TCreateUserSchema): Promise<void> => {
    const response = await api.post(`${ENDPOINT}/register`, data);
    return response.data;
};

export const getCurrentLoggedInUser = async () => {
    const response = await api.get(`${ENDPOINT}/me`);
    return response.data as TUser | null;
};

export const logoutUser = async () => {
    await api.post(`${ENDPOINT}/logout`);
};
