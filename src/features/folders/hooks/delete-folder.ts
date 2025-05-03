import { deleteFolder } from "@/api/folders";
import { TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteFolder = (folderId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFolder,
        onMutate: async () => {
            queryClient.invalidateQueries({ queryKey: ["folders", folderId] });

            const previousFolders = queryClient.getQueryData<TFolderSummary[]>([
                "folders",
                folderId,
            ]);

            queryClient.setQueryData(
                ["folders", folderId],
                (oldFolders: TFolderSummary[]) => {
                    return oldFolders.filter((f) => f.id !== folderId);
                }
            );

            return { previousFolders };
        },

        onError(error, _, context) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }

            queryClient.setQueryData(
                ["folders", folderId],
                context?.previousFolders
            );
        },

        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["folders", folderId] });
        },
    });
};
