import { RecentStudySetCard } from "./recent-study-set-card";
import { RecentStudySetCardSkeleton } from "./recent-study-set-card-skeleton";
import { TRecentStudySet } from "@/types";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface RecentStudySetProps {
    recentStudySets: TRecentStudySet[] | undefined;
}

export const RecentStudySets: React.FC<RecentStudySetProps> = ({
    recentStudySets,
}) => {

    const navigate = useNavigate()

    if (!recentStudySets) {
        return (
            <div className="space-y-4">
                <h5>Recents</h5>
                <ul className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 3 }).map(() => {
                        return <RecentStudySetCardSkeleton />;
                    })}
                </ul>
            </div>
        );
    }

    if (recentStudySets.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h5>Recents</h5>
            <ul className="grid grid-cols-4 gap-4">
                {recentStudySets.map((recentStudySet) => {
                    return <RecentStudySetCard studySet={recentStudySet} />;
                })}
            </ul>

            <button
                className="w-fit ml-auto bg-primary cursor-pointer py-2 px-7 rounded-full flex gap-3 items-center
            hover:border-container hover:border-2"
                onClick={() => navigate(`/my-files`)}
            >
                <p>View all files</p>

                <div
                    className="h-8 w-8 bg-accent rounded-full text-accent-foreground
                grid place-content-center"
                >
                    <ArrowRight size={20} />
                </div>
            </button>
        </div>
    );
};
