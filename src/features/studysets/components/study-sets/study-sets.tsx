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
            <section className="space-y-3 mt-5">
                <h5>Studysets</h5>
                <ul className="grid grid-cols-4 gap-4 mt-5">
                    {Array.from({ length: 5 }).map(() => (
                        <StudySetCardSkeleton />
                    ))}
                </ul>
            </section>
        );
    }

    if (studySets.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3 mt-5">
            <h5>{!isPopular ? "Studysets" : "Popular studysets"}</h5>
            <ul className="grid grid-cols-4 gap-4 ">
                {studySets.map((studySet) => (
                    <StudySetCard
                        studySet={studySet}
                        key={studySet.id}
                        isPopular={isPopular}
                    />
                ))}
            </ul>
        </section>
    );
};
