import { deleteFlashcard } from "@/api/flashcard";
import { TStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteFlashcard = (studySetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFlashcard,
        onMutate: async (deletedFlashcardId) => {
            await queryClient.cancelQueries({
                queryKey: ["study-set", studySetId],
            });

            const previousStudySet = queryClient.getQueryData([
                "study-set",
                studySetId,
            ]);

            queryClient.setQueryData(
                ["study-set", studySetId],
                (oldData: TStudySet) => {
                    return {
                        ...oldData,
                        flashcards: oldData.flashcards.filter(
                            (flashcard) => flashcard.id !== deletedFlashcardId
                        ),
                    };
                }
            );

            return { previousStudySet };
        },

        onError: (error, _, context) => {
            queryClient.setQueryData(
                ["study-set", studySetId],
                context?.previousStudySet
            );

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
