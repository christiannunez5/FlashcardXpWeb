import { MainLayout } from "@/components/layout";
import {
    SelectedStudySets,
    StudySetSelection,
} from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const CombineStudySet = () => {
    const [selectedStudySets, setSelectedStudySets] = useState<
        TStudySetSummary[]
    >([]);

    const { data: studySets } = useGetCurrentUserStudySets();
    const [searchParams] = useSearchParams();

    const studySetId = searchParams.get("studySetId");

    useEffect(() => {
        if (studySets) {
            const studySet = studySets.find((s) => s.id == studySetId);
            if (studySet) {
                setSelectedStudySets((prev) => [...prev, studySet]);
            }
        }
    }, [studySetId, studySets]);

    if (!studySets) {
        return <div>Loading..</div>;
    }

    const filteredStudySets = studySets.filter((s) => {
        return !selectedStudySets.some((selected) => selected.id === s.id);
    });

    const handleAddSelectedStudySet = (studySet: TStudySetSummary) => {
        setSelectedStudySets((prev) => [...prev, studySet]);
    };

    const handleRemoveSelectedStudySet = (studySet: TStudySetSummary) => {
        setSelectedStudySets((prev) =>
            prev.filter((s) => s.id !== studySet.id)
        );
    };

    return (
        <MainLayout size={80}>
            <div className="bg-primary p-7 rounded-3xl">
                <h4>Combine sets</h4>
                <p>Create a new flashcard set from your existing ones.</p>
            </div>

            <section className="mt-5">
                <div className="grid grid-cols-2 gap-10">
                    <div className="bg-primary p-7 rounded-3xl w-full">
                        <p className="text-xl font-semibold">Choose sets</p>

                        <div className="mt-5">
                            <StudySetSelection
                                studySets={filteredStudySets}
                                handleClick={handleAddSelectedStudySet}
                            />
                        </div>
                    </div>

                    <div className="bg-primary p-7 rounded-3xl w-full">
                        <p className="text-xl font-semibold">Selected sets</p>

                        <div className="mt-5">
                            <SelectedStudySets
                                studySets={selectedStudySets}
                                handleButtonClick={handleRemoveSelectedStudySet}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
