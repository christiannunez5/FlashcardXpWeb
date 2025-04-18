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

    const handleUserAnswerCallback = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    return (
        <div className="h-full w-full flex flex-nowrap overflow-hidden">
            {flashcards.map((flashcard, index) => {
                return (
                    <WrittenQuizCard
                        handleAnswerCallback={handleUserAnswerCallback}
                        flashcard={flashcard}
                        currentIndex={currentIndex}
                        isActive={index === currentIndex}
                        key={flashcard.id}
                    />
                );
            })}
        </div>
    );
};
