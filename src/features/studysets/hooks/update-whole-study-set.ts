import { updateStudySet } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const flashcardSchema = z.object({
    id: z.string().optional(),
    term: z.string().min(1, "Term is required."),
    definition: z.string().min(1, "Definition is required."),
});

export const updateWholeStudySetSchema = z.object({
    title: z.string().min(6, "Title must have atleast 6 characters"),
    description: z.string().optional(),
    isPublic: z.boolean().optional(),
    flashcards: z
        .array(flashcardSchema)
        .min(4, "Please create atleast 4 flashcards."),
});

export type TUpdateWholeStudySetSchema = z.infer<
    typeof updateWholeStudySetSchema
>;

export const useUpdateWholeStudySet = () => {
    return useMutation({
        mutationFn: updateStudySet,
    });
};
