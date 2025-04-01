import { TRecentStudySet } from "@/types";
import { formatLastViewedAt } from "@/utils";
import { useNavigate } from "react-router";

interface RecentStudySetCardProps {
    studySet: TRecentStudySet;
}

export const RecentStudySetCard = ({ studySet }: RecentStudySetCardProps) => {
    const navigate = useNavigate();

    const handleNavigate = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/study-set/${studySet.id}`);
    };

    return (
        <div
            className="relative w-full text-foreground p-4
            bg-primary hover:bg-container h-[150px] rounded-xl shadow-md flex flex-col z-0 cursor-pointer"
            onClick={handleNavigate}
        >
            <div className="grow">
                <p className="font-semibold text-xl">
                    {studySet.title === ""
                        ? "Untitled (Draft)"
                        : studySet.title}
                </p>
            </div>

            <p className="text-sm text-muted-foreground">
                {formatLastViewedAt(studySet.accessedAt)}
            </p>
        </div>
    );
};
