import { Skeleton } from "@/components/shared/skeleton";
import { StudySetCardDropdown } from "./study-set-card-drop-down";
import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { EllipsisVertical } from "lucide-react";
import flashcardIcon from "@/assets/flash-card.png";

interface StudySetCardProps {
    studySet: TStudySetSummary;
    isPopular?: boolean;
}

export const StudySetCard: React.FC<StudySetCardProps> = ({
    studySet,
    isPopular = false,
}) => {
    const navigate = useNavigate();
    const params = useParams();

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
        name: "delete" | "edit" | "combine"
    ) => {
        e.stopPropagation();

        switch (name) {
            case "delete":
                deleteStudySet(studySet.id);
                break;
            case "edit":
                navigate(`/study-set/${studySet.id}/edit`);
                break;
            case "combine":
        }
    };

    return (
        <div
            className="p-4 rounded-lg bg-primary shadow-xs cursor-pointer
        hover:border-2 border-container space-y-5 h-[150px] flex flex-col justify-between"
            onClick={handleNavigate}
        >
            <div className="flex justify-between">
                <p className="font-medium">
                    {studySet.title} {studySet.status === "Draft" && "(Draft)"}
                </p>
                {!isPopular && (
                    <StudySetCardDropdown
                        handleDropdownClick={handleDropdownClick}
                    >
                        <div
                            className="h-6 w-6 rounded-full flex items-center justify-center
                                        hover:bg-container cursor-pointer"
                        >
                            <EllipsisVertical size={14} />
                        </div>
                    </StudySetCardDropdown>
                )}
            </div>

            <p
                className="text-sm text-muted-foreground 
            bg-container py-1 px-4 w-fit rounded-xl"
            >
                {studySet.flashcardsCount} terms
            </p>

            {/* <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={studySet.createdBy.profilePicUrl} />
                </Avatar>
                <p className="">{studySet.createdBy.username}</p>
            </div> */}
        </div>
    );
};

export const StudySetCardSkeleton = () => {
    return (
        <div
            className="p-4 rounded-lg bg-primary flex flex-col 
        justify-between h-[150px]"
        >
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
        </div>
    );
};
