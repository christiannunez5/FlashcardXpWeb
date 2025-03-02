import { useQuery } from "@tanstack/react-query";
import { getStudySets } from "../../../api/studysets";


export const useGetStudySets() => {
    return useQuery({
        queryKey: ["studysets"],
        queryFn: getStudySets
    })
}
