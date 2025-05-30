import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { useAddCompletedFlashcard } from "@/features/flashcards/hooks";
import { TFlashcard } from "@/types";
import { Check, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import correctSoundPath from "@/assets/sounds/correct.mp3";
import wrongSoundPath from "@/assets/sounds/wrong.mp3";

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

    const correctSound = new Audio(correctSoundPath);
    const wrongSound = new Audio(wrongSoundPath);

    const { mutate: addCompleteFlashcard } = useAddCompletedFlashcard();

    const handleSubmitAnswer = (e: FormEvent) => {
        e.preventDefault();

        setDidUserAnswer(!didUserAnswer);

        if (
            userAnswer.trim().toLocaleLowerCase() ===
            flashcard.term.trim().toLocaleLowerCase()
        ) {
            correctSound.play();
            setIsAnswerCorrect(true);

            const data = {
                flashcardId: flashcard.id,
            };

            addCompleteFlashcard(data);

            setTimeout(() => {
                handleAnswerCallback();
            }, 700);
        } else {
            wrongSound.play();
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
            <div className="grow flex flex-col ">
                <p>Definition</p>
                <h4 className="flex items-center mt-6">
                    {flashcard.definition}
                </h4>
            </div>

            <form
                className="space-y-3 flex gap-4 justify-center mb-7"
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
                            {isAnswerCorrect ? (
                                <Check className="text-green-400" />
                            ) : (
                                <X className="text-red-400" />
                            )}
                            <p>{userAnswer}</p>
                        </div>

                        {!isAnswerCorrect && (
                            <>
                                <p className="text-green-400">Correct Answer</p>
                                <div
                                    className={`w-full py-3 px-5 flex gap-2 
                            rounded-lg border-dashed border-2 border-green-400 b
                                `}
                                >
                                    <Check className="text-green-400" />
                                    <p>{flashcard.term}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </form>

            {didUserAnswer && !isAnswerCorrect && (
                <footer className="absolute bottom-2 left-0 right-0 p-4 text-center">
                    <p className="text text-gray-500">
                        PRESS ENTER TO CONTINUE
                    </p>
                </footer>
            )}
        </div>
    );
};
