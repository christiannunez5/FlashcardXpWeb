import { createFolder } from "@/api/folders";
import { TFolder, TFolderSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const createFolderSchema = z.object({
    name: z.string().min(1, "Name must be atleast 1 character."),
});

export type TCreateFolderSchema = z.infer<typeof createFolderSchema>;

export const useCreateFolder = (parentFolderId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFolder,
        onMutate: async (data) => {
            let previousFolders;
            let previosParentFolder;

            const newFolder: TFolderSummary = {
                id: "",
                name: data.data.name,
                parentFolderId: parentFolderId,
            };

            if (parentFolderId) {
                queryClient.cancelQueries({
                    queryKey: ["folders", parentFolderId],
                });

                previosParentFolder = queryClient.getQueryData<TFolder>([
                    "folders",
                    parentFolderId,
                ]);

                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    (oldFolder: TFolder) => {
                        return {
                            ...oldFolder,
                            subFolders: [...oldFolder.subFolders, newFolder],
                        };
                    }
                );
            } else {
                queryClient.cancelQueries({
                    queryKey: ["folders"],
                });

                previousFolders = queryClient.getQueryData<TFolderSummary[]>([
                    "folders",
                ]);

                queryClient.setQueryData(
                    ["folders"],
                    (oldFolders: TFolderSummary[]) => {
                        return [...oldFolders, newFolder];
                    }
                );
            }

            return { previousFolders, previosParentFolder };
        },

        onError(_, __, context) {
            if (parentFolderId) {
                queryClient.setQueryData(
                    ["folders", parentFolderId],
                    context?.previosParentFolder
                );
            } else {
                queryClient.setQueryData(["folders"], context?.previousFolders);
            }
        },
        onSettled() {
            if (parentFolderId) {
                queryClient.invalidateQueries({
                    queryKey: ["folders", parentFolderId],
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ["folders"] });
            }
        },
    });
};
