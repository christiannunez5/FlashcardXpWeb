import { addCompletedFlashcard } from "@/api/completed-flashcard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCompletedFlashcard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCompletedFlashcard,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["completed-flashcards"],
            });
        },
    });
};
