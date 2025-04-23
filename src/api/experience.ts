import api from "@/lib/axios";
import { TUserExperience } from "@/types";

const ENDPOINT = "api/user-experiences";

export const getCurrentUserExperience = async (): Promise<TUserExperience> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};
