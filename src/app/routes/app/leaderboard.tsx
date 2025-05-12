import { MainLayout } from "@/components/layout";
import { TopCreatorList } from "@/features/leaderboard/components";
import { useGetTopStudySetCreator } from "@/features/user/hooks";

export const Leaderboard = () => {
    const { data: topCreators } = useGetTopStudySetCreator();

    console.log(topCreators);

    return (
        <MainLayout size={70}>
            <h3 className="text-center">Top Creators</h3>

            <div className="mt-5">
                <TopCreatorList topCreators={topCreators} />
            </div>
        </MainLayout>
    );
};
