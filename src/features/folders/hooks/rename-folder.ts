import { renameFolder } from "@/api/folders";
import { TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRenameFolder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: renameFolder,
        onMutate: async (data) => {
            queryClient.cancelQueries({ queryKey: ["folders"] });

            const previousMyFolders = queryClient.getQueryData<
                TFolderSummary[]
            >(["folders"]);

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

            return { previousMyFolders };
        },
        onError(error, variables, context) {
            queryClient.setQueryData(["folders"], context?.previousMyFolders);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] });
        },
    });
};
