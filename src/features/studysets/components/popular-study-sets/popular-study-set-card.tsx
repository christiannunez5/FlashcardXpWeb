import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TStudySetSummary } from "@/types";
import { useNavigate } from "react-router";

interface PopularStudySetCardProps {
    studySet: TStudySetSummary;
}

export const PopularStudySetCard: React.FC<PopularStudySetCardProps> = ({
    studySet,
}) => {
    const navigate = useNavigate();

    return (
        <li
            className="card w-full h-[150px] flex flex-col justify-between"
            onClick={() => navigate(`/study-set/${studySet.id}`)}
        >
            <h5>{studySet.title}</h5>
            <div className="flex gap-3 items-center">
                <Avatar className="border-2 border-container">
                    <AvatarImage src={studySet.createdBy.profilePicUrl} />
                </Avatar>

                <p className="text-sm text-gray-400">
                    Created by {studySet.createdBy.username}
                </p>
            </div>
        </li>
    );
};
