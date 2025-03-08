import { useQuery } from "@tanstack/react-query";
import { getStudySets } from "@/api/studysets";

export function useGetStudySets() {
    return useQuery({
        queryKey: ["studysets"],
        queryFn: getStudySets,
    });
}
