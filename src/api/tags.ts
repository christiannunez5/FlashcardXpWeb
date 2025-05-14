import api from "@/lib/axios";
import { TStudySetSummary, TTag } from "@/types";

const ENDPOINT = "api/tags";

export const getTags = async (): Promise<TTag[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const getStudySetsByTag = async (
    tagId: string
): Promise<TStudySetSummary[]> => {
    const response = await api.get(`${ENDPOINT}/${tagId}/study-sets`);
    return response.data;
};
