import { TUpdateWholeStudySetSchema } from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { TStudySetSummary, TStudySet } from "@/types";

const ENDPOINT = "api/studyset";

export const getCurrentUserStudySets = async () => {
    const response = await api.get(ENDPOINT);
    return response.data as TStudySetSummary[];
};

export const getStudySet = async (studySetId: string) => {
    const response = await api.get(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySet;
};

export const addDraftStudySet = async (): Promise<string> => {
    const response = await api.post(`${ENDPOINT}`);
    return response.data;
};

export const updateStudySet = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TUpdateWholeStudySetSchema;
}) => {
    const response = await api.put(`${ENDPOINT}/${studySetId}`, data);
    return response.data as string;
};

export const deleteStudySet = async (studySetId: string) => {
    const response = await api.delete(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySetSummary;
};
