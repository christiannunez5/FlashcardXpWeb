import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import { studySetMenuData } from "@/data/study-set-menu-data";
import { Groups } from "@/features/groups/components";
import { RecentStudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";
import { TMessageReceiveType, useSocket } from "@/hooks/use-socket";
import { socket } from "@/lib/socket";
import { useEffect } from "react";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();
    const { user } = useAuthContext();
    const { send } = useSocket();
    const { data: studySets } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <section className="text-foreground space-y-2">
                <h4>Welcome, {user?.email}</h4>

                <div className="">
                    <RecentStudySets recentStudySets={recentStudySets} />
                </div>
            </section>

            <section className="space-y-3 mt-5">
                <h5>Create</h5>
            
                <ul className="grid grid-cols-4 gap-4">
                    {studySetMenuData.map((data) => {
                        return (
                            <li
                                className="rounded-lg bg-primary p-5 space-y-2 shadow-md 
                                hover:border-2 hover:border-container cursor-pointer"
                            >
                                <img
                                    src={data.icon}
                                    alt=""
                                    className="h-12 w-12"
                                />

                                <p>{data.title}</p>
                            </li>
                        );
                    })}

                    <li
                        onClick={() => {
                            console.log("sending message...");
                            send(
                                "sendToOne",
                                {
                                    type: "new-challenge",
                                    payload: `${user?.id} is challenging you`,
                                },
                                "cf929597-e823-406e-90f5-31aa2ab9c17a"
                            );
                        }}
                        className="rounded-lg bg-primary p-5 space-y-2 shadow-md 
                                hover:border-2 hover:border-container cursor-pointer"
                    >
                        <p>Challenge</p>
                    </li>
                </ul>
            </section>

            <section className="space-y-3">
                <h5 className="font-bold mt-5">Popular Groups</h5>
                <Groups />
            </section>
        </MainLayout>
    );
};
