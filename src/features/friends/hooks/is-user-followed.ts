import { isUserFollowed } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useIsUserFollowed = (userFollowingId: string) => {
    return useQuery({
        queryKey: ["is-user-followed", userFollowingId],
        queryFn: () => isUserFollowed(userFollowingId),
    });
};
