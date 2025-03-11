import { useDeleteStudySet } from "../hooks";
import { TStudySet } from "@/types";
import { truncateText } from "@/utils";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { truncate } from "fs";

interface StudySetCardProps {
    studySet: TStudySet;
}

export const StudySetCard = ({ studySet }: StudySetCardProps) => {
    const { mutate: deleteStudySet } = useDeleteStudySet();

    const handleDeleteStudySet = () => {
        deleteStudySet(studySet.id);
    };

    return (
        <div
            className="relative w-full text-foreground bg-primary h-[250px] rounded-xl shadow-md
        flex flex-col "
        >
            <Link
                to={`/studyset/${studySet.id}/flashcards`} // Use the `to` prop to navigate
                className="absolute inset-0 z-0"
            ></Link>

            <div
                className="rounded-t-xl bg-accent
            w-full flex justify-between items-center p-4 "
            >
                <p className="text-accent-foreground text-xl font-semibold">
                    {truncateText(studySet.title, 20)}
                </p>

                <button
                    className="p-3 rounded-full hover:bg-container relative z-10 text-accent-foreground
                hover:text-foreground"
                >
                    <BsThreeDotsVertical className="rounded-full " />
                </button>
            </div>

            <div className="w-full h-full flex flex-col p-4">
                <p className="grow">{truncateText(studySet.description, 70)}</p>

                <p
                    className="self-end
                 text-sm text-gray-400"
                >
                    {studySet.flashcardsCount} flashcards
                </p>
            </div>
        </div>
    );
};
