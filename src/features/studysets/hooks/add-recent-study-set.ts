import { addRecentStudySet } from "@/api/recent-studysets";
import { updateStudySet } from "@/api/studysets";
import { TRecentStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export const useAddRecentStudySet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRecentStudySet,
        onMutate: async (newStudySet) => {
            queryClient.cancelQueries({ queryKey: ["recent-study-sets"] });

            const previousRecentStudySets = queryClient.getQueryData<
                TRecentStudySet[]
            >(["recent-study-sets"]);

            // Check if the study set already exists
            const selectedStudySet = previousRecentStudySets?.find(
                (s) => s.id === newStudySet.studySetId
            );

            queryClient.setQueryData(
                ["recent-study-sets"],
                (oldData: TRecentStudySet[]) => {
                    const updatedRecentStudySet = {
                        ...selectedStudySet,
                        accessedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                    };

                    if (selectedStudySet) {
                        return [
                            { ...updatedRecentStudySet },
                            ...oldData.filter(
                                (set) => set.id !== newStudySet.studySetId
                            ),
                        ];
                    }

                    return [updatedRecentStudySet, ...oldData];
                }
            );

            return { previousRecentStudySets };
        },
        onError: (_, __, context) => {
            if (context?.previousRecentStudySets) {
                queryClient.setQueryData(
                    ["recent-study-sets"],
                    context.previousRecentStudySets
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["recent-study-sets"] });
        },
    });
};
