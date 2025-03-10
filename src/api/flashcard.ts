import api from "@/lib/axios";
import { TFlashcardsByStudySet } from "@/types";

const ENDPOINT = "api/studysets";

export const getStudySetFlashcards = async (studySetId: string) => {
    const response = await api.get(`${ENDPOINT}/${studySetId}/flashcards`);
    return response.data as TFlashcardsByStudySet;
};
