import { getStudySet } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export function useGetStudySet(studySetId: string) {
    return useQuery({
        queryKey: ["study-set", studySetId],
        queryFn: () => getStudySet(studySetId),
    });
}
