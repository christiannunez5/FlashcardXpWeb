import { updateStudySetRating } from "@/api/studysets";
import { TStudySetRating } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStudySetRating = (studySetId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStudySetRating,
        onMutate: async (data) => {
            queryClient.cancelQueries({
                queryKey: ["study-set-rating", studySetId],
            });

            const previousStudySetRating =
                queryClient.getQueryData<TStudySetRating>([
                    "study-set-rating",
                    studySetId,
                ]);

            const userStudySetRating = queryClient.getQueryData<number>([
                "study-set-user-review",
                studySetId,
            ]);

            queryClient.setQueryData(
                ["study-set-rating", studySetId],
                (oldData: TStudySetRating) => {
                    const newAverage =
                        (oldData.averageRating * oldData.ratedByCount -
                            userStudySetRating! +
                            data.data.rating) /
                        oldData.ratedByCount;

                    return {
                        averageRating: newAverage,
                        ratedByCount: oldData.ratedByCount,
                    };
                }
            );

            return { previousStudySetRating };
        },
    });
};
