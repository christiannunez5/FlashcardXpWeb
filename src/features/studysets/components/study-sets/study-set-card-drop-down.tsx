import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, GitMerge, Trash } from "lucide-react";

interface StudySetCardDropdownProps {
    handleDropdownClick: (
        e: React.MouseEvent,
        name: "edit" | "delete" | "combine"
    ) => void;
}

export const StudySetCardDropdown: React.FC<StudySetCardDropdownProps> = ({
    handleDropdownClick,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center
                                        hover:bg-container cursor-pointer"
                    onClick={(e) => handleDropdownClick(e, "edit")}
                >
                    <EllipsisVertical size={14} />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52">
                <DropdownMenuItem className="hover:bg-container rounded-none p-3.5 space-x-2 ">
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
