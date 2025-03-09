export interface TStudySet {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    flashcardsCount: number;
}

export interface TFlashcard {
    id: string;
    term: string;
    definition: string;
}

export interface TUser {
    id: string;
    username: string;
    email: string;
    profilePicUrl: string;
}

export interface TFlashcardsByStudySet
    extends Omit<TStudySet, "flashcardsCount" | "createdAt"> {
    flashcards: TFlashcard[];
    createdBy: TUser;
}
