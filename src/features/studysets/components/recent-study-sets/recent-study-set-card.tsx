import { TRecentStudySet } from "@/types";
import { formatLastViewedAt } from "@/utils";
import React from "react";
import { useNavigate } from "react-router";

interface RecentStudySetCardProps {
    studySet: TRecentStudySet;
}

export const RecentStudySetCard: React.FC<RecentStudySetCardProps> = ({
    studySet,
}) => {
    const date = formatLastViewedAt(studySet.accessedAt);

    const navigate = useNavigate();

    return (
        <li
            className="card flex flex-col h-[150px]"
            onClick={() => navigate(`/study-set/${studySet.id}`)}
        >
            <div className="grow">
                <h5>{studySet.title}</h5>
            </div>

            <time className="text-sm text-gray-500">Viewed {date}</time>
        </li>
    );
};
