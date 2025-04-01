import api from "@/lib/axios";
import { TRecentStudySet } from "@/types";

const ENDPOINT = "api/recent-studysets";

export const getRecentStudySets = async (): Promise<TRecentStudySet[]> => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const addRecentStudySet = async (
    studySet: TRecentStudySet
): Promise<TRecentStudySet> => {
    const response = await api.post(`${ENDPOINT}/${studySet.id}`);
    return response.data;
};
