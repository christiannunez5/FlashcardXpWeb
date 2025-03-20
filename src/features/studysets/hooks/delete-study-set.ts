import { deleteStudySet } from "@/api/studysets";
import { TStudySetSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStudySet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStudySet,

        onMutate: async (deletedStudySetId) => {
            await queryClient.cancelQueries({ queryKey: ["my-study-sets"] });

            const previousStudySets = queryClient.getQueryData<
                TStudySetSummary[]
            >(["my-study-sets"]);

            queryClient.setQueryData(
                ["my-study-sets"],
                (oldStudySets: TStudySetSummary[]) =>
                    oldStudySets.filter((set) => set.id !== deletedStudySetId)
            );

            return { previousStudySets };
        },

        onError: (error, _, context) => {
            queryClient.setQueryData(
                ["my-study-sets"],
                context?.previousStudySets
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
        },
    });
}
