import { TUpdateFullStudySetSchema } from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { TStudySetSummary, TStudySet } from "@/types";

const ENDPOINT = "api/study-sets";

export const getCurrentUserStudySets = async (): Promise<
    TStudySetSummary[]
> => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getStudySet = async (studySetId: string): Promise<TStudySet> => {
    const response = await api.get(`${ENDPOINT}/${studySetId}`);
    return response.data;
};

export const addDraftStudySet = async (): Promise<string> => {
    const response = await api.post(`${ENDPOINT}/draft`);
    return response.data;
};

export const updateFullStudySet = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TUpdateFullStudySetSchema;
}) => {
    const response = await api.put(`${ENDPOINT}/${studySetId}/full`, data);
    return response.data;
};

export const updateStudySet = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: { title: string; description: string };
}): Promise<string> => {
    const response = await api.patch(`${ENDPOINT}/${studySetId}`, data);
    return response.data;
};

export const deleteStudySet = async (studySetId: string) => {
    const response = await api.delete(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySetSummary;
};
