import { followUser } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollowUser = (userFollowingId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: followUser,
        onMutate: async () => {
            queryClient.invalidateQueries({
                queryKey: ["is-user-followed", userFollowingId],
            });

            const previousIsUserFollowed = queryClient.getQueryData<boolean>([
                "is-user-followed",
                userFollowingId,
            ]);

            queryClient.setQueryData(
                ["is-user-followed", userFollowingId],
                () => {
                    return true;
                }
            );

            return { previousIsUserFollowed };
        },

        onError(_, __, context) {
            queryClient.setQueryData(
                ["is-user-followed", userFollowingId],
                context?.previousIsUserFollowed
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["is-user-followed"] });
            queryClient.invalidateQueries({ queryKey: ["followings"] });
        },
    });
};
