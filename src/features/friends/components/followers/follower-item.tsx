import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TUser } from "@/types";
import React from "react";

interface FollowerItemProps {
    user: TUser;
}

export const FollowerItem: React.FC<FollowerItemProps> = ({ user }) => {
    return (
        <li className="flex gap-5 items-center">
            <Avatar className="bg-accent h-14 w-14">
                <AvatarImage src={user.profilePicUrl} />
            </Avatar>

            <div>
                <p className="font-semibold"> {user.email}</p>
                <p className="tex-sm text-gray-500">{user.username}</p>
            </div>
        </li>
    );
};
