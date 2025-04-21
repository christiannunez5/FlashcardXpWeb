import { addCompletedFlashcard } from "@/api/completed-flashcard";
import { useMutation } from "@tanstack/react-query";

export const useAddCompletedFlashcard = () => {
    return useMutation({
        mutationFn: addCompletedFlashcard,
    });
};
