import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks";
import React from "react";

export const GroupMembers = () => {
    const { user } = useAuthContext();

    return (
        <ul className="space-y-4">
            {Array.from({ length: 4 }).map(() => {
                return (
                    <li className="flex justify-between">
                        <div className="flex gap-10 items-center">
                            <Avatar className="h-16 w-16 border-2 border-accent">
                                <AvatarImage src={user?.profilePicUrl} />
                            </Avatar>
                            <h5>{user?.username}</h5>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
