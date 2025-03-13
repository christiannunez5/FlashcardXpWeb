import { TStudySet } from "@/types";
import { truncateText } from "@/utils";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CircularButton } from "@/components/ui/circular-button";

interface StudySetCardProps {
    studySet: TStudySet;
}

export const StudySetCard = ({ studySet }: StudySetCardProps) => {
    return (
        <div
            className="relative w-full text-foreground 
            bg-primary h-[250px] rounded-xl shadow-md flex flex-col "
        >
            <Link
                to={`/flashcards/${studySet.id}`}
                className="absolute inset-0 z-0"
            ></Link>

            <div
                className="rounded-t-xl bg-accent
            w-full flex justify-between items-center p-4 "
            >
                <p className="text-accent-foreground text-xl font-semibold">
                    {studySet.title && truncateText(studySet.title, 20)}
                </p>

                <CircularButton
                    size={10}
                    className="z-10 bg-none bg-inherit text-accent-foreground
                     hover:text-foreground hover:bg-container "
                >
                    <BsThreeDotsVertical />
                </CircularButton>
            </div>

            <div className="w-full h-full flex flex-col p-4">
                <p className="grow">
                    {studySet.description &&
                        truncateText(studySet.description, 70)}
                </p>

                <p className="self-end text-sm text-gray-400">
                    {studySet.flashcardsCount} flashcards
                </p>
            </div>
        </div>
    );
};
