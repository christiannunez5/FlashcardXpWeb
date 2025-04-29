import { getCurrentUserGroups } from "@/api/groups";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserGroups = () => {
    return useQuery({
        queryKey: ["groups"],
        queryFn: getCurrentUserGroups,
    });
};
