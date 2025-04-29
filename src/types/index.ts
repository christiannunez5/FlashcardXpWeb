export type TStudySetSummary = {
    id: string;
    title: string;
    status: "Draft" | "Published";
    flashcardsCount: number;
    createdBy: TUser;
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

export interface TPopularStudySet {
    title: string;
    flashcardsCount: number;
    createdBy: TUser;
}

export type TRecentStudySet = {
    id: string;
    title: string;
    accessedAt: string;
    createdBy: TUser;
};

export type TQuest = {
    id: string;
    title: string;
    description: string;
    iconUrl: string;
    isCompleted: boolean;
    xpReward: number;
    goal: number;
    completedFlashcards: number;
};

export type TUserExperience = {
    user: TUser;
    currentExperience: number;
    level: { value: number; title: string };
    maxXp: number;
};

export type TGroupSummary = {
    id: string;
    name: string;
    membersCount: number;
};
