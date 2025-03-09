import { useDeleteStudySet } from "../hooks";
import { TStudySet } from "@/types";
import { truncateText } from "@/utils";
import { Link } from "react-router";

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
            className="relative w-full bg-white h-[200px] rounded-xl 
        shadow-md flex flex-col"
        >
            <Link
                to={`/studyset/${studySet.id}/flashcards`} // Use the `to` prop to navigate
                className="absolute inset-0"
            ></Link>

            <div className="rounded-t-xl bg-amber-300 w-full flex justify-between items-center p-4">
                <p>{studySet.title}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#800000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash cursor-pointer"
                    onClick={handleDeleteStudySet}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </div>

            <div className="w-full h-full p-4 flex flex-col ">
                <p className="grow">{truncateText(studySet.description, 90)}</p>

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
