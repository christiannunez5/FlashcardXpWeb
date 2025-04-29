import { ProgressBar } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import { TUserExperience } from "@/types";
import React from "react";

interface UserExperienceCardProps {
    userExperience?: TUserExperience;
}

export const UserExperienceCard: React.FC<UserExperienceCardProps> = ({
    userExperience,
}) => {
    const { user } = useAuthContext();

    if (!userExperience || !user) {
        return <UserExperienceCardSkeleton />;
    }

    return (
        <div className="w-full bg-primary rounded-xl p-5">
            {/* <div className="w-full flex ">
                <Avatar className="h-28 w-28 bg-accent">
                    <AvatarImage src={user.profilePicUrl} />
                </Avatar>

                <div className="grow flex flex-col items-center">
                    <div className="w-fit flex gap-2">
                        <h4>mark.nnz</h4>
                        <div className="bg-container rounded-lg p-2">
                            Edit profile
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <h5>0 studysets</h5>
                        <h5>19 followers</h5>
                        <h5>25 following</h5>
                    </div>
                </div>
            </div> */}
            <div className="w-full flex items-center gap-8">
                <Avatar className="h-36 w-36 bg-accent">
                    <AvatarImage src={user.profilePicUrl} />
                </Avatar>

                <div className="space-y-3">
                    <div className="w-full flex gap-5 items-center">
                        <h4>nunezchristian77@gmail.com</h4>
                    </div>
                    <div className="flex gap-8 w-full ">
                        <p className="cursor-pointer">5 followers</p>
                        <p className="cursor-pointer">10 following</p>
                    </div>
                </div>
                {/* <div className="grow space-y-3">
                    <div className="flex justify-between">
                        <h4>
                            {`${userExperience.level.title} : ${userExperience.level.value}`}
                        </h4>
                        <p>
                            {userExperience.currentExperience} /{" "}
                            {userExperience.maxXp} XP
                        </p>
                    </div>

                    <ProgressBar
                        height={1}
                        currentProgress={userExperience.currentExperience}
                        maxProgress={userExperience.maxXp}
                    />
                </div> */}
            </div>

            {/* <div className="grow space-y-3">
                    <div className="flex justify-between">
                        <h4>
                            {`${userExperience.level.title} : ${userExperience.level.value}`}
                        </h4>
                        <p>
                            {userExperience.currentExperience} /{" "}
                            {userExperience.maxXp} XP
                        </p>
                    </div>

                    <ProgressBar
                        height={1}
                        currentProgress={userExperience.currentExperience}
                        maxProgress={userExperience.maxXp}
                    />
                </div> */}
        </div>
    );
};

const UserExperienceCardSkeleton = () => {
    return (
        <div className="w-full bg-primary rounded-xl p-7 gap-4 flex items-center">
            <Skeleton circle width={100} height={100} />

            <div className="grow space-y-3">
                <div className="flex justify-between">
                    <Skeleton height={15} width={300} />
                    <Skeleton height={15} width={150} />
                </div>
                <Skeleton height={15} />
            </div>
        </div>
    );
};
