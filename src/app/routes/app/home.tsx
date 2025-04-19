import { MainLayout } from "@/components/layout";
import { useAuthContext } from "@/context/auth/hooks";
import { RecentStudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets, isPending } = useGetRecentStudySets();
    const { user } = useAuthContext();

    return (
        <MainLayout>
            <div className="text-foreground">
                <h4>Welcome, {user?.email}</h4>
                <h4>Recents</h4>

                <section className="mt-3">
                    {isPending ||
                    !recentStudySets ? //     {Array.from({ length: 5 }).map((_, index) => ( // <ul className="flex flex-col gap-2">
                    //         <li
                    //             className="w-full h-14 bg-gray-400 rounded-md"
                    //             key={index}
                    //         ></li>
                    //     ))}
                    // </ul>
                    null : (
                        <RecentStudySets recentStudySets={recentStudySets} />
                    )}
                </section>

                {/* <section className="mt-3">
                    {isPending ? (
                        ""
                    ) : (
                        <StudySets>
                            {recentStudySets?.map((recentStudySet) => {
                                return (
                                    <RecentStudySetCard
                                        studySet={recentStudySet}
                                        key={recentStudySet.id}
                                    />
                                );
                            })}
                        </StudySets>
                    )}
                </section> */}
            </div>
        </MainLayout>
    );
};
