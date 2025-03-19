import { addFlashcard } from "@/api/flashcard";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const addFlashcardSchema = z.object({
    term: z.string().nonempty("Term cannot be empty"),
    definition: z.string().nonempty("Definition cannot be empty"),
});

export type TAddFlashcardSchema = z.infer<typeof addFlashcardSchema>;

export const useAddFlashcard = () => {
    return useMutation({
        mutationFn: addFlashcard,
    });
};
