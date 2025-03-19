import { deleteFlashcard } from "@/api/flashcard";
import { TStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFlashcard = (studySetId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFlashcard,
        onSuccess: (deletedFlashcard) => {
            queryClient.setQueryData(
                ["flashcards", studySetId],
                (oldData: TStudySet | undefined) => {
                    if (!oldData) return oldData;
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
