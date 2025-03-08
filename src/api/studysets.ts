import api from "../lib/axios";
import { StudySet } from "../types";

const ENDPOINT = "api/studyset";

export const getCurrentUserStudySets = async () => {
    const response = await api.get(ENDPOINT);
    return response.data.data as StudySet[];
};

export const addStudyset = async () => {
    const response = await api.post(`${ENDPOINT}`);
    return response.data.data as StudySet;
};

export const updateStudySet = async (studySetId: string) => {
    const response = await api.patch(`${ENDPOINT}/${studySetId}`);
    return response.data.data as StudySet;
};

export const deleteStudySet = async (studySetId: string) => {
    const response = await api.delete(`${ENDPOINT}/${studySetId}`);
    return response.data.data as StudySet;
};
