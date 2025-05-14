import { CircularButton } from "@/components/ui/circular-button";
import { TStudySetSummary } from "@/types";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface CombineStudySetItemProps {
    studySet: TStudySetSummary;
    handleClick: (studySet: TStudySetSummary) => void;
    iconType: "plus" | "minus";
}

export const CombineStudySetItem: React.FC<CombineStudySetItemProps> = ({
    handleClick,
    studySet,
    iconType,
}) => {
    return (
        <li
            className="p-4 rounded-2xl border-2 border-container
                            flex items-center"
        >
            <div className="space-y-1 grow">
                <p className="font-medium ">{studySet.title}</p>
                <p className="text-gray-500">
                    {studySet.flashcardsCount} terms
                </p>
            </div>

            {iconType === "plus" ? (
                <CircularButton
                    className="bg-accent h-8 w-8 text-accent-foreground"
                    onClick={() => handleClick(studySet)}
                >
                    <Plus size={18} />
                </CircularButton>
            ) : (
                <CircularButton
                    className="bg-red-400 h-8 w-8 text-red-500"
                    onClick={() => handleClick(studySet)}
                >
                    <Minus />
                </CircularButton>
            )}
        </li>
    );
};
