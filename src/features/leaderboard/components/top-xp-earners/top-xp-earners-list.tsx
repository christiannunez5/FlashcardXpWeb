import { TopXpEarnerCard } from "./top-xp-earner-card";
import { TopXpEarnerCardSkeleton } from "./top-xp-earner-card-skeleton";
import { TUserExperience } from "@/types";
import React from "react";

interface TopXpEarnersListProps {
    topEarners: TUserExperience[] | undefined;
}

export const TopXpEarnersList: React.FC<TopXpEarnersListProps> = ({
    topEarners,
}) => {
    if (!topEarners) {
        return (
            <ul className="space-y-4">
                {Array.from({ length: 3 }).map(() => {
                    return <TopXpEarnerCardSkeleton />;
                })}
            </ul>
        );
    }

    return (
        <ul className="space-y-4">
            {topEarners.map((topEarner, index) => {
                return (
                    <TopXpEarnerCard
                        topXpEarner={topEarner}
                        index={index + 1}
                        key={index}
                    />
                );
            })}
        </ul>
    );
};
