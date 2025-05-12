import { Skeleton } from "@/components/shared/skeleton";
import { TTag } from "@/types";
import React from "react";

interface StudySetTagsProps {
    studySetTags: TTag[] | undefined;
}

export const StudySetTags: React.FC<StudySetTagsProps> = ({ studySetTags }) => {
    if (!studySetTags) {
        return <Skeleton className="h-2 w-full" />;
    }

    return (
        <ul className="flex gap-2">
            {studySetTags.map((tag) => {
                return (
                    <div
                        className="p-2 rounded-full border-2 border-container w-fit
                         px-4 flex gap-2"
                    >
                        <p className="text-sm">{tag.name}</p>
                    </div>
                );
            })}
        </ul>
    );
};
