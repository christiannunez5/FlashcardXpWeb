import { TRecentStudySet } from "@/types";
import React from "react";

interface RecentStudySetCardProps {
    studySet: TRecentStudySet;
}

export const RecentStudySetCard: React.FC<RecentStudySetCardProps> = ({
    studySet,
}) => {
    return (
        <li className="card flex flex-col h-[150px]">
            <div className="grow">
                <h5>{studySet.title}</h5>
            </div>

            <p className="text-sm text-gray-500">Viewed 2 hours ago</p>
        </li>
    );
};
