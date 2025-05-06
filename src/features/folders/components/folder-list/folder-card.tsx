import folderIcon from "@/assets/opened-folder.svg";

import { useDeleteFolder } from "@/features/folders/hooks";
import { cn } from "@/lib/utils";
import { TFolderSummary } from "@/types";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import { DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";

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
        // <li className="card rounded-2xl flex gap-5 items-center py-3 px-5 relative">
        //     <a href={`/folders/${folder.id}`} className="absolute inset-0 "></a>

        //     <div className="flex gap-5 grow">
        //         <img src={folderIcon} alt="" className="h-6" />
        //         <p>{folder.name}</p>
        //     </div>

        //     <RenameFolderModal
        //         open={openRenameModal}
        //         setOpen={setOpenRenameModal}
        //         folder={folder}
        //     />

        //     <DropdownMenu>
        //         <DropdownMenuTrigger>
        //             <div
        //                 className="h-6 w-6 rounded-full grid place-content-center hover:bg-container
        //             cursor-pointer relative z-20"
        //             >
        //                 <Ellipsis size={14} />
        //             </div>
        //         </DropdownMenuTrigger>

        //         <DropdownMenuContent className="w-52 border-2 border-container">
        //             <DropdownMenuItem
        //                 className="hover:bg-container rounded-none p-3.5 space-x-2"
        //                 onClick={(e) => handleDropdownClick(e, "rename")}
        //             >
        //                 <Pencil size={20} strokeWidth={2} />
        //                 <p>Rename </p>
        //             </DropdownMenuItem>

        //             <DropdownMenuItem
        //                 className="hover:bg-container rounded-none p-3.5 space-x-2"
        //                 onClick={(e) => handleDropdownClick(e, "delete")}
        //             >
        //                 <Trash
        //                     size={20}
        //                     strokeWidth={2}
        //                     className="text-destructive"
        //                 />
        //                 <p className="text-destructive">Delete folder</p>
        //             </DropdownMenuItem>
        //         </DropdownMenuContent>
        //     </DropdownMenu>
        // </li>

        <li
            className={cn(
                "relative bg-primary rounded-xl p-4 space-y-4 shadow-xs",
                `${isFolderHovered && "border-accent"}`,
                `${isFolderHovered && "border-2"}`
            )}
            ref={(node) => {
                setDroppableNodeRef(node);
                setNodeRef(node);
            }}
            {...listeners}
            {...attributes}
            style={{ ...style, pointerEvents: "auto" }}
        >
            <div className="flex justify-between">
                <div className="bg-container h-14 w-14 rounded-full p-3">
                    <img src={folderIcon} />
                </div>
                <EllipsisVertical
                    className="text-gray-400"
                    size={20}
                    strokeWidth={3}
                />
            </div>

            <p>{folder.name}</p>
        </li>
    );
};
