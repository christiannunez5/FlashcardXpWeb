import { MainLayout } from "@/components/layout";
import { RecentStudySetCard, StudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();
    
    return (
        <MainLayout>
            <div className="text-foreground">
                <h4>Recents</h4>
                <div className="mt-3">
                    <StudySets>
                        {recentStudySets?.map((recentStudySet) => {
                            return (
                                <RecentStudySetCard studySet={recentStudySet} />
                            );
                        })}
                    </StudySets>
                </div>
            </div>
        </MainLayout>
    );
};
