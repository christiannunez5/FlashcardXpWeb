import { addStudySetRating } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const addStudySetRatingSchema = z.object({
    rating: z.number(),
    reviewText: z.string().default(""),
});

export type TAddStudySetRatingSchema = z.infer<typeof addStudySetRatingSchema>;

export const useAddStudySetRating = () => {
    return useMutation({
        mutationFn: addStudySetRating,
    });
};
