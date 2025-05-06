import { MainLayout } from "@/components/layout";
import { useAuthContext } from "@/context/auth/hooks";
import { studySetMenuData } from "@/data/study-set-menu-data";
import { Groups } from "@/features/groups/components";
import { StudySets, RecentStudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();
    const { user } = useAuthContext();

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
                </ul>
            </section>

            <section className="space-y-3">
                <h5 className="font-bold mt-5">Popular Groups</h5>
                <Groups />
            </section>

            <StudySets studySets={studySets} isPopular />
        </MainLayout>
    );
};
