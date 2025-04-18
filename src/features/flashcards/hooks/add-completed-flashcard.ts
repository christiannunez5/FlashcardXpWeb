import { addCompletedFlashcard } from "@/api/completed-flashcard";
import { TCompletedFlashcard } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCompletedFlashcard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCompletedFlashcard,
        onMutate: () => {
            queryClient.cancelQueries({ queryKey: ["completed-flashcards"] });

            const previousCompletedFlashcards =
                queryClient.getQueryData<TCompletedFlashcard>([
                    "completed-flashcards",
                ]);

            queryClient.setQueryData(
                ["completed-flashcards"],
                (oldData: TCompletedFlashcard) => {
                    return (oldData.count += 1);
                }
            );

            return { previousCompletedFlashcards };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(
                ["completed-flashcards"],
                context?.previousCompletedFlashcards
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: "completed-flashcards" });
        },
    });
};
