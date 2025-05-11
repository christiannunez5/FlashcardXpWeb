import { getFollowings } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetFollowing = () => {
    return useQuery({
        queryKey: ["followings"],
        queryFn: getFollowings,
    });
};
