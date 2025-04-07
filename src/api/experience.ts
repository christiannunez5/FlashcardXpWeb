import api from "@/lib/axios";
import { TUserExperience } from "@/types";

const ENDPOINT = "api/user-experience";

export const getCurrentUserExperience = async (): Promise<TUserExperience> => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};
