import { TRecentStudySet } from "@/types";
import { formatLastViewedAt } from "@/utils/format-last-viewed-date";
import React from "react";
import { useNavigate } from "react-router";

interface RecentStudySetProps {
    recentStudySets: TRecentStudySet[];
}

export const RecentStudySets: React.FC<RecentStudySetProps> = ({
    recentStudySets,
}) => {
    return (
        <ul className="flex flex-col gap-4">
            {recentStudySets.map((recentStudySet) => {
                return <RecentStudySetCard recentStudySet={recentStudySet} />;
            })}
        </ul>
    );
};

interface RecentStudySetCardProps {
    recentStudySet: TRecentStudySet;
}

const RecentStudySetCard = ({ recentStudySet }: RecentStudySetCardProps) => {
    const navigate = useNavigate();

    const handleNavigate = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/study-set/${recentStudySet.id}`);
    };

    return (
        <li
            className="w-full bg-primary p-4 rounded-lg gap-4 flex g items-center shadow-md
                        dark:shadow-none
                        hover:border-b-[3px] hover:border-accent transition-colors duration-200 ease-in-out"
        >
            <div className="h-14 w-14 rounded-full border-2 border-container"></div>
            <div>
                <div className="flex gap-4 items-center">
                    <h5>{recentStudySet.title}</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                    {formatLastViewedAt(recentStudySet.accessedAt)}
                </p>
            </div>
        </li>
    );
};
