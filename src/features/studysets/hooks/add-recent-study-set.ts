import { addRecentStudySet } from "@/api/recent-studysets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRecentStudySet = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: addRecentStudySet,
        // onMutate: async (newStudySet) => {
        //     queryClient.cancelQueries({ queryKey: ["recent-study-sets"] });
        //     const previousRecentStudySets = queryClient.getQueryData<
        //         TRecentStudySet[]
        //     >(["recent-study-sets"]);

        //     const selectedStudySet = queryClient.getQueryData<TStudySet>([
        //         "study-set",
        //         newStudySet.studySetId,
        //     ]);

        //     const isStudySetAlreadyAdded = previousRecentStudySets?.some(
        //         (s) => s.id === newStudySet.studySetId
        //     );

        //     queryClient.setQueryData(
        //         ["recent-study-sets"],
        //         (oldData: TRecentStudySet[]) => {
        //             if (isStudySetAlreadyAdded) {
        //                 const updatedRecentStudySet = {
        //                     ...selectedStudySet,
        //                     accessedAt: format(
        //                         new Date(),
        //                         "yyyy-MM-dd HH:mm:ss"
        //                     ),
        //                 };
        //                 return [
        //                     { ...updatedRecentStudySet },
        //                     ...oldData.filter(
        //                         (set) => set.id !== newStudySet.studySetId
        //                     ),
        //                 ];
        //             }

        //             return [selectedStudySet, ...oldData];
        //         }
        //     );
        //     return { previousRecentStudySets };
        // },
        // onError: (_, __, context) => {
        //     if (context?.previousRecentStudySets) {
        //         queryClient.setQueryData(
        //             ["recent-study-sets"],
        //             context.previousRecentStudySets
        //         );
        //     }
        // },

        // onSettled: () => {},

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recent-study-sets"] });
        },
    });
};
