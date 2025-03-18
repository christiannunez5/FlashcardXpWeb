import { updateStudySet } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const flashcardSchema = z.object({
    id: z.string().optional(),
    term: z.string().min(1, "Term is required."),
    definition: z.string().min(1, "Definition is required."),
});

export const updateStudySetSchema = z.object({
    title: z.string().min(6, "Title must have atleast 6 characters"),
    description: z.string().optional(),
    isPublic: z.boolean().optional(),
});

export type TUpdateStudySetSchema = z.infer<typeof updateStudySetSchema>;

export const useUpdateFlashcards = () => {
    return useMutation({
        mutationFn: updateStudySet,
    });
};
