import { CombineStudySetItem } from "@/features/studysets/components/combine-study-sets/combine-study-set-item";
import { TStudySetSummary } from "@/types";
import React from "react";

interface StudySetSelectionProps {
    studySets: TStudySetSummary[];
    handleClick: (studySet: TStudySetSummary) => void;
}

export const StudySetSelection: React.FC<StudySetSelectionProps> = ({
    studySets,
    handleClick,
}) => {
    return (
        <ul className="space-y-5">
            {studySets.map((studyset) => {
                return (
                    <CombineStudySetItem
                        studySet={studyset}
                        iconType="plus"
                        key={studyset.id}
                        handleClick={handleClick}
                    />
                );
            })}
        </ul>
    );
};
