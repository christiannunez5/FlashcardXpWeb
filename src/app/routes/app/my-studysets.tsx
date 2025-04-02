import { MainLayout } from "@/components/layout";
import { StudySetCard, StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

export const MyStudySets = () => {
    const { data: studySets, isLoading } = useGetCurrentUserStudySets();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <MainLayout>
            <StudySets>
                {studySets?.map((s) => {
                    return <StudySetCard studySet={s} key={s.id} />;
                })}
            </StudySets>
        </MainLayout>
    );
};
