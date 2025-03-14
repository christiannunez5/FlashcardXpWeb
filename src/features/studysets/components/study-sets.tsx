import { StudySetCard } from "./study-set-card";
import { useGetStudySets } from "../hooks";

export const StudySets = () => {
    const { data: studySets } = useGetStudySets();

    console.log(studySets);
    return (
        <ul className="grid grid-cols-3 gap-5">
            {studySets?.map((s) => {
                return <StudySetCard studySet={s} key={s.id} />;
            })}
        </ul>
    );
};
