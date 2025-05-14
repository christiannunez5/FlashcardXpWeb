import { TTag } from "@/types";
import { TagCard } from "./tag-card";
import React, { useState } from "react";
import { TagCardSkeleton } from "./tag-card-skeleton";
import { FormInput } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TagListProps {
    tags: TTag[] | undefined;
    inputValue: string;
}

export const TagList: React.FC<TagListProps> = ({ tags, inputValue }) => {
    if (!tags) {
        return (
            <ul className="grid grid-cols-4 gap-5">
                {Array.from({ length: 10 }).map(() => {
                    return <TagCardSkeleton />;
                })}
            </ul>
        );
    }

    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <ul className="grid grid-cols-4 gap-5">
            {filteredTags.map((tag) => {
                return <TagCard tag={tag} key={tag.id} />;
            })}
        </ul>
    );
};
