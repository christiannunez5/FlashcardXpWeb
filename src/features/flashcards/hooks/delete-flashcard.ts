import { deleteFlashcard } from "@/api/flashcard";
import { TFlashcardsByStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFlashcard = (studySetId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFlashcard,
        onSuccess: (deletedFlashcard) => {
            queryClient.setQueryData(
                ["flashcards", studySetId], // Update only this specific study set
                (oldData: TFlashcardsByStudySet | undefined) => {
                    if (!oldData) return oldData; // Ensure data exists before updating
                    return {
                        ...oldData,
                        flashcards: oldData.flashcards.filter(
                            (flashcard) => flashcard.id !== deletedFlashcard.id
                        ),
                    };
                }
            );
        },
    });
};
