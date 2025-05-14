import { Button } from "@/components/ui/button";
import { CombineStudySetItem } from "@/features/studysets/components/combine-study-sets/combine-study-set-item";
import { useCombineStudySets } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import React, { FormEvent } from "react";

interface SelectedStudySetsProps {
    studySets: TStudySetSummary[];
    handleButtonClick: (studySet: TStudySetSummary) => void;
}

export const SelectedStudySets: React.FC<SelectedStudySetsProps> = ({
    studySets,
    handleButtonClick,
}) => {
    const { mutate: combineStudySets } = useCombineStudySets();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const studySetsIds = studySets.map((s) => s.id);

        console.log(studySetsIds);
        combineStudySets(
            {
                studySetIds: studySetsIds,
            },
            {
                onSuccess: (createdStudySetId) => {
                    window.location.href = `/study-set/${createdStudySetId}/edit`;
                },
            }
        );
    };
    return (
        <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
            {studySets.map((studySet) => {
                return (
                    <CombineStudySetItem
                        handleClick={handleButtonClick}
                        studySet={studySet}
                        key={studySet.id}
                        iconType="minus"
                    />
                );
            })}

            <Button
                className="rounded-full px-6 py-6 w-fit m-auto"
                disabled={studySets.length <= 1}
            >
                Create combined sets
            </Button>
        </form>
    );
};
