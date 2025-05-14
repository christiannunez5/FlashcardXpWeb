import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { EllipsisVertical, GripVertical } from "lucide-react";
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

    const [isHovered, setIsHovered] = useState(false);
    const queryParams = new URLSearchParams();

    const { mutate: deleteStudySet } = useDeleteStudySet(params.id);

    const handleNavigate = (e: React.MouseEvent) => {
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
                queryParams.set("studySetId", studySet.id);
                navigate(`/study-set/combine?${queryParams.toString()}`);
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
            onClick={handleNavigate}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between">
                <div className="bg-container h-16 w-16 rounded-full p-3">
                    <img src={flashcardIcon} />
                </div>

                <div className="flex gap-2">
                    <div
                        {...listeners}
                        {...attributes}
                        className="h-6 w-6 p-2 border border-container
                                rounded-full grid place-content-center"
                    >
                        <GripVertical size={16} />
                    </div>

                    <StudySetCardDropdown
                        handleDropdownClick={handleDropdownClick}
                    >
                        <div
                            className="h-6 w-6 p-2 border border-container
                        rounded-full grid place-content-center"
                        >
                            <EllipsisVertical size={16} />
                        </div>
                    </StudySetCardDropdown>
                </div>
            </div>

            <div className="flex justify-between items-center ">
                <div className="flex justify-between items-center gap-2">
                    {studySet.status === "Draft" && <p>(Draft)</p>}
                    <p>{studySet.title}</p>
                    <p>({studySet.flashcardsCount})</p>
                </div>
            </div>

            {/* <p className="text-sm text-gray-500">
                {studySet.flashcardsCount} terms
            </p> */}
        </li>
    );
};
