import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { useAddCompletedFlashcard } from "@/features/flashcards/hooks";
import { TFlashcard } from "@/types";
import { Check } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface WrittenQuizCardProps {
    flashcard: TFlashcard;
    currentIndex: number;
    handleAnswerCallback: () => void;
    isActive: boolean;
}

export const WrittenQuizCard = ({
    flashcard,
    currentIndex,
    handleAnswerCallback,
    isActive,
}: WrittenQuizCardProps) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [didUserAnswer, setDidUserAnswer] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const { mutate: addCompleteFlashcard } = useAddCompletedFlashcard();

    const handleSubmitAnswer = (e: FormEvent) => {
        e.preventDefault();

        setDidUserAnswer(!didUserAnswer);

        if (
            userAnswer.trim().toLocaleLowerCase() ===
            flashcard.term.trim().toLocaleLowerCase()
        ) {
            setIsAnswerCorrect(true);
            const data = {
                flashcardId: flashcard.id,
            };

            addCompleteFlashcard(data);
        }
    };

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (didUserAnswer && e.key === "Enter") {
                handleAnswerCallback();
            }
        };
        if (didUserAnswer) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [didUserAnswer, handleAnswerCallback, isActive]);

    return (
        <div
            className="min-w-full h-full bg-primary 
                flex flex-col p-12 rounded-lg shadow-md transition-transform duration-500 ease-in-out"
            style={{
                transform: `translate(-${currentIndex * 100}%)`,
            }}
        >
            <p>Definition</p>

            <div className="grow flex flex-col justify-center">
                <h4 className="flex items-center">{flashcard.definition}</h4>
            </div>

            <form
                className="space-y-3 flex gap-4 justify-center"
                onSubmit={handleSubmitAnswer}
            >
                {!didUserAnswer ? (
                    <>
                        <FormInput
                            className="w-full 
                    px-5 py-3 bg-background border-2 border-container rounded-lg"
                            placeholder="Enter your answer"
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                        <Button
                            className="rounded-lg py-6 px-7"
                            onClick={handleSubmitAnswer}
                        >
                            Answer
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        <div
                            className={`w-full py-3 px-5 flex gap-2 
                            rounded-lg ${
                                isAnswerCorrect
                                    ? "border-2 border-green-400"
                                    : "border-2 border-red-400"
                            }`}
                        >
                            <p>{userAnswer}</p>
                        </div>

                        {!isAnswerCorrect && (
                            <>
                                <p className="text-green-300">Correct Answer</p>
                                <div
                                    className={`w-full py-3 px-5 flex gap-2 
                            rounded-lg border-2 border-green-300
                                `}
                                >
                                    <Check />
                                    <p>{flashcard.term}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </form>

            {didUserAnswer && (
                <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <p className="text text-gray-500">
                        Press enter to continue
                    </p>
                </footer>
            )}
        </div>
    );
};
