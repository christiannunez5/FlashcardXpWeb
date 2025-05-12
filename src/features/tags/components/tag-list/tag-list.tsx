import { TTag } from "@/types";
import { TagCard } from "./tag-card";
import React from "react";
import { TagCardSkeleton } from "./tag-card-skeleton";

interface TagListProps {
    tags: TTag[] | undefined;
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
    if (!tags) {
        return (
            <ul className="grid grid-cols-4 gap-5">
                {Array.from({ length: 10 }).map(() => {
                    return <TagCardSkeleton />;
                })}
            </ul>
        );
    }

    return (
        <ul className="grid grid-cols-4 gap-5">
            {tags?.map((tag) => {
                return <TagCard tag={tag} key={tag.id} />;
            })}
        </ul>
    );
};
