import folderIcon from "@/assets/opened-folder.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteFolder } from "@/features/folders/hooks";
import { TFolderSummary } from "@/types";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface FolderCardProps {
    folder: TFolderSummary;
    parentFolderId?: string;
}

export const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    parentFolderId,
}) => {
    const navigate = useNavigate();

    const { mutate: deleteFolder } = useDeleteFolder(parentFolderId);

    const handleDropdownClick = (
        e: React.MouseEvent,
        name: "rename" | "delete"
    ) => {
        e.stopPropagation();

        switch (name) {
            case "delete":
                deleteFolder(folder.id);
                break;
            case "rename":
                alert("rename");
                break;
        }
    };

    return (
        <li
            className="flex gap-5 items-center bg-primary cursor-pointer
                       p-4 rounded-2xl border-container hover:border-2"
            onClick={() => navigate(`/folders/${folder.id}`)}
        >
            <div className="flex gap-5 grow">
                <img src={folderIcon} alt="" className="h-6" />
                <p className="text-sm font-medium">{folder.name}</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        className="h-6 w-6 rounded-full grid place-content-center hover:bg-container
                    cursor-pointer"
                    >
                        <Ellipsis size={14} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 border-2 border-container">
                    <DropdownMenuItem
                        className="hover:bg-container rounded-none p-3.5 space-x-2"
                        onClick={(e) => handleDropdownClick(e, "rename")}
                    >
                        <Pencil size={20} strokeWidth={2} />
                        <p>Rename </p>
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
                        <p className="text-destructive">Delete folder</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    );
};
