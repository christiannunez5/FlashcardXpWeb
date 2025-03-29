import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { TFlashcard } from "@/types";
import { useState } from "react";

interface WrittenQuizCardProps {
    flashcard: TFlashcard;
    currentIndex: number;
    onAnswer: (correctAnswer: string, userAnswer: string) => void;
}

export const WrittenQuizCard = ({
    flashcard,
    currentIndex,
    onAnswer,
}: WrittenQuizCardProps) => {
    const [userAnswer, setUsetAnswer] = useState("");
    
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

            <div className="space-y-3 flex gap-4 justify-center">
                <FormInput
                    className="w-full 
                px-5 py-3 bg-background border-2 border-container rounded-lg"
                    placeholder="Enter your answer"
                    onChange={(e) => setUsetAnswer(e.target.value)}
                />
                <Button
                    className="rounded-lg py-6 px-7"
                    onClick={() => onAnswer(flashcard.term, userAnswer)}
                >
                    Answer
                </Button>
            </div>
        </div>
    );
};
