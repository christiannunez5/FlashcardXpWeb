import { MainLayout } from "@/components/layout";
import { RecentStudySetCard, StudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets, isPending } = useGetRecentStudySets();

    console.log(recentStudySets);

    return (
        <MainLayout>
            <div className="text-foreground">
                <h4>Recents</h4>

                <section className="mt-3">
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
                </section>
            </div>
        </MainLayout>
    );
};
