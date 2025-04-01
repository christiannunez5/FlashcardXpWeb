import { PropsWithChildren } from "react";

export const StudySets = ({ children }: PropsWithChildren) => {
    return (
        <ul className="grid grid-cols-3 gap-5">
            {/* {studySets?.map((s) => {
                return <StudySetCard studySet={s} key={s.id} />;
            })} */}

            {children}
        </ul>
    );
};
