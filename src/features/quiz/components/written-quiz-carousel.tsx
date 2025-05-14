import { TFlashcard } from "@/types";
import { WrittenQuizCard } from "./written-quiz-card";
import { useState } from "react";
import { RestartQuiz } from "@/features/quiz/components/restart-quiz";
import { getPercentage } from "@/utils";
import { Progress } from "@/components/ui/progress";

interface WrittenQuizCarouselProps {
    flashcards: TFlashcard[];
}

export const WrittenQuizCarousel = ({
    flashcards,
}: WrittenQuizCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleUserAnswerCallback = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const value = getPercentage(currentIndex, flashcards.length);

    return (
        <div className="flex flex-col gap-4 h-full w-full">
            <Progress value={value} className="bg-primary" />

            <div className="grow w-full flex flex-nowrap overflow-hidden">
                {currentIndex !== flashcards.length ? (
                    flashcards.map((flashcard, index) => {
                        return (
                            <WrittenQuizCard
                                handleAnswerCallback={handleUserAnswerCallback}
                                flashcard={flashcard}
                                currentIndex={currentIndex}
                                isActive={index === currentIndex}
                                key={flashcard.id}
                            />
                        );
                    })
                ) : (
                    <RestartQuiz onRestartClick={() => setCurrentIndex(0)} />
                )}
            </div>
        </div>
    );
};
