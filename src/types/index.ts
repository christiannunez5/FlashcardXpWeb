// study sets

import { ReactNode } from "react";

export type TStudySetSummary = {
    id: string;
    title: string;
    status: "Draft" | "Published";
    flashcardsCount: number;
    createdBy: TUser;
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
    createdBy: TUser;
};

export interface TPopularStudySet {
    title: string;
    flashcardsCount: number;
    createdBy: TUser;
}

export type TStudySetRating = {
    averageRating: number;
    ratedByCount: number;
};

// study set section ends

// flashcard section

export type TFlashcard = {
    id: string;
    term: string;
    definition: string;
};

export type TCompletedFlashcard = {
    count: number;
};

// flashcard section ends

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

// group section

export type TGroupSummary = {
    id: string;
    name: string;
    membersCount: number;
};

// group section ends

// folder section

export type TFolderSummary = {
    id: string;
    name: string;
    parentFolderId: string | undefined;
};

export type TFolder = TFolderSummary & {
    subFolders: TFolderSummary[];
};

// utilities

export type TCreateMenuType = {
    title: string;
    icon: string;
    type: "modal" | "navigate";
    action: string;
};
