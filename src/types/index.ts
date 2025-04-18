export type TStudySetSummary = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: "Draft" | "Published";
    flashcardsCount: number;
};

export type TFlashcard = {
    id: string;
    term: string;
    definition: string;
};

export type TCompletedFlashcard = {
    count: number;
};

export type TQuestion = {
    flashcard: TFlashcard;
    choices: string[];
};

export type TUser = {
    id: string;
    username: string;
    email: string;
    profilePicUrl: string;
};

export interface TStudySet extends Omit<TStudySetSummary, "flashcardsCount"> {
    flashcards: TFlashcard[];
    createdBy: TUser;
    isPublic: boolean;
}

export type TRecentStudySet = {
    id: string;
    title: string;
    accessedAt: string;
};

export type TQuest = {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    xpReward: number;
};

export type TUserExperience = {
    user: TUser;
    xp: number;
};
