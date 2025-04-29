import { TCreateGroupSchema } from "@/features/groups/hooks/create-group";
import api from "@/lib/axios";
import { TGroupSummary } from "@/types";

const ENDPOINT = "api/groups";

export const getCurrentUserGroups = async (): Promise<TGroupSummary[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const createGroup = async (data: TCreateGroupSchema) => {
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data;
};
