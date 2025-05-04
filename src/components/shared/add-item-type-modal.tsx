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
import group from "@/assets/group.png";
import { groupMenuData } from "@/data/group-menu-data";
import { TCreateMenuType } from "@/types";
import { useCreateDraftStudySet } from "@/features/studysets/hooks";
import { CreateFolderModal } from "@/features/folders/components";
import { useParams } from "react-router";

interface AddItemTypeModalProps {
    children: ReactNode;
}

type MenuItemKey = "Flashcards" | "Groups" | "Folders";

const ALL_MENU_ITEMS: Record<MenuItemKey, { icon: string }> = {
    Flashcards: { icon: flashcard },
    Folders: { icon: folder },
    Groups: { icon: group },
};

const ALL_MENU_DATA_MAP: Record<MenuItemKey, TCreateMenuType[]> = {
    Flashcards: studySetMenuData,
    Folders: folderMenuData,
    Groups: groupMenuData,
};

export const AddItemTypeModal: React.FC<AddItemTypeModalProps> = ({
    children,
}) => {
    const params = useParams();
    const { mutate: createDraftStudySet } = useCreateDraftStudySet();

    const menuKeys: MenuItemKey[] = params.id
        ? ["Flashcards", "Folders"]
        : ["Flashcards", "Folders", "Groups"];

    const [selectedItem, setSelectedItem] = useState<MenuItemKey>(menuKeys[0]);
    const [openModal, setOpenModal] = useState(false);

    const menuItems = menuKeys.map((key) => ({
        title: key,
        icon: ALL_MENU_ITEMS[key].icon,
    }));

    const selectedData = ALL_MENU_DATA_MAP[selectedItem] ?? [];

    const handleMenuClick = (type: "modal" | "navigate", action: string) => {
        if (type === "modal") {
            setOpenModal(true);
            return;
        }

        if (type === "navigate" && action == "create-study-set") {
            const data = {
                folderId: params.id,
            };

            createDraftStudySet(
                { data },
                {
                    onSuccess: (createdStudySetId) => {
                        window.location.href = `/study-set/${createdStudySetId}/edit`;
                    },
                }
            );
        }

        if (type === "navigate" && action === "create-study-set-ai") {
            alert("Ai studyset");
        }
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <CreateGroupModal
                open={openModal && selectedItem === "Groups"}
                setOpen={setOpenModal}
            />
            <CreateFolderModal
                open={openModal && selectedItem === "Folders"}
                setOpen={setOpenModal}
            />

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
                                    onClick={() =>
                                        handleMenuClick(data.type, data.action)
                                    }
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
