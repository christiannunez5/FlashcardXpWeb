import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, Trash } from "lucide-react";
import { ReactNode } from "react";

interface FolderCardDropdownProps {
    children: ReactNode;
    handleDropdownClick: (
        e: React.MouseEvent,
        action: "rename" | "delete"
    ) => void;
}

export const FolderCardDropdown: React.FC<FolderCardDropdownProps> = ({
    children,
    handleDropdownClick,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 border-2 border-container">
                <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2"
                    onClick={(e) => handleDropdownClick(e, "rename")}
                    onSelect={(e) => {
                        e.preventDefault();
                        document.body.style.pointerEvents = "";
                    }}
                >
                    <Edit size={20} strokeWidth={2} />
                    <p className="">Rename</p>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="hover:bg-container rounded-none p-3.5 space-x-2"
                    onClick={(e) => handleDropdownClick(e, "delete")}
                >
                    <Trash size={20} strokeWidth={2} className="text-red-400" />
                    <p className="text-red-400">Delete folder</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
