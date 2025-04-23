import { updateFlashcard } from "@/api/flashcard";
import { TStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

export const updateFlashcardSchema = z.object({
    id: z.string().optional(),
    term: z.string().min(1, "Term is required."),
    definition: z.string().min(1, "Definition is required."),
});

export type TUpdateFlashcardSchema = z.infer<typeof updateFlashcardSchema>;

export const useUpdateFlashcard = (studySetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFlashcard,
        onMutate: async (updatedFlashcard) => {
            await queryClient.cancelQueries({
                queryKey: ["study-set", studySetId],
            });
            const previousStudySet = queryClient.getQueryData<TStudySet>([
                "study-set",
                studySetId,
            ]);
            queryClient.setQueryData(
                ["study-set", studySetId],
                (oldData: TStudySet) => {
                    if (updatedFlashcard.data.id) {
                        return {
                            ...oldData,
                            flashcards: oldData.flashcards.map((flashcard) =>
                                flashcard.id === updatedFlashcard.data.id
                                    ? { ...flashcard, ...updatedFlashcard }
                                    : flashcard
                            ),
                        };
                    }
                    return {
                        ...oldData,
                        flashcards: [
                            ...oldData.flashcards,
                            updatedFlashcard.data,
                        ],
                    };
                }
            );
            return { previousStudySet, updatedFlashcard };
        },

        onError: (error, _, context) => {
            queryClient.setQueryData(["study-set"], context?.previousStudySet);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-set", studySetId],
            });
        },
    });
};
