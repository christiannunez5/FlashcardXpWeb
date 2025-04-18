import { getCompletedFlashcards } from "@/api/completed-flashcard";
import { useQuery } from "@tanstack/react-query";

export const useGetCompletedFlashcards = () => {
    return useQuery({
        queryFn: getCompletedFlashcards,
        queryKey: ["completed-flashcards"],
    });
};
