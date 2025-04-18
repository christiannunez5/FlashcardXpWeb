import api from "@/lib/axios";
import { TCompletedFlashcard } from "@/types";

const ENDPOINT = "api/completed-flashcards";

export const getCompletedFlashcards =
    async (): Promise<TCompletedFlashcard> => {
        const response = await api.get(`${ENDPOINT}`);
        return response.data;
    };

export const addCompletedFlashcard = async (data: {
    flashcardId: string;
}): Promise<void> => {
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data;
};
