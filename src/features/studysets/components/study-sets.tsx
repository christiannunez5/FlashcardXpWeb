import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import { Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface StudySetsProps {
    studySets: TStudySetSummary[];
}

export const StudySets: React.FC<StudySetsProps> = ({ studySets }) => {
    return (
        <ul className="grid grid-cols-3 gap-5">
            {studySets.map((studySet) => {
                return <StudySetCard studySet={studySet} />;
            })}
        </ul>
    );
};

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
            bg-primary h-[150px] rounded-xl shadow-md flex flex-col z-0
            cursor-pointer hover:border-2 hover:border-container"
            onClick={handleNavigate}
        >
            <div
                className="absolute top-3 right-3 cursor-pointer rounded-full
            p-3  hover:bg-destructive hover:text-gray-200"
                onClick={() => deleteStudySet(studySet.id)}
            >
                <Trash2 size={18} strokeWidth={1.75} />
            </div>

            <div className="grow">
                <p className="font-semibold text-xl">
                    {studySet.title}
                    {studySet.status === "Draft" && "(Draft)"}
                </p>
            </div>
            <p className="text-sm text-muted-foreground">
                {studySet.flashcardsCount} terms
            </p>
        </div>
    );
};
