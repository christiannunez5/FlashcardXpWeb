import { TFlashcard, TStudySet } from "@/types";
import { FormInput } from "@/components/ui/input";
import React, { ReactNode, useState } from "react";
import { EditFlashcardModal } from "@/features/flashcards/components/edit-flashcard-modal";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router";
import { useAuthContext } from "@/context/auth/hooks";
import { Skeleton } from "@/components/shared/skeleton";

interface FlashcardListProps {
    studySet: TStudySet | undefined;
    children?: ReactNode;
}

export const FlashcardList: React.FC<FlashcardListProps> = ({
    studySet,
    children,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    if (!studySet || !studySet.flashcards) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-2 w-24" />

                <ul className="space-y-5">
                    {Array.from({ length: 5 }).map(() => {
                        return (
                            <li className="relative flex gap-12 bg-primary rounded-3xl p-14 shadow-md">
                                <Skeleton className="h-2 w-full" />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    const flashcards = studySet.flashcards;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredFlashcards = flashcards.filter(
        (card) =>
            card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="flex flex-col gap-5">
            <h4>{flashcards.length} terms</h4>

            <FormInput
                icon={<IoSearch className="text-xl " />}
                className=" bg-primary w-fit p-4 rounded-3xl space-x-2 self-end
                    border border-gray-800 dark:border-white"
                placeholder="Search terms or definition"
                onChange={handleInputChange}
            />

            <ul className="w-full flex flex-col gap-6">
                {filteredFlashcards.map((f) => {
                    return (
                        <TermAndDefinitionCard
                            flashcard={f}
                            studySetCreatedById={studySet.createdBy.id}
                        />
                    );
                })}
            </ul>

            {children}
        </div>
    );
};

interface TermAndDefinition {
    flashcard: TFlashcard;
    studySetCreatedById: string;
}

const TermAndDefinitionCard: React.FC<TermAndDefinition> = ({
    flashcard,
    studySetCreatedById,
}) => {
    const { id: studySetId } = useParams();
    const { user } = useAuthContext();

    if (!studySetId) {
        throw new Error("study set id required");
    }
    return (
        <li
            className="relative flex gap-12 bg-primary rounded-3xl p-8 shadow-md"
            draggable="true"
        >
            <div
                className="w-96 grid place-content-center border-r-[3px] 
                                    border-container py-5 break-words  px-5"
            >
                <h5 className="">{flashcard.term} </h5>
            </div>

            <div className="w-full flex items-center break-words space-x-3">
                <p className="grow ">{flashcard.definition}</p>

                {user?.id === studySetCreatedById ? (
                    <EditFlashcardModal
                        flashcard={flashcard}
                        studySetId={studySetId}
                    ></EditFlashcardModal>
                ) : null}
            </div>
        </li>
    );
};
