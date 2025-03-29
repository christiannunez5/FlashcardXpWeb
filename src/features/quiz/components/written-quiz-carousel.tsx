import { TFlashcard } from "@/types";
import { WrittenQuizCard } from "./written-quiz-card";
import { useState } from "react";

interface WrittenQuizCarouselProps {
    flashcards: TFlashcard[];
}

export const WrittenQuizCarousel = ({
    flashcards,
}: WrittenQuizCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleUserAnswer = (correctAnswer: string, userAnswer: string) => {
        if (userAnswer == correctAnswer) {
            alert("Congrats! You answered it correctly.");

            setCurrentIndex((prevIndex) =>
                prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else {
            alert("Stupid");
        }
    };

    return (
        <div className="h-full w-full flex flex-nowrap overflow-hidden">
            {flashcards.map((flashcard) => {
                return (
                    <WrittenQuizCard
                        onAnswer={handleUserAnswer}
                        flashcard={flashcard}
                        currentIndex={currentIndex}
                    />
                );
            })}
        </div>
    );
};
