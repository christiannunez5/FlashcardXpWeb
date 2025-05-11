import { Skeleton } from "@/components/shared/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import { useFollowUser, useIsUserFollowed } from "@/features/friends/hooks";
import { TUser } from "@/types";
import React from "react";

interface UserFindFriendItemProps {
    user: TUser;
}

export const UserFindFriendItem: React.FC<UserFindFriendItemProps> = ({
    user,
}) => {
    const { user: currentUser } = useAuthContext();
    const { mutate: followUser } = useFollowUser(user.id);
    const { data: isUserfollowed } = useIsUserFollowed(user.id);

    const handleFollowUser = () => {
        followUser(user.id);
    };

    const renderFollowButton = () => {
        if (currentUser?.id === user.id) return null;

        if (isUserfollowed === undefined) {
            return <Skeleton className="h-12" />;
        }

        if (isUserfollowed) {
            return null;
        }
        return (
            <div className="ml-auto">
                <Button
                    variant="outline"
                    className="text-sm px-9 rounded-full"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </Button>
            </div>
        );
    };

    return (
        <li className="flex gap-5 items-center">
            <Avatar className="bg-accent h-14 w-14">
                <AvatarImage src={user.profilePicUrl} />
            </Avatar>

            <div>
                <p className="font-semibold"> {user.email}</p>
                <p className="tex-sm text-gray-500">{user.username}</p>
            </div>

            {renderFollowButton()}
        </li>
    );
};
