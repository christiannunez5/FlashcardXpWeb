import { getTopXpEarners } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetTopXpEarners = () => {
    return useQuery({
        queryFn: getTopXpEarners,
        queryKey: ["top-xp-earners"],
    });
};
