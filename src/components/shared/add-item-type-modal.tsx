import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import folder from "@/assets/opened-folder.svg";
import flashcard from "@/assets/flash-card.png";
import { studySetMenuData } from "@/data/study-set-menu-data";
import { folderMenuData } from "@/data/folder-menu-data";
import { CreateGroupModal } from "@/features/groups/components";

interface AddItemTypeModalProps {
    children: ReactNode;
}

export const AddItemTypeModal: React.FC<AddItemTypeModalProps> = ({
    children,
}) => {
    const [selectedItem, setSelectedItem] = useState("Flashcards");

    const menuItems = [
        {
            title: "Flashcards",
            icon: flashcard,
        },
        {
            title: "Folders",
            icon: folder,
        },
        {
            title: "Groups",
            icon: folder,
        },
    ];

    const selectedData =
        selectedItem === "Flashcards" ? studySetMenuData : folderMenuData;

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <CreateGroupModal />

            <DialogContent
                className=" flex gap-2 p-0 min-w-[70%] max-h-[600px]"
                hideCloseButton
            >
                <DialogClose className="absolute right-5 top-5">
                    <CircularButton
                        className="w-fit p-2 bg-destructive text-white
                    hover:brightness-75"
                    >
                        <X />
                    </CircularButton>
                </DialogClose>

                <menu
                    className="border-r-2 border-container p-4 space-y-2
                py-10"
                >
                    {menuItems.map((menu) => {
                        return (
                            <li
                                onClick={() => {
                                    setSelectedItem(menu.title);
                                }}
                                className={`p-2 rounded-lg w-52 px-4 cursor-pointer flex gap-2
                                    hover:border-[1px] border-foreground items-center ${
                                        selectedItem.toLowerCase() ===
                                            menu.title.toLowerCase() &&
                                        "bg-container"
                                    }`}
                            >
                                <img src={menu.icon} alt="" className="h-5" />
                                <p className="font-medium ">{menu.title}</p>
                            </li>
                        );
                    })}
                </menu>

                <main className="p-4 space-y-4 w-full py-10">
                    <h4>Create</h4>
                    <ul className="grid grid-cols-3 gap-4">
                        {selectedData.map((data) => {
                            return (
                                <li
                                    className="rounded-lg bg-primary p-5 space-y-2 shadow-md 
                                    hover:border-2 hover:border-container cursor-pointer"
                                    onClick={() => {
                                        if (
                                            data.type === "modal" &&
                                            data.action === "createFolder"
                                        ) {
                                            alert("Create folder");
                                        }
                                    }}
                                >
                                    <img
                                        src={data.icon}
                                        alt=""
                                        className="h-12 w-12"
                                    />
                                    <p className="font-medium">{data.title}</p>
                                </li>
                            );
                        })}
                    </ul>
                </main>
            </DialogContent>
        </Dialog>
    );
};
