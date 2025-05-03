import { TCreateFolderSchema } from "@/features/folders/hooks";
import api from "@/lib/axios";
import { TFolder, TFolderSummary } from "@/types";

const ENDPOINT = "api/folders";

export const getFolders = async (): Promise<TFolderSummary[]> => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
};

export const getFolder = async (folderId: string): Promise<TFolder> => {
    const response = await api.get(`${ENDPOINT}/${folderId}`);
    return response.data;
};

export const deleteFolder = async (folderId: string): Promise<string> => {
    const response = await api.delete(`${ENDPOINT}/${folderId}`);
    return response.data;
};

export const addNewFolder = async ({
    data,
    folderId,
}: {
    data: TCreateFolderSchema;
    folderId: string;
}): Promise<string> => {
    const response = await api.post(`${ENDPOINT}/${folderId}`, data);
    return response.data;
};
