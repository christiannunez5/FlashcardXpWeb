import { getStudySetTags } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetStudySetTags = (studySetId: string) => {
    return useQuery({
        queryFn: () => getStudySetTags(studySetId),
        queryKey: ["study-set-tags", studySetId],
    });
};
