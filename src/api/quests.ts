import api from "@/lib/axios";
import { TQuest } from "@/types";

const ENDPOINT = "/api/quests";

export const getCurrentUserQuests = async (): Promise<TQuest[]> => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};
