import { addRecentStudySet } from "@/api/recent-studysets";
import { TStudySetSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export const useAddRecentStudySet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRecentStudySet,
        onMutate: async (newStudySet) => {
            const updatedStudySet = {
                ...newStudySet,
                accessedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"), // Add or update the `accessedAt` field
            };

            queryClient.cancelQueries({ queryKey: ["recent-study-sets"] });

            const previousRecentStudySets = queryClient.getQueryData<
                TStudySetSummary[]
            >(["recent-study-sets"]);

            // Check if the study set already exists
            const doesStudySetExist = previousRecentStudySets?.some(
                (set) => set.id === newStudySet.id
            );

            console.log(previousRecentStudySets);

            queryClient.setQueryData(
                ["recent-study-sets"],
                (oldData: TStudySetSummary[]) => {
                    if (doesStudySetExist) {
                        return [
                            { ...updatedStudySet },
                            ...oldData.filter(
                                (set) => set.id !== newStudySet.id
                            ),
                        ];
                    }

                    return [updatedStudySet, ...oldData];
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
            // queryClient.invalidateQueries({
            //     queryKey: ["recent-study-sets"],
            //     refetchType: "active",
            // });
        },
    });
};
