import folderIcon from "@/assets/folder-2.png";

import { useDeleteFolder } from "@/features/folders/hooks";
import { cn } from "@/lib/utils";
import { TFolderSummary } from "@/types";
import { EllipsisVertical, GripVertical } from "lucide-react";
import React, { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useNavigate } from "react-router";
import { FolderCardDropdown } from "@/features/folders/components/folder-list/folder-card-drop-down";
import { RenameFolderModal } from "@/features/folders/components/rename-folder";

interface FolderCardProps {
    folder: TFolderSummary;
    parentFolderId?: string;
    isFolderHovered: boolean;
}

export const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    parentFolderId,
    isFolderHovered,
}) => {
    const { mutate: deleteFolder } = useDeleteFolder(parentFolderId);
    const [openRenameModal, setOpenRenameModal] = useState(false);
    const navigate = useNavigate();

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
                setOpenRenameModal(!openRenameModal);
                break;
        }
    };

    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: folder.id,
    });

    const { attributes, listeners, transform, setNodeRef } = useDraggable({
        id: folder.id,
        data: {
            type: "folder",
        },
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

    return (
        <>
            <RenameFolderModal
                folder={folder}
                open={openRenameModal}
                setOpen={setOpenRenameModal}
            />

            <li
                className={cn(
                    "card relative bg-primary rounded-xl p-4 space-y-4 shadow-xs",
                    `${isFolderHovered && "border-accent"}`,
                    `${isFolderHovered && "border-2"}`
                )}
                ref={(node) => {
                    setDroppableNodeRef(node);
                    setNodeRef(node);
                }}
                style={{ ...style }}
                onClick={() => navigate(`/folders/${folder.id}`)}
            >
                <div className="flex justify-between">
                    <div className="bg-container h-16 w-16 rounded-full p-3">
                        <img src={folderIcon} />
                    </div>

                    <div className="flex gap-2 ">
                        <div
                            {...listeners}
                            {...attributes}
                            className="h-6 w-6 p-2 border-container hover:border
                                rounded-full grid place-content-center cursor-pointer"
                        >
                            <GripVertical size={16} />
                        </div>

                        <div>
                            <FolderCardDropdown
                                handleDropdownClick={handleDropdownClick}
                            >
                                <div
                                    className="h-6 w-6 p-2 border-container
                                    cursor-pointer hover:border 
                                    rounded-full grid place-content-center"
                                >
                                    <EllipsisVertical size={16} />
                                </div>
                            </FolderCardDropdown>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <p>{folder.name}</p>
                </div>
            </li>
        </>
    );
};
