import { Pencil, Lock, GitMerge, Trash } from "lucide-react";

export type StudySetDropdownAction = "edit" | "combine" | "delete" | "share";

export type StudySetDropDownItem = {
    label: string;
    icon: React.ElementType;
    action: StudySetDropdownAction;
    destructive: boolean;
    show: boolean;
};

export const studySetDropdownData: StudySetDropDownItem[] = [
    {
        label: "Edit",
        icon: Pencil,
        action: "edit",
        destructive: false,
        show: true,
    },
    {
        label: "Manage sharing",
        icon: Lock,
        action: "share",
        destructive: false,
        show: true,
    },
    {
        label: "Combine",
        icon: GitMerge,
        action: "combine",
        destructive: false,
        show: true,
    },
    {
        label: "Delete set",
        icon: Trash,
        action: "delete",
        destructive: true,
        show: true,
    },
];
