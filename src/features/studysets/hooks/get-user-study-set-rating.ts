import { getUserStudySetRating } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetUserStudySetRating = (studySetId: string) => {
    return useQuery({
        queryKey: ["study-set-user-review", studySetId],
        queryFn: () => getUserStudySetRating(studySetId),
    });
};
