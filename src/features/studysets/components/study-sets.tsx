import { StudySetCard } from "./study-set-card";
import { useGetCurrentUserStudySets } from "../hooks";

export const StudySets = () => {
    const { data: studySets } = useGetCurrentUserStudySets();

    return (
        <ul className="grid grid-cols-3 gap-5">
            {studySets?.map((s) => {
                return <StudySetCard studySet={s} key={s.id} />;
            })}
        </ul>
    );
};
