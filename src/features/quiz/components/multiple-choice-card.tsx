import { TFlashcard } from "@/types";
import { getChoices } from "@/utils/get-flashcard-choices";
import { useMemo } from "react";

interface MultipleChoiceCardProps {
    flashcard: TFlashcard;
    flashcards: TFlashcard[];
    currentIndex: number;
    onAnswerSelect: (correctAnswer: string, userAnswer?: string) => void;
}

export const MultipleChoiceCard = ({
    flashcard,
    flashcards,
    currentIndex,
    onAnswerSelect,
}: MultipleChoiceCardProps) => {
    const choices = useMemo(
        () => getChoices(flashcard.id, flashcards),
        [flashcard.id, flashcards]
    );

    return (
        <div
            className="min-w-full h-full bg-primary flex flex-col p-12 rounded-lg shadow-md"
            style={{
                transform: `translate(-${currentIndex * 100}%)`,
            }}
        >
            <div className="grow flex flex-col">
                <p>Definition</p>
                <h5 className="flex items-center"> {flashcard.definition}</h5>
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
                {choices.map((choice) => {
                    return (
                        <ChoiceItem
                            term={choice?.term}
                            onClick={() =>
                                onAnswerSelect(flashcard.term, choice?.term)
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

const ChoiceItem = ({
    term,
    onClick,
}: {
    term?: string;
    onClick: () => void;
}) => {
    return (
        <div
            className="w-full border-[1.8px] dark:border-white 
            rounded-lg py-3 px-7
            over:bg-background cursor-pointer border-container"
            onClick={onClick}
        >
            {term}
        </div>
    );
};
