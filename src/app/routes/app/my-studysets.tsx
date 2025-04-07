import { MainLayout } from "@/components/layout";
import { StudySetCard, StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

export const MyStudySets = () => {
    const { data: studySets, isPending } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <section>
                {/* TODO: add an actual loading screen or icon */}
                {isPending ? (
                    <div>Loading...</div>
                ) : (
                    <StudySets>
                        {studySets?.map((s) => {
                            return <StudySetCard studySet={s} key={s.id} />;
                        })}
                    </StudySets>
                )}
            </section>
        </MainLayout>
    );
};
