import { TStudySetSummary } from "@/types";
import { useNavigate } from "react-router";

interface StudySetCardProps {
    studySet: TStudySetSummary;
}

export const StudySetCard = ({ studySet }: StudySetCardProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (studySet.status === "Draft") {
            navigate(`/study-set/${studySet.id}/edit`);
        } else {
            navigate(`/study-set/${studySet.id}`);
        }
    };

    return (
        <div
            className="relative w-full text-foreground p-4
            bg-primary hover:bg-container h-[250px] rounded-xl shadow-md flex flex-col"
            onClick={handleNavigate}
        >
            <div className="grow">
                <p className="font-semibold text-xl">
                    {studySet.title}{" "}
                    {studySet.status === "Draft" && "Untitled (Draft)"}
                </p>

                <p>{studySet.description}</p>
            </div>

            <p className="text-sm text-muted-foreground">
                {studySet.flashcardsCount} terms
            </p>
        </div>
    );
};
