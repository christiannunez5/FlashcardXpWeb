import { useQuery } from "@tanstack/react-query";
import { getCurrentUserStudySets } from "@/api/studysets";

export function useGetCurrentUserStudySets() {
    return useQuery({
        queryKey: ["my-study-sets"],
        queryFn: getCurrentUserStudySets,
    });
}
