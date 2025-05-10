import { MainLayout } from "@/components/layout";
import { ProgressBar } from "@/components/shared";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import { UserExperienceCard } from "@/features/experience/components";
import { useGetCurrentUserExperience } from "@/features/experience/hooks";
import { FindFriendsModal } from "@/features/friends/components/find-friends/find-friends-modal";
import { useSocket } from "@/hooks/use-socket";
import * as signalR from "@microsoft/signalr";
import { Flame } from "lucide-react";
import { useEffect } from "react";

export const Profile = () => {
    const { data: userExperience } = useGetCurrentUserExperience();
    const { user } = useAuthContext();
    const { send, receive } = useSocket();

    const userChallengeId = "82dfbb96-6445-4092-a3bf-072bc4b81cc1";

    const handleSendChallenge = () => {
        send(
            "sendToOne",
            {
                type: "new-challenge",
                payload: {
                    userId: "asdasd",
                    data: "dfgdfgdfg",
                },
            },
            userChallengeId
        );
    };

    return (
        <MainLayout size={60}>
            {/* <section>
                <UserExperienceCard userExperience={userExperience} />
            </section>

            <section>
                <div></div>
            </section>

            <section className="mt-4">
                <div className="bg-primary p-4 ">
                    <Avatar>
                        <AvatarImage src={userExperience?.user.profilePicUrl} />
                    </Avatar>
                </div>
            </section> */}

            <section>
                <div className="bg-primary rounded-xl p-5 ">
                    <div className="bg-container h-72 rounded-xl relative">
                        <Avatar className="h-24 w-24 bg-accent absolute left-5 -bottom-10">
                            <AvatarImage
                                src={userExperience?.user.profilePicUrl}
                            />
                        </Avatar>
                    </div>

                    <p className="pt-16">
                        <div className="space-x-3">
                            <Button
                                variant={"outline"}
                                className="bg-primary rounded-full
                            px-6 py-3"
                            >
                                0 followers
                            </Button>

                            <Button
                                variant={"outline"}
                                className="bg-primary rounded-full
                            px-6 py-3"
                            >
                                0 following
                            </Button>

                            {/* <Button
                                variant={"outline"}
                                className="bg-primary rounded-full
                            px-6 py-3"
                            >
                                Find friends
                            </Button> */}

                            <FindFriendsModal />
                        </div>
                    </p>
                </div>

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
                            currentProgress={userExperience?.currentExperience}
                            maxProgress={userExperience?.maxXp}
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
