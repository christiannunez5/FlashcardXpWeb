import { TFlashcard } from "@/types";
import { FormInput } from "@/components/ui/input";
import React, { ReactNode, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CircularButton } from "@/components/ui/circular-button";
import { FiEdit2 } from "react-icons/fi";
import { EditFlashcardModal } from "@/features/flashcards/components/edit-flashcard-modal";

interface FlashcardListProps {
    flashcards: TFlashcard[];
    children: ReactNode;
}

export const FlashcardList: React.FC<FlashcardListProps> = ({
    flashcards,
    children,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

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
                    return <TermAndDefinitionCard flashcard={f} />;
                })}
            </ul>

            {children}
        </div>
    );
};

interface TermAndDefinition {
    flashcard: TFlashcard;
}

const TermAndDefinitionCard: React.FC<TermAndDefinition> = ({ flashcard }) => {
    return (
        <li className="relative flex gap-12 bg-primary rounded-3xl p-8 shadow-md">
            <div
                className="w-96 grid place-content-center border-r-[3px] 
                                    border-container py-5 "
            >
                <h5 className="">{flashcard.term} </h5>
            </div>

            <div className="w-full flex items-center">
                <p className="grow">{flashcard.definition}</p>
                <EditFlashcardModal>
                    <CircularButton size={10} className="bg-container">
                        <FiEdit2 />
                    </CircularButton>
                </EditFlashcardModal>
            </div>
        </li>
    );
};
