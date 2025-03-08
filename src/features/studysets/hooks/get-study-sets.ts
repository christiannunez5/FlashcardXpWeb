import { useQuery } from "@tanstack/react-query";
import { getCurrentUserStudySets } from "@/api/studysets";

export function useGetStudySets() {
    return useQuery({
        queryKey: ["studysets"],
        queryFn: getCurrentUserStudySets,
    });
}
