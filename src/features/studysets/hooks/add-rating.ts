import { addStudySetRating } from "@/api/studysets";
import { TStudySetRating } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const addStudySetRatingSchema = z.object({
    rating: z.number(),
    reviewText: z.string().default(""),
});

export type TAddStudySetRatingSchema = z.infer<typeof addStudySetRatingSchema>;

export const useAddStudySetRating = (studySetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addStudySetRating,
        onMutate: async (data) => {
            queryClient.cancelQueries({
                queryKey: ["study-set-rating", studySetId],
            });

            const previousStudySetRating =
                queryClient.getQueryData<TStudySetRating>([
                    "study-set-rating",
                    studySetId,
                ]);

            const previousUserRating = queryClient.getQueryData<number>([
                "study-set-user-review",
                studySetId,
            ]);

            queryClient.setQueryData(
                ["study-set-user-review", studySetId],
                () => {
                    return data.data.rating;
                }
            );

            queryClient.setQueryData(
                ["study-set-rating", studySetId],
                (oldData: TStudySetRating) => {
                    const newRatedByCount = oldData.ratedByCount + 1;
                    const newAverageRating =
                        (oldData.averageRating * oldData.ratedByCount +
                            data.data.rating) /
                        newRatedByCount;
                    return {
                        averageRating: newAverageRating,
                        ratedByCount: newRatedByCount,
                    };
                }
            );

            return { previousStudySetRating };
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-set-rating", studySetId],
            });
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(
                ["study-set-rating", studySetId],
                context?.previousStudySetRating
            );
        },
    });
};
