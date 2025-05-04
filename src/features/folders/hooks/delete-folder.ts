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
            let previousParentFolder;
            let previousFolders;

            queryClient.invalidateQueries({
                queryKey: ["folders", parentFolderId],
            });

            queryClient.invalidateQueries({
                queryKey: ["folders"],
            });
            
            if (!parentFolderId) {
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
                previousParentFolder = queryClient.getQueryData<TFolder>([
                    "folders",
                    parentFolderId,
                ]);

                console.log(previousParentFolder);

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

            queryClient.setQueryData(
                ["folders", parentFolderId],
                context?.previousParentFolder
            );

            queryClient.setQueryData(["folders"], context?.previousFolders);
        },

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["folders", parentFolderId],
            });

            queryClient.invalidateQueries({
                queryKey: ["folders"],
            });
        },
    });
};
