import { ProgressBar } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { useAuthContext } from "@/context/auth/hooks";
import { TUserExperience } from "@/types";
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

    return (
        <div className="flex gap-4 mt-5">
            <div className="bg-primary p-6 rounded-xl space-y-3 grow">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <h4>Level {userExperience?.level.value} : </h4>
                        <h4>{userExperience?.level.title}</h4>
                    </div>
                    <p>
                        {userExperience?.currentExperience} /{" "}
                        {userExperience?.maxXp}
                    </p>
                </div>

                <ProgressBar
                    height={0.5}
                    currentProgress={userExperience?.currentExperience}
                    maxProgress={userExperience?.maxXp}
                />
            </div>
        </div>
    );
};

const UserExperienceCardSkeleton = () => {
    return (
        <div className="w-full bg-primary rounded-xl p-7 gap-4 flex items-center">
            <Skeleton circle className="w-36 h-36" />

            <div className="grow space-y-5">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
            </div>
        </div>
    );
};
