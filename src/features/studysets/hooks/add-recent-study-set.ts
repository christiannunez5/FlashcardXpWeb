import { addRecentStudySet } from "@/api/recent-studysets";
import { TStudySetSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRecentStudySet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRecentStudySet,
        onMutate: async (newStudySet) => {
            queryClient.cancelQueries({ queryKey: ["recent-study-sets"] });

            const previousRecentStudySets = queryClient.getQueryData<
                TStudySetSummary[]
            >(["recent-study-sets"]);

            queryClient.setQueryData(
                ["recent-study-sets"],
                (oldData: TStudySetSummary[]) => [...oldData, newStudySet]
            );

            return { previousRecentStudySets, newStudySet };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(
                ["recent-study-sets"],
                context?.previousRecentStudySets
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["recent-study-sets"] });
        },
    });
};
