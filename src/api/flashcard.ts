import { TUpdateStudySetSchema } from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { TFlashcard, TFlashcardsByStudySet } from "@/types";

const ENDPOINT = "api/studysets";

export const getStudySetFlashcards = async (studySetId: string) => {
    const response = await api.get(`${ENDPOINT}/${studySetId}/flashcards`);
    return response.data as TFlashcardsByStudySet;
};

export const updateFlashcards = async (
    studysetId: string,
    data: TUpdateStudySetSchema
) => {
    const response = await api.put(`${ENDPOINT}/${studysetId}`, data);
    return response.data as string;
};

export const deleteFlashcard = async (id: string): Promise<TFlashcard> => {
    const response = await api.delete(`api/flashcards/${id}`);
    return response.data;
};
