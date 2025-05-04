import { deleteStudySet } from "@/api/studysets";
import { TStudySetSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStudySet(folderId?: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStudySet,

        onMutate: async (deletedStudySetId) => {
            let previousMyStudySets;
            let previousFolderStudySets;

            if (!folderId) {
                await queryClient.cancelQueries({
                    queryKey: ["my-study-sets"],
                });

                alert("no folder id");
                previousMyStudySets = queryClient.getQueryData<
                    TStudySetSummary[]
                >(["my-study-sets"]);

                queryClient.setQueryData(
                    ["my-study-sets"],
                    (oldStudySets: TStudySetSummary[]) =>
                        oldStudySets.filter(
                            (set) => set.id !== deletedStudySetId
                        )
                );
            } else {
                await queryClient.cancelQueries({
                    queryKey: ["study-sets-folder", folderId],
                });

                previousMyStudySets = queryClient.getQueryData<
                    TStudySetSummary[]
                >(["study-sets-folder", folderId]);

                queryClient.setQueryData(
                    ["study-sets-folder", folderId],
                    (oldStudySets: TStudySetSummary[]) =>
                        oldStudySets.filter(
                            (set) => set.id !== deletedStudySetId
                        )
                );
            }

            return { previousMyStudySets, previousFolderStudySets };
        },

        onError: (__, _, context) => {
            if (folderId) {
                queryClient.setQueryData(
                    ["study-sets-,folder", folderId],
                    context?.previousFolderStudySets
                );
            } else {
                queryClient.setQueryData(
                    ["my-study-sets"],
                    context?.previousMyStudySets
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
            queryClient.invalidateQueries({
                queryKey: ["study-sets,folder", folderId],
            });
        },
    });
}
