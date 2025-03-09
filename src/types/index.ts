export interface StudySet {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    flashcardsCount: number;
}

export interface Flashcard {
    id: string;
    term: string;
    definition: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    profilePicUrl: string;
}

export interface FlashcardsByStudySet
    extends Omit<StudySet, "flashcardsCount" | "createdAt"> {
    flashcards: Flashcard[];
    createdBy: User;
}
