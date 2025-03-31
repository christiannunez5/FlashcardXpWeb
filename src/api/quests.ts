import api from "@/lib/axios";
import { TQuest } from "@/types";

const ENDPOINT = "/api/quests";

export const getCurrentUserQuests = async (): Promise<TQuest[]> => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const resetCurrentUserQuests = async (): Promise<void> => {
    const response = await api.patch(`${ENDPOINT}/reset`);
    return response.data;
};

export const completeQuest = async (questId: string): Promise<string> => {
    const response = await api.patch(`${ENDPOINT}/${questId}/complete`);
    return response.data;
};
