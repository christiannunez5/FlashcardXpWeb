import { MainLayout } from "@/components/layout";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

export const MyStudySets = () => {
    const { data: studySets } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <div>
                <h4>My studysets</h4>
                <section className="mt-3">
                    <StudySets studySets={studySets} />
                </section>
            </div>
        </MainLayout>
    );
};
