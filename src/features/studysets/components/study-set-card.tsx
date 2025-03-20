import { Button } from "@/components/ui/button";
import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import React from "react";
import { useNavigate } from "react-router";

interface StudySetCardProps {
    studySet: TStudySetSummary;
}

export const StudySetCard = ({ studySet }: StudySetCardProps) => {
    const navigate = useNavigate();

    const { mutate: deleteStudySet } = useDeleteStudySet();

    const handleDeleteStudySet = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteStudySet(studySet.id);
    };

    const handleNavigate = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (studySet.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
        } else {
            navigate(`/study-set/${studySet.id}`);
        }
    };

    return (
        <div
            className="relative w-full text-foreground p-4
            bg-primary hover:bg-container h-[250px] rounded-xl shadow-md flex flex-col z-0"
            onClick={handleNavigate}
        >
            <div className="grow">
                <p className="font-semibold text-xl">
                    {studySet.title}{" "}
                    {studySet.status === "Draft" && "Untitled (Draft)"}
                </p>

                <p>{studySet.description}</p>

                <Button
                    variant="destructive"
                    onClick={handleDeleteStudySet}
                    className="z-50"
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    Delete
                </Button>
            </div>

            <p className="text-sm text-muted-foreground">
                {studySet.flashcardsCount} terms
            </p>
        </div>
    );
};
