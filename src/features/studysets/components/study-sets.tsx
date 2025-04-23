import { AddDraftStudySetModal } from "@/components/shared";
import { Skeleton } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteStudySet } from "@/features/studysets/hooks";
import { TStudySetSummary } from "@/types";
import {
    EllipsisVertical,
    GitMerge,
    Pencil,
    Trash,
    Trash2,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface StudySetsProps {
    studySets: TStudySetSummary[] | undefined;
}

export const StudySets: React.FC<StudySetsProps> = ({ studySets }) => {
    if (!studySets) {
        return (
            <>
                <ul className="grid grid-cols-4 gap-5">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <StudySetCardSkeleton key={index} />
                    ))}
                </ul>
            </>
        );
    }

    if (studySets.length === 0) {
        return (
            <div
                className="w-full h-full flex flex-col 
            justify-center items-center gap-4"
            >
                <img
                    src="https://assets.quizlet.com/_next/static/media/sets_empty.e06b562c.svg"
                    alt=""
                />
                <div className="text-center">
                    <p className="text-2xl font-semibold">
                        No studysets created
                    </p>
                </div>

                <AddDraftStudySetModal>
                    <Button className="w-fit px-14 py-5 rounded-4xl">
                        Create
                    </Button>
                </AddDraftStudySetModal>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-4 gap-5">
            {studySets.map((studySet) => (
                <StudySetCard key={studySet.id} studySet={studySet} />
            ))}
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

    const handleDropdownClick = (
        e: React.MouseEvent,
        name: "trash" | "edit" | "combine"
    ) => {
        e.stopPropagation();

        switch (name) {
            case "trash":
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
            className="relative w-full text-foreground p-4
            bg-primary h-[150px] rounded-xl shadow-md flex flex-col z-0
            cursor-pointer hover:border-2 hover:border-container"
            onClick={handleNavigate}
        >
            {/* <div
                className="absolute top-3 right-3 cursor-pointer rounded-full
            p-3  hover:bg-destructive hover:text-gray-200"
                onClick={handleDeleteStudySet}
            >
                <Trash2 size={18} strokeWidth={1.75} />
            </div> */}

            <div className="grow flex justify-between">
                <p className="text-xl font-medium">
                    {studySet.title}
                    {studySet.status === "Draft" && "(Draft)"}
                </p>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center
                                        hover:bg-container cursor-pointer"
                            onClick={(e) => handleDropdownClick(e, "edit")}
                        >
                            <EllipsisVertical size={14} />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-52">
                        <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
                            <Pencil size={20} strokeWidth={2} />
                            <p>Edit </p>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
                            <GitMerge size={20} strokeWidth={2} />
                            <p>Combine </p>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="hover:bg-container rounded-none p-3.5 space-x-2"
                            onClick={(e) => handleDropdownClick(e, "trash")}
                        >
                            <Trash
                                size={20}
                                strokeWidth={2}
                                className="text-destructive"
                            />
                            <p className="text-destructive">Trash this set</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground">
                {studySet.flashcardsCount} terms
            </p>
        </div>
    );
};

const StudySetCardSkeleton = () => {
    return (
        <div
            className="bg-primary w-full h-[150px] rounded-xl p-4 flex flex-col
        justify-between"
        >
            <Skeleton height={10} />
            <Skeleton width={70} height={10} />
        </div>
    );
};
