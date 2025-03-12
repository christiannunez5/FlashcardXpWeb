import { addStudyset } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const flashcardSchema = z.object({
    term: z.string().min(1, "Term is required."),
    definition: z.string().min(1, "Definition is required."),
});

export const studySetWithFlashcardsSchema = z.object({
    title: z.string().min(6, "Please enter atleast 6 characters"),
    description: z.string().optional(),
    isPublic: z.boolean().optional(),
    flashcards: z
        .array(flashcardSchema)
        .min(4, "Please create atleast 4 flashcards."),
});

export type TStudySetWithFlashcardsSchema = z.infer<
    typeof studySetWithFlashcardsSchema
>;

export const useAddStudySet = () => {
    return useMutation({
        mutationFn: addStudyset,
        onSuccess: (studySetId) => {
            window.location.href = `/studyset/${studySetId}/flashcards`;
        },
    });
};
