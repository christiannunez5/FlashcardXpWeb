import { Skeleton } from "@/components/shared/skeleton";
import { StudySetCardDropdown } from "./study-set-card-drop-down";
import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useNavigate } from "react-router";

interface StudySetCardProps {
    studySet: TStudySetSummary;
    isPopular?: boolean;
}

export const StudySetCard: React.FC<StudySetCardProps> = ({
    studySet,
    isPopular = false,
}) => {
    const navigate = useNavigate();

    const { mutate: deleteStudySet } = useDeleteStudySet();

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
            className="p-4 rounded-lg bg-primary shadow-md cursor-pointer
        hover:border-2 border-container space-y-3"
            onClick={handleNavigate}
        >
            <div className="flex justify-between">
                <h5>{studySet.title}</h5>
                {!isPopular && (
                    <StudySetCardDropdown
                        handleDropdownClick={handleDropdownClick}
                    />
                )}
            </div>

            <p
                className="text-sm text-muted-foreground 
            bg-container py-1 px-4 w-fit rounded-xl"
            >
                {studySet.flashcardsCount} terms
            </p>
            <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={studySet.createdBy.profilePicUrl} />
                </Avatar>
                <p className="">{studySet.createdBy.username}</p>
            </div>
        </div>
    );
};

export const StudySetCardSkeleton = () => {
    return (
        <div className="p-4 rounded-lg bg-primary space-y-3 flex flex-col">
            <Skeleton height={10} width={200} />
            <Skeleton height={10} width={150} />
            <div className="flex items-center gap-2 mt-auto">
                <Skeleton circle height={50} width={50} />
                <Skeleton width={100} height={10} />
            </div>
        </div>
    );
};
