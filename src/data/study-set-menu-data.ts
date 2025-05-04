import flashcard from "@/assets/flash-card.png";
import upload from "@/assets/pitch-deck.png";
import { TCreateMenuType } from "@/types";

export const studySetMenuData: TCreateMenuType[] = [
    {
        title: "Upload a pdf, ppt, or docx and let AI do the work",
        icon: upload,
        type: "navigate",
        action: "create-study-set-ai",
    },
    {
        title: "Create your flashcards manually",
        icon: flashcard,
        type: "navigate",
        action: "create-study-set",
    },
];
