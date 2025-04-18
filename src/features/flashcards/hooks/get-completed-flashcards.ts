import { getCompletedFlashcards } from "@/api/completed-flashcard";
import { useQuery } from "@tanstack/react-query";

export const useGetCompletedFlashcards = () => {
    return useQuery({
        queryKey: ["completed-flashcards"],
        queryFn: getCompletedFlashcards,
    });
};
