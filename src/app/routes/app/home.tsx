import { MainLayout } from "@/components/layout";
import { useAuthContext } from "@/context/auth/hooks";
import { RecentStudySets } from "@/features/studysets/components";
import { useGetRecentStudySets } from "@/features/studysets/hooks/get-recent-study-sets";

export const Home = () => {
    const { data: recentStudySets } = useGetRecentStudySets();
    const { user } = useAuthContext();

    return (
        <MainLayout>
            <div className="text-foreground">
                <h4>Welcome, {user?.email}</h4>
                <h4>Recents</h4>

                <section className="mt-3">
                    <RecentStudySets recentStudySets={recentStudySets} />
                </section>
            </div>
        </MainLayout>
    );
};
