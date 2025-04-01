import { RecentStudySetCard, StudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

const Home = () => {
    const { data: recentStudySets, isLoading } = useGetRecentStudySets();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-foreground">
            <h4>Recents</h4>
            <div className="mt-3">
                <StudySets>
                    {recentStudySets?.map((recentStudySet) => {
                        return <RecentStudySetCard studySet={recentStudySet} />;
                    })}
                </StudySets>
            </div>
        </div>
    );
};

export default Home;
