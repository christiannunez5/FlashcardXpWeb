import { Skeleton } from "@/components/shared/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TRecentStudySet } from "@/types";
import { formatLastViewedAt } from "@/utils/format-last-viewed-date";
import React from "react";
import { useNavigate } from "react-router";

interface RecentStudySetProps {
    recentStudySets?: TRecentStudySet[];
}

export const RecentStudySets: React.FC<RecentStudySetProps> = ({
    recentStudySets,
}) => {
    if (!recentStudySets) {
        return <RecentStudySetSkeleton />;
    }

    if (recentStudySets.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <h5>Recents</h5>
            <ul className="flex flex-col gap-4">
                {recentStudySets.map((recentStudySet) => {
                    return (
                        <RecentStudySetCard recentStudySet={recentStudySet} />
                    );
                })}
            </ul>
        </div>
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
            className="w-full bg-primary p-3 rounded-lg gap-4 flex g items-center shadow-md
                        dark:shadow-none cursor-pointer
                        hover:border-b-[3px] hover:border-accent transition-colors duration-200 ease-in-out"
            onClick={handleNavigate}
        >
            <Avatar className="border-2 border-accent h-10 w-10">
                <AvatarImage src={recentStudySet.createdBy.profilePicUrl} />
            </Avatar>
            <div>
                <div className="flex gap-4 items-center">
                    <p className="font-medium">{recentStudySet.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    {formatLastViewedAt(recentStudySet.accessedAt)}
                </p>
            </div>
        </li>
    );
};

const RecentStudySetSkeleton = () => {
    return (
        <div className="p-4 rounded-lg w-full flex gap-4 items-center bg-primary">
            <Skeleton circle width={40} height={40} className="w-[60px]" />

            <div className="grow space-y-2">
                <Skeleton height={10} />
                <Skeleton height={10} />
            </div>
        </div>
    );
};
