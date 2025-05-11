import { getStudySetRecord } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetStudySetRecord = (studySetId: string) => {
    return useQuery({
        queryKey: ["study-set-record", studySetId],
        queryFn: () => getStudySetRecord(studySetId),
    });
};
