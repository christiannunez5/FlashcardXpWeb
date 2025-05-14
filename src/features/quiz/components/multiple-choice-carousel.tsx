import { useState } from "react";
import { MultipleChoiceCard } from "./multiple-choice-card";
import { TFlashcard } from "@/types";
import { createQuestionsFromFlashcards, getPercentage } from "@/utils";
import { RestartQuiz } from "@/features/quiz/components/restart-quiz";
import { Progress } from "@/components/ui/progress";

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

    const value = getPercentage(currentIndex, questions.length);
    
    return (
        <div className="flex flex-col gap-4 h-full w-full">
            <Progress value={value} className="bg-primary" />
            <div className="h-full w-full flex flex-nowrap overflow-hidden">
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
                    <RestartQuiz onRestartClick={() => setCurrentIndex(0)} />
                )}
            </div>
        </div>
    );
};
