import { TUpdateStudySetSchema } from "@/features/studysets/hooks";
import api from "../lib/axios";
import { TStudySet } from "../types";

const ENDPOINT = "api/studyset";

export const getCurrentUserStudySets = async () => {
    const response = await api.get(ENDPOINT);
    return response.data as TStudySet[];
};

export const addStudyset = async () => {
    const response = await api.post(`${ENDPOINT}`);
    return response.data as string;
};

export const updateStudySet = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TUpdateStudySetSchema;
}) => {
    const response = await api.put(`${ENDPOINT}/${studySetId}`, data);
    return response.data as string;
};

export const deleteStudySet = async (studySetId: string) => {
    const response = await api.delete(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySet;
};
