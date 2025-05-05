import {
    TAddStudySetRatingSchema,
    TUpdateFullStudySetSchema,
} from "@/features/studysets/hooks";
import api from "@/lib/axios";
import { TStudySetSummary, TStudySet, TStudySetRating } from "@/types";

const ENDPOINT = "api/study-sets";

export const getCurrentUserStudySets = async (): Promise<
    TStudySetSummary[]
> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 400);
    });
    const response = await api.get(ENDPOINT);
    return response.data;
};
    
export const getStudySet = async (studySetId: string): Promise<TStudySet> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 350);
    });
    const response = await api.get(`${ENDPOINT}/${studySetId}`);
    return response.data;
};

export const createDraftStudySet = async ({
    data,
}: {
    data: { folderId: string | undefined };
}): Promise<string> => {
    const response = await api.post(`${ENDPOINT}/draft`, data);
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

export const addStudySetRating = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TAddStudySetRatingSchema;
}) => {
    const response = await api.post(`${ENDPOINT}/${studySetId}/ratings`, data);
    return response.data;
};

export const updateStudySetRating = async ({
    studySetId,
    data,
}: {
    studySetId: string;
    data: TAddStudySetRatingSchema;
}) => {
    const response = await api.patch(`${ENDPOINT}/${studySetId}/ratings`, data);
    return response.data;
};

export const getStudySetRating = async (
    studySetId: string
): Promise<TStudySetRating> => {
    const response = await api.get(`${ENDPOINT}/${studySetId}/ratings`);
    return response.data;
};

export const getUserStudySetRating = async (
    studySetId: string
): Promise<number> => {
    const response = await api.get(`${ENDPOINT}/${studySetId}/ratings/me`);
    return response.data;
};
