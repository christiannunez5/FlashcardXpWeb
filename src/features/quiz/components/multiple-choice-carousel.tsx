import { useState } from "react";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { TFlashcard } from "@/types";

interface MultipleChoiceCarouselProps {
    flashcards: TFlashcard[];
}

export const MultipleChoiceCarousel = ({
    flashcards,
}: MultipleChoiceCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOnAnswerSelect = (
        correctAnswer: string,
        userAnswer?: string
    ) => {
        if (correctAnswer === userAnswer) {
            alert("Correct answer");
            setCurrentIndex((prevIndex) =>
                prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
            );
            return;
        }
        alert("Wrong answer");
    };
    
    return (
        <div className="h-full w-full flex flex-nowrap overflow-hidden">
            {flashcards.map((flashcard, index) => {
                return (
                    <MultipleChoiceCard
                        key={index}
                        flashcard={flashcard}
                        flashcards={flashcards}
                        currentIndex={currentIndex}
                        onAnswerSelect={handleOnAnswerSelect}
                    />
                );
            })}
        </div>
    );
};
