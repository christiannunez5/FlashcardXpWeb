import { getFlashcardsByStudySet } from "@/api/flashcard";
import { useQuery } from "@tanstack/react-query";

export function useGetFlashcardsByStudySet(studySetId: string) {
    return useQuery({
        queryKey: ["flashcards", studySetId],
        queryFn: () => getFlashcardsByStudySet(studySetId),
    });
}
