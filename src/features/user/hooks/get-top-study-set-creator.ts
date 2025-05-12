import { getTopStudySetCreator } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetTopStudySetCreator = () => {
    return useQuery({
        queryKey: ["top-study-set-creator"],
        queryFn: getTopStudySetCreator,
    });
};
