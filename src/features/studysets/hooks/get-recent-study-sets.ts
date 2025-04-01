import { getRecentStudySets } from "@/api/recent-studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetRecentStudySets = () => {
    return useQuery({
        queryKey: ["recent-study-sets"],
        queryFn: getRecentStudySets,
    });
};
