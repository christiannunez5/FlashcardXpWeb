import { TStudySetWithFlashcardsSchema } from "@/features/studysets/hooks";
import api from "../lib/axios";
import { TStudySet } from "../types";

const ENDPOINT = "api/studyset";

export const getCurrentUserStudySets = async () => {
    const response = await api.get(ENDPOINT);
    return response.data as TStudySet[];
};

export const addStudyset = async (data: TStudySetWithFlashcardsSchema) => {
    console.log("data: ", data);
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data as TStudySet;
};

export const updateStudySet = async (studySetId: string) => {
    const response = await api.patch(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySet;
};

export const deleteStudySet = async (studySetId: string) => {
    const response = await api.delete(`${ENDPOINT}/${studySetId}`);
    return response.data as TStudySet;
};
