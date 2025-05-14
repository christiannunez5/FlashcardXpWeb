import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth/hooks";
import { studySetMenuData } from "@/data/study-set-menu-data";
import {
    PopularStudySets,
    RecentStudySets,
} from "@/features/studysets/components";
import {
    useCreateDraftStudySet,
    useGetPopularStudySets,
} from "@/features/studysets/hooks";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";
import { InferenceClient } from "@huggingface/inference";

import axios from "axios";
import { useParams } from "react-router";

export const Home = () => {
    const { mutate: createDraftStudySet } = useCreateDraftStudySet();
    const params = useParams();
    const { data: recentStudySets } = useGetRecentStudySets();
    const { user } = useAuthContext();
    const { data: popularStudySets } = useGetPopularStudySets();

    const handleCreateDraftStudySet = (action: string) => {
        if (action === "create-study-set") {
            const data = {
                folderId: params.id,
            };

            createDraftStudySet(
                { data },
                {
                    onSuccess: (createdStudySetId) => {
                        window.location.href = `/study-set/${createdStudySetId}/edit`;
                    },
                }
            );
        } else if (action === "create-study-set-ai") {
            window.location.href = "/study-set/ai-upload";
        }
    };

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
                                className="rounded-lg bg-primary p-5 space-y-2 shadow-xs
                                hover:border-2 hover:border-container cursor-pointer"
                                onClick={() =>
                                    handleCreateDraftStudySet(data.action)
                                }
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
                </ul>
            </section>

            {/* <section className="space-y-3">
                <h5 className="font-bold mt-5">Popular Groups</h5>
                <Groups />
            </section> */}

            <section className="mt-5 space-y-4">
                <h5 className="font-bold mt-5">Popular Sets</h5>
                <PopularStudySets studySets={popularStudySets} />
            </section>

            <section className="mt-5 space-y-4">
                <h5 className="font-bold mt-5">Challenge</h5>
                <ul className="grid grid-cols-4 gap-4">
                    <li
                        className="rounded-lg bg-primary p-5 space-y-3 shadow-xs
                                hover:border-2 hover:border-container cursor-pointer"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/7675/7675020.png"
                            alt=""
                            className="h-12 w-12"
                        />

                        <p>
                            Challenge friends to a fast-paced Bomb Party
                            showdown!
                        </p>
                    </li>
                </ul>
            </section>
        </MainLayout>
    );
};
