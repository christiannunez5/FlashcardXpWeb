import { MainLayout } from "@/components/layout";
import { RecentStudySetCard, StudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();

    return (
        <MainLayout>
            <div className="text-foreground">
                <h4>Recents</h4>
                <section className="mt-3">
                    <StudySets>
                        {recentStudySets?.map((recentStudySet, index) => {
                            return (
                                <RecentStudySetCard
                                    studySet={recentStudySet}
                                    key={index}
                                />
                            );
                        })}
                    </StudySets>
                </section>
            </div>
        </MainLayout>
    );
};
