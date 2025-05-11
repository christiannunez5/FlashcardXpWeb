import { PopularStudySetCardSkeleton } from "./popular-study-set-card-skeleton";
import { TStudySetSummary } from "@/types";
import React from "react";
import { PopularStudySetCard } from "./popular-study-set-card";

interface PopularStudySetsProps {
    studySets: TStudySetSummary[] | undefined;
}

export const PopularStudySets: React.FC<PopularStudySetsProps> = ({
    studySets,
}) => {
    if (!studySets) {
        return (
            <ul className="grid  grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map(() => {
                    return <PopularStudySetCardSkeleton />;
                })}
            </ul>
        );
    }

    return (
        <ul className="grid  grid-cols-4 gap-4">
            {studySets.map((studyset) => {
                return (
                    <PopularStudySetCard
                        studySet={studyset}
                        key={studyset.id}
                    />
                );
            })}
        </ul>
    );
};
