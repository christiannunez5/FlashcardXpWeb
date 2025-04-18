import {
    TAddFlashcardSchema,
    TUpdateFlashcardSchema,
} from "@/features/flashcards/hooks";
import api from "@/lib/axios";
import { TFlashcard } from "@/types";

const ENDPOINT = "api/flashcards";

export const addFlashcard = async ({
    data,
}: {
    studySetId: string;
    data: TAddFlashcardSchema;
}) => {
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data;
};

export const deleteFlashcard = async (id: string): Promise<TFlashcard> => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};

export const updateFlashcard = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TUpdateFlashcardSchema;
}): Promise<TFlashcard> => {
    const updateFlashcardData = { ...data, studySetId };
    
    const response = await api.put(
        `${ENDPOINT}/${data.id}`,
        updateFlashcardData
    );
    return response.data;
};
