import { getFollowers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowers = () => {
    return useQuery({
        queryKey: ["followers"],
        queryFn: getFollowers,
    });
};
