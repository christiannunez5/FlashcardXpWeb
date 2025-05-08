import { updateStudySetFolder } from "@/api/studysets";
import { TStudySetSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStudySetFolder = (folderId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStudySetFolder,
        onMutate: async (data) => {
            let previousMyStudySets;
            let previousFolderStudySets;

            queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
            queryClient.invalidateQueries({
                queryKey: ["study-sets-folder", folderId],
            });

            if (folderId) {
                previousFolderStudySets = queryClient.getQueryData<
                    TStudySetSummary[]
                >(["study-sets-folder", folderId]);

                queryClient.setQueryData(
                    ["study-sets-folder", folderId],
                    (oldStudySets: TStudySetSummary[]) => {
                        return oldStudySets.filter(
                            (s) => s.id !== data.studySetId
                        );
                    }
                );
            } else {
                previousMyStudySets = queryClient.getQueryData<
                    TStudySetSummary[]
                >(["my-study-sets"]);

                queryClient.setQueryData(
                    ["my-study-sets"],
                    (oldStudySets: TStudySetSummary[]) => {
                        return oldStudySets.filter(
                            (s) => s.id !== data.studySetId
                        );
                    }
                );
            }

            return { previousFolderStudySets, previousMyStudySets };
        },
        onSettled() {
            if (folderId) {
                queryClient.invalidateQueries({
                    queryKey: ["study-sets-folder", folderId],
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
            }
        },
        onError(error, variables, context) {
            if (folderId) {
                queryClient.setQueryData(
                    ["study-sets-folder", folderId],
                    context?.previousFolderStudySets
                );
            } else {
                queryClient.setQueryData(
                    ["my-study-sets"],
                    context?.previousMyStudySets
                );
            }
        },
    });
};
