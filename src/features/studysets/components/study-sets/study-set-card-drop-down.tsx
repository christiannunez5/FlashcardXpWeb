import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, GitMerge, Trash } from "lucide-react";
import { ReactNode } from "react";

interface StudySetCardDropdownProps {
    handleDropdownClick: (
        e: React.MouseEvent,
        name: "edit" | "delete" | "combine"
    ) => void;
    children?: ReactNode;
}

export const StudySetCardDropdown: React.FC<StudySetCardDropdownProps> = ({
    handleDropdownClick,
    children,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52 border-2 border-container">
                <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2 "
                    onClick={(e) => handleDropdownClick(e, "edit")}
                >
                    <Pencil size={20} strokeWidth={2} />
                    <p>Edit </p>
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
                    <GitMerge size={20} strokeWidth={2} />
                    <p>Combine </p>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2"
                    onClick={(e) => handleDropdownClick(e, "delete")}
                >
                    <Trash
                        size={20}
                        strokeWidth={2}
                        className="text-destructive"
                    />
                    <p className="text-destructive">Delete set</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
