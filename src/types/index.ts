export interface StudySet {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    flashcardsCount: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    profilePicUrl: string;
}
