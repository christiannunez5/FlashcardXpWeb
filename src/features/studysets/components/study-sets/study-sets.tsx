import { StudySetCardSkeleton, StudySetCard } from "./study-set-card";
import { TStudySetSummary } from "@/types";
import React from "react";

interface StudySetsProps {
    studySets: TStudySetSummary[] | undefined;
    isPopular?: boolean;
}

export const StudySets: React.FC<StudySetsProps> = ({
    studySets,
    isPopular,
}) => {
    if (!studySets) {
        return (
            <ul className="grid grid-cols-3 gap-4 mt-5">
                {Array.from({ length: 5 }).map(() => (
                    <StudySetCardSkeleton />
                ))}
            </ul>
        );
    }

    return (
        <ul className="grid grid-cols-3 gap-4 ">
            {studySets.map((studySet) => (
                <StudySetCard
                    studySet={studySet}
                    key={studySet.id}
                    isPopular={isPopular}
                />
            ))}
        </ul>
    );
};
