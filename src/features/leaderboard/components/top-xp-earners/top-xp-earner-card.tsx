import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TUserExperience } from "@/types";
import React from "react";

interface TopXpEarnerCardProps {
    topXpEarner: TUserExperience;
    index: number;
}

export const TopXpEarnerCard: React.FC<TopXpEarnerCardProps> = ({
    topXpEarner,
    index,
}) => {
    return (
        <li className="p-5 bg-primary rounded-2xl flex items-center">
            <div className="w-32">
                <div
                    className="h-12 w-12 bg-accent text-accent-foreground grid
                            place-content-center rounded-full"
                >
                    <h5>{index}</h5>
                </div>
            </div>

            <div className="flex gap-8 items-center grow">
                <Avatar className="h-24 w-24 bg-container">
                    <AvatarImage src={topXpEarner.user.profilePicUrl} />
                </Avatar>

                <div className="flex flex-col">
                    <p className="font-semibold">{topXpEarner.user.email}</p>
                    <p className="text-gray-500">{topXpEarner.user.username}</p>
                </div>
            </div>

            <div className="px-10">
                <h5>{topXpEarner.currentExperience} xp earned</h5>
            </div>
        </li>
    );
};
