import { useState } from "react";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { TFlashcard } from "@/types";
import { createQuestionsFromFlashcards } from "@/utils";
import { RestartQuiz } from "@/features/quiz/components/restart-quiz";

interface MultipleChoiceCarouselProps {
    flashcards: TFlashcard[];
}

export const MultipleChoiceCarousel = ({
    flashcards,
}: MultipleChoiceCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOnAnswerSelectCallback = () => {
        // setCurrentIndex((prevIndex) =>
        //     prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
        // );

        setCurrentIndex((prev) => prev + 1);
    };

    const questions = createQuestionsFromFlashcards(flashcards);

    return (
        <div className="h-full w-full flex flex-nowrap overflow-hidden">
            {/* {questions.map((question, index) => {
                return (
                    <MultipleChoiceCard
                        key={index}
                        question={question}
                        currentIndex={currentIndex}
                        onAnswerSelectCallback={handleOnAnswerSelectCallback}
                        isActive={currentIndex === index}
                    />
                );
            })} */}

            {currentIndex !== questions.length ? (
                questions.map((question, index) => {
                    return (
                        <MultipleChoiceCard
                            key={index}
                            question={question}
                            currentIndex={currentIndex}
                            onAnswerSelectCallback={
                                handleOnAnswerSelectCallback
                            }
                            isActive={currentIndex === index}
                        />
                    );
                })
            ) : (
                <RestartQuiz />
            )}
        </div>
    );
};
