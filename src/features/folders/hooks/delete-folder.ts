import { deleteFolder } from "@/api/folders";
import { TFolder, TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteFolder = (parentFolderId?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFolder,
        onMutate: async (deletedFolderId) => {
            console.log(parentFolderId);
            let previousParentFolder;
            let previousFolders;

            if (!parentFolderId) {
                queryClient.cancelQueries({
                    queryKey: ["folders"],
                });

                previousFolders = queryClient.getQueryData<TFolderSummary[]>([
                    "folders",
                ]);
                queryClient.setQueryData(
                    ["folders"],
                    (oldFolders: TFolderSummary[]) => {
                        return oldFolders.filter(
                            (f) => f.id !== deletedFolderId
                        );
                    }
                );
            } else {
                queryClient.cancelQueries({
                    queryKey: ["folders", parentFolderId],
                });
                previousParentFolder = queryClient.getQueryData<TFolder>([
                    "folders",
                    parentFolderId,
                ]);

                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    (oldFolderData: TFolder) => {
                        return {
                            ...oldFolderData,
                            subFolders: oldFolderData.subFolders.filter(
                                (f) => f.id !== deletedFolderId
                            ),
                        };
                    }
                );
            }

            return { previousFolders, previousParentFolder };
        },

        onError(error, _, context) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }

            if (parentFolderId) {
                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    context?.previousParentFolder
                );
            } else {
                queryClient.setQueryData(["folders"], context?.previousFolders);
            }
        },

        onSuccess() {
            if (parentFolderId) {
                queryClient.invalidateQueries({
                    queryKey: ["folders", parentFolderId],
                });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ["folders"],
                });
            }
        },
    });
};
