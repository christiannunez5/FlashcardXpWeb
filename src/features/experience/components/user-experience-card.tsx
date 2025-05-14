import { ProgressBar } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { Progress } from "@/components/ui/progress";
import { useAuthContext } from "@/context/auth/hooks";
import { TUserExperience } from "@/types";
import { getPercentage } from "@/utils";
import React from "react";

interface UserExperienceCardProps {
    userExperience: TUserExperience | undefined;
}

export const UserExperienceCard: React.FC<UserExperienceCardProps> = ({
    userExperience,
}) => {
    const { user } = useAuthContext();

    if (!userExperience || !user) {
        return <UserExperienceCardSkeleton />;
    }

    const value = getPercentage(
        userExperience.currentExperience,
        userExperience.maxXp
    );

    return (
        <div className="bg-primary p-8 rounded-xl space-y-3 grow">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <h3>Level {userExperience?.level.value} : </h3>
                    <h3>{userExperience?.level.title}</h3>
                </div>
                <p>
                    {userExperience?.currentExperience} /{" "}
                    {userExperience?.maxXp} xp
                </p>
            </div>

            <Progress value={value} className="border-2 border-container h-3" />
        </div>
    );
};

const UserExperienceCardSkeleton = () => {
    return (
        <div className="bg-primary p-8 rounded-xl space-y-10 grow">
            <Skeleton className="h-2 w-full" />

            <Skeleton className="h-2 w-full" />
        </div>
    );
};
