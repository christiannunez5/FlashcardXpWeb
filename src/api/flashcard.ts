import { TUpdateStudySetSchema } from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { TFlashcard } from "@/types";

const ENDPOINT = "api/flashcards";

export const updateFlashcards = async (
    studysetId: string,
    data: TUpdateStudySetSchema
) => {
    const response = await api.put(`${ENDPOINT}/${studysetId}`, data);
    return response.data as string;
};

export const deleteFlashcard = async (id: string): Promise<TFlashcard> => {
    const response = await api.delete(`flashcards/${id}`);
    return response.data;
};
