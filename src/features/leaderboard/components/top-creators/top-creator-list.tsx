import { TTopStudySetCreator } from "@/types";
import { TopCreatorCard } from "./top-creator-card";
import React from "react";
import { TopCreatorCardSkeleton } from "./top-creator-card-skeleton";

interface TopCreatorListProps {
    topCreators: TTopStudySetCreator[] | undefined;
}

export const TopCreatorList: React.FC<TopCreatorListProps> = ({
    topCreators,
}) => {
    if (!topCreators) {
        return (
            <ul className="space-y-4">
                {Array.from({ length: 3 }).map(() => {
                    return <TopCreatorCardSkeleton />;
                })}
            </ul>
        );
    }

    return (
        <ul className="space-y-4">
            {topCreators.map((topCreator, index) => {
                return (
                    <TopCreatorCard
                        topCreator={topCreator}
                        index={index + 1}
                        key={index}
                    />
                );
            })}
        </ul>
    );
};
