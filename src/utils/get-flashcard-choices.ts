import { TFlashcard } from "@/types";

export const getChoices = (
    correctFlashcardId: string,
    flashcards: TFlashcard[]
) => {
    const correctFlashcard = flashcards.find((f) => f.id == correctFlashcardId);

    const otherChoices = flashcards.filter(
        (item) => item.term !== correctFlashcard?.term
    );

    const shuffledChoices = otherChoices
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    const finalChoices = [...shuffledChoices, correctFlashcard].sort(
        () => 0.5 - Math.random()
    );
    return finalChoices;
};
