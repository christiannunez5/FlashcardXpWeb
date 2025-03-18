export interface TStudySetSummary {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: "Draft" | "Published";
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

export interface TStudySet extends Omit<TStudySetSummary, "flashcardsCount"> {
    flashcards: TFlashcard[];
    createdBy: TUser;
}
