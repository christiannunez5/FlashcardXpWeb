import { useState } from "react";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { TFlashcard } from "@/types";
import { createQuestionsFromFlashcards } from "@/utils";

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

    const questions = createQuestionsFromFlashcards(flashcards);
    
    return (
        <div className="h-full w-full flex flex-nowrap overflow-hidden">
            {questions.map((question, index) => {
                return (
                    <MultipleChoiceCard
                        key={index}
                        question={question}
                        currentIndex={currentIndex}
                        onAnswerSelect={handleOnAnswerSelect}
                    />
                );
            })}
        </div>
    );
};
