import React from "react";
import folder from "@/assets/opened-folder.svg";

export const FolderCard = () => {
    return (
        <li
            className="flex gap-5 items-center bg-primary cursor-pointer
                        p-3.5 rounded-2xl border-container hover:border-2"
        >
            <img src={folder} alt="" className="h-6" />
            <p className="text-sm font-medium">HCI 101</p>
        </li>
    );
};
