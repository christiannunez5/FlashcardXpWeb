import { Skeleton } from "@/components/shared/skeleton";
import { FollowerItem } from "@/features/friends/components/followers/follower-item";
import { TUser } from "@/types";
import React from "react";

interface FollowersListProps {
    users: TUser[] | undefined;
}

export const FollowersList: React.FC<FollowersListProps> = ({ users }) => {
    if (!users) {
        return (
            <ul className="space-y-3">
                {Array.from({ length: 7 }).map(() => {
                    return (
                        <li className="flex gap-5 items-center">
                            <Skeleton className="h-12 w-12" circle />
                            <Skeleton className="w-full h-2 grow" />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <ul className="space-y-3">
            {users.map((user) => {
                return <FollowerItem user={user} key={user.id} />;
            })}
        </ul>
    );
};
