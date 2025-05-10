import { TCreateFolderSchema } from "@/features/folders/hooks";
import api from "@/lib/axios";
import { TFolder, TFolderSummary, TStudySetSummary } from "@/types";

const ENDPOINT = "api/folders";

export const getFolders = async (): Promise<TFolderSummary[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const getFolder = async (folderId: string): Promise<TFolder> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}/${folderId}`);
    return response.data;
};

export const deleteFolder = async (folderId: string): Promise<string> => {
    const response = await api.delete(`${ENDPOINT}/${folderId}`);
    return response.data;
};

export const createFolder = async ({
    data,
    folderId,
}: {
    data: TCreateFolderSchema;
    folderId?: string;
}): Promise<string> => {
    const createFolderData = {
        ...data,
        folderId,
    };

    const response = await api.post(`${ENDPOINT}`, createFolderData);
    return response.data;
};

export const renameFolder = async ({
    folderId,
    data,
}: {
    folderId: string;
    data: TCreateFolderSchema;
}) => {
    const response = await api.patch(`${ENDPOINT}/${folderId}`, data);
    return response.data;
};

export const getStudySetsByFolder = async (
    folderId: string
): Promise<TStudySetSummary[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    });
    const response = await api.get(`${ENDPOINT}/${folderId}/study-sets`);
    return response.data;
};

export const updateParentFolder = async ({
    folderId,
    data,
}: {
    folderId: string;
    data: { parentFolderId: string };
}) => {
    const response = await api.patch(`${ENDPOINT}/${folderId}/move`, data);
    return response.data;
};
