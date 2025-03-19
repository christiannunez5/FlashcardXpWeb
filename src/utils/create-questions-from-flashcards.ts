import { TFlashcard, TQuestion } from "@/types";

/**
 * Creates questions from flashcards
 * @param {TFlashcard[]} flashcards - Array of flashcards used to generate questions.
 * @returns {TQuestion[]} Array of questions with a flashcard and multiple choice options.
 */

export const createQuestionsFromFlashcards = (
    flashcards: TFlashcard[]
): TQuestion[] => {
    return flashcards.map((flashcard) => ({
        flashcard: {
            id: flashcard.id,
            term: flashcard.term,
            definition: flashcard.definition,
        },
        choices: getChoices(flashcard, flashcards),
    }));
};

/**
 * Generates 4 multiple choices from a given flashcard including the correct answer
 * @param { TFlashcard } correctFlashcard
 * @param { TFlashcard[] } flashcards - List of flashcards to get choices from
 * @returns {string[]} - Array of 4 shuffled choices (including the correct answer).
 */

const getChoices = (correctFlashcard: TFlashcard, flashcards: TFlashcard[]) => {
    const otherChoices = flashcards
        .filter((item) => item.term !== correctFlashcard.term)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((item) => item.term);

    const finalChoices = [...otherChoices, correctFlashcard.term].sort(
        () => 0.5 - Math.random()
    );

    return finalChoices;
};
