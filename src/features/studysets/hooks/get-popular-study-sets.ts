import { getPopularStudySets } from "@/api/studysets";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularStudySets = () => {
    return useQuery({
        queryKey: ["popular-study-sets"],
        queryFn: getPopularStudySets,
    });
};
