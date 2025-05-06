import { renameFolder } from "@/api/folders";
import { TFolder, TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRenameFolder = (folderId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: renameFolder,
        onMutate: async (data) => {
            let previousMyFolders;
            let folder;

            if (folderId) {
                queryClient.cancelQueries({ queryKey: ["folders"] });

                folder = queryClient.getQueryData<TFolder[]>([
                    "folders",
                    folderId,
                ]);

                queryClient.setQueryData(
                    ["folders", folderId],
                    (oldFolder: TFolder) => {
                        return {
                            ...oldFolder,
                            subFolders: oldFolder.subFolders.map((folder) => {
                                if (data.folderId === folder.id) {
                                    return {
                                        ...folder,
                                        name: data.data.name,
                                    };
                                }
                                return folder;
                            }),
                        };
                    }
                );
            } else {
                queryClient.cancelQueries({ queryKey: ["folders"] });

                previousMyFolders = queryClient.getQueryData<TFolderSummary[]>([
                    "folders",
                ]);

                queryClient.setQueryData(
                    ["folders"],
                    (oldFolders: TFolderSummary[]) => {
                        return oldFolders.map((folder) => {
                            if (data.folderId === folder.id) {
                                return {
                                    ...folder,
                                    name: data.data.name,
                                };
                            }
                            return folder;
                        });
                    }
                );
            }

            return { previousMyFolders, folder };
        },

        onError(error, variables, context) {
            if (folderId) {
                queryClient.setQueryData(
                    ["folders"],
                    context?.previousMyFolders
                );
            } else {
                queryClient.setQueryData(
                    ["folders", folderId],
                    context?.folder
                );
            }
        },
        onSettled: () => {
            if (folderId) {
                queryClient.invalidateQueries({ queryKey: ["folders"] });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ["folders", folderId],
                });
            }
        },
    });
};
