import { updateParentFolder } from "@/api/folders";
import { TFolder, TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateParentFolder = (parentFolderId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateParentFolder,
        onMutate: (data) => {
            let previousMyFolders;
            let currentFolder;
            if (!parentFolderId) {
                queryClient.cancelQueries({ queryKey: ["folders"] });
                previousMyFolders = queryClient.getQueryData<TFolderSummary[]>([
                    "folders",
                ]);

                queryClient.setQueryData(
                    ["folders"],
                    (oldFolders: TFolderSummary[]) => {
                        return oldFolders.filter((f) => f.id !== data.folderId);
                    }
                );
            } else {
                queryClient.cancelQueries({
                    queryKey: ["folders", parentFolderId],
                });
                currentFolder = queryClient.getQueryData<TFolder[]>([
                    "folders",
                    parentFolderId,
                ]);

                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    (oldFolder: TFolder) => {
                        return {
                            ...oldFolder,
                            subFolders: oldFolder.subFolders.filter(
                                (f) => f.id !== data.folderId
                            ),
                        };
                    }
                );
            }
            return { previousMyFolders, currentFolder };
        },
        onError(error, variables, context) {
            if (!parentFolderId) {
                queryClient.setQueryData(
                    ["folders"],
                    context?.previousMyFolders
                );
            } else {
                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    context?.currentFolder
                );
            }
        },

        onSettled: () => {
            if (!parentFolderId) {
                queryClient.invalidateQueries({ queryKey: ["folders"] });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ["folders", parentFolderId],
                });
            }
        },
    });
};
