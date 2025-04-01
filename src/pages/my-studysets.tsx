import { StudySetCard, StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

const MyStudySets = () => {
    const { data: studySets, isLoading } = useGetCurrentUserStudySets();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <StudySets>
                {studySets?.map((s) => {
                    return <StudySetCard studySet={s} key={s.id} />;
                })}
            </StudySets>
        </div>
    );
};

export default MyStudySets;
