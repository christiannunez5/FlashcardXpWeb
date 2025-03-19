import { updateFlashcard } from "@/api/flashcard";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const updateFlashcardSchema = z.object({
    term: z.string().min(6, "Term should be atleast 6 characters."),
    definition: z.string().min(1, "Definition is required."),
});

export type TUpdateFlashcardSchema = z.infer<typeof updateFlashcardSchema>;

export const useUpdateFlashcard = () => {
    return useMutation({
        mutationFn: updateFlashcard,
    });
};
