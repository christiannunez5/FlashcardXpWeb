import {
    useDeleteStudySet,
    useUpdateStudySetFolder,
} from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { EllipsisVertical, GripVertical, Hand } from "lucide-react";
import { StudySetDropdownAction } from "./study-set-drop-down-data";
import flashcardIcon from "@/assets/flash-card.png";
import { StudySetCardDropdown } from "@/features/studysets/components/study-sets/study-set-card-drop-down";
import { useDraggable } from "@dnd-kit/core";

interface StudySetCardProps {
    studySet: TStudySetSummary;
}

export const StudySetCard: React.FC<StudySetCardProps> = ({ studySet }) => {
    const navigate = useNavigate();
    const params = useParams();

    const { mutate: deleteStudySet } = useDeleteStudySet(params.id);

    const handleNavigate = (e: React.MouseEvent) => {
        console.log("hello");
        e.stopPropagation();
        if (studySet.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
        } else {
            navigate(`/study-set/${studySet.id}`);
        }
    };

    const handleDropdownClick = (
        e: React.MouseEvent,
        action: StudySetDropdownAction
    ) => {
        e.stopPropagation();

        switch (action) {
            case "delete":
                deleteStudySet(studySet.id);
                break;
            case "edit":
                navigate(`/study-set/${studySet.id}/edit`);
                break;
            case "combine":
        }
    };

    const { setNodeRef, listeners, attributes, transform } = useDraggable({
        id: studySet.id,
        data: {
            type: "study-set",
        },
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

    return (
        <li
            className="relative card bg-primary rounded-xl p-4 space-y-4 shadow-xs "
            ref={setNodeRef}
            style={style}
        >
            {/* <a href="" className="absolute inset-0 bg-red-500"></a> */}
            <div className="flex justify-between">
                <div className="bg-container h-16 w-16 rounded-full p-3">
                    <img src={flashcardIcon} />
                </div>
                <StudySetCardDropdown handleDropdownClick={handleDropdownClick}>
                    <EllipsisVertical
                        className="text-gray-400"
                        size={20}
                        strokeWidth={3}
                    />
                </StudySetCardDropdown>
            </div>

            <div className="flex justify-between items-center ">
                <div className="flex justify-between items-center">
                    {" "}
                    <p>{studySet.title}</p>
                    <p>({studySet.flashcardsCount})</p>
                </div>

                <div
                    {...listeners}
                    {...attributes}
                    className="h-8 w-8 bg-accent text-accent-foreground grid place-content-center
                    rounded-full"
                >
                    <GripVertical size={14} className="" />
                </div>
            </div>

            {/* <p className="text-sm text-gray-500">
                {studySet.flashcardsCount} terms
            </p> */}
        </li>
    );
};
