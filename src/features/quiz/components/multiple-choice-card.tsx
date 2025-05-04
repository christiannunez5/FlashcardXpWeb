import { cn } from "@/lib/utils";
import { TQuestion } from "@/types";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import correctSoundPath from "@/assets/sounds/correct.mp3";
import wrongSoundPath from "@/assets/sounds/wrong.mp3";
import { useAddCompletedFlashcard } from "@/features/flashcards/hooks";

interface MultipleChoiceCardProps {
    question: TQuestion;
    currentIndex: number;
    onAnswerSelectCallback: () => void;
    isActive: boolean;
    flashcardId: string;
}

export const MultipleChoiceCard = ({
    currentIndex,
    onAnswerSelectCallback,
    question,
    isActive,
    flashcardId,
}: MultipleChoiceCardProps) => {
    const { mutate: addCompleteFlashcard } = useAddCompletedFlashcard();

    const [didUserAnswer, setDidUserAnswer] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const correctSound = new Audio(correctSoundPath);
    const wrongSound = new Audio(wrongSoundPath);

    const handleOnAnswerSelect = (term: string) => {
        setSelectedTerm(term);
        setDidUserAnswer(!didUserAnswer);
        if (term === question.flashcard.term) {
            setIsAnswerCorrect(true);
            correctSound.play();
            
            const data = {
                flashcardId: question.flashcard.id,
            };
            addCompleteFlashcard(data);
            setTimeout(() => {
                onAnswerSelectCallback();
            }, 700);
        } else {
            wrongSound.play();
        }
    };

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (didUserAnswer && e.key === "Enter") {
                onAnswerSelectCallback();
            }
        };
        if (didUserAnswer) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onAnswerSelectCallback, didUserAnswer, isActive]);

    return (
        <div
            className="min-w-full h-full bg-primary 
            flex flex-col p-12 rounded-lg shadow-md transition-transform duration-500 ease-in-out"
            style={{
                transform: `translate(-${currentIndex * 100}%)`,
            }}
        >
            <div className="grow flex flex-col">
                <p>Definition</p>
                <h5 className="flex items-center mt-10">
                    {" "}
                    {question.flashcard.definition}
                </h5>
            </div>

            <div className="w-full grid grid-cols-2 gap-5 mb-5">
                {question.choices.map((choice) => {
                    const isCorrect = choice === question.flashcard.term;
                    const isSelected = choice === selectedTerm;

                    return (
                        <ChoiceItem
                            label={choice}
                            onClick={handleOnAnswerSelect}
                            isCorrect={isCorrect}
                            isSelected={isSelected}
                            didUserAnswer={didUserAnswer}
                        />
                    );
                })}
            </div>

            {didUserAnswer && !isAnswerCorrect && (
                <footer className="absolute bottom-2 left-0 right-0 p-4 text-center ">
                    <p className="text text-gray-500">
                        PRESS ENTER TO CONTINUE
                    </p>
                </footer>
            )}
        </div>
    );
};

interface ChoiceItemProps {
    label: string;
    onClick: (term: string) => void;
    isSelected: boolean;
    isCorrect: boolean;
    didUserAnswer: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({
    label,
    onClick,
    isSelected,
    isCorrect,
    didUserAnswer,
}) => {
    let answerStatus: "correct" | "wrong" | "neutral" = "neutral";

    if (didUserAnswer) {
        if (isSelected) {
            answerStatus = isCorrect ? "correct" : "wrong";
        } else if (isCorrect) {
            answerStatus = "correct";
        }
    }

    let borderStyle = "border-container";
    if (answerStatus === "correct")
        borderStyle = "border-dashed border-green-400";
    if (answerStatus === "wrong") borderStyle = "border-red-400";

    return (
        <button
            className={cn(
                `w-full border-[1.8px] rounded-lg py-4 px-5
            hover:bg-background cursor-pointer flex gap-4 border-container`,
                borderStyle
            )}
            disabled={didUserAnswer}
            onClick={() => onClick(label)}
        >
            {answerStatus === "correct" && <Check className="text-green-400" />}
            {answerStatus === "wrong" && <X className="text-red-400" />}
            {label}
        </button>
    );
};
