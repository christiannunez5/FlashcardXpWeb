import { getStudySetFlashcards } from "@/api/flashcard";
import { useQuery } from "@tanstack/react-query";

export function useGetStudySetFlashcards(studySetId: string) {
    return useQuery({
        queryKey: ["flashcards", studySetId],
        queryFn: () => getStudySetFlashcards(studySetId),
    });
}
