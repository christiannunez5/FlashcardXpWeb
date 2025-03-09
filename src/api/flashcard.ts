import api from "@/lib/axios";
import { FlashcardsByStudySet } from "@/types";

const ENDPOINT = "api/studysets";

export const getFlashcardsByStudySet = async (studySetId: string) => {
    const response = await api.get(`${ENDPOINT}/${studySetId}/flashcards`);
    return response.data.data as FlashcardsByStudySet;
};
