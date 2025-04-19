import { MainLayout } from "@/components/layout";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

export const MyStudySets = () => {
    const { data: studySets, isPending } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <div>
                <h4>My studysets</h4>
                <section className="mt-3">
                    {/* TODO: add an actual loading screen or icon */}
                    {isPending || !studySets ? null : (
                        <StudySets studySets={studySets} />
                    )}
                </section>
            </div>
        </MainLayout>
    );
};
