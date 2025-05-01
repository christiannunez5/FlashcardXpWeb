import { getStudySetRating } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetStudySetRating = (studySetId: string) => {
    return useQuery({
        queryKey: ["study-set-rating", studySetId],
        queryFn: () => getStudySetRating(studySetId),
    });
};
