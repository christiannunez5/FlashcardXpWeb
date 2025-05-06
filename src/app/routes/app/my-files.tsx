import { MainLayout } from "@/components/layout";
import { AddDraftStudySetModal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { CreateGroupModal, Groups } from "@/features/groups/components";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { ChevronDown, Grid2x2, LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";
import folder from "@/assets/opened-folder.svg";
import { FolderList } from "@/features/folders/components";
import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";
import { useGetFolders } from "@/features/folders/hooks";
import { CircularButton } from "@/components/ui/circular-button";
import { ItemList } from "@/features/items/item-list/item-list";

export const MyFiles = () => {
    const { data: studySets } = useGetCurrentUserStudySets();

    const menuItems = ["Studysets", "Groups"];

    const [view, setView] = useState<"grid" | "list">("grid");

    const { data: folders } = useGetFolders();

    return (
        <MainLayout>
            <div className="w-full flex justify-between items-center mb-5">
                <h3 className="">Files</h3>
                <AddItemTypeModal>
                    <button
                        className="bg-accent flex items-center text-accent-foreground
                        py-2.5 rounded-4xl justify-center gap-4 w-36 cursor-pointer"
                    >
                        <Plus />
                        <p>Create</p>
                    </button>
                </AddItemTypeModal>
            </div>

            <div className="flex items-center justify-end gap-4 mb-5">
                <div className="p-2 px-6 bg-primary rounded-full flex items-center gap-1">
                    <p>By Type</p>
                    <ChevronDown size={17} />
                </div>

                <div className="h-10 w-10 rounded-lg bg-accent grid place-content-center">
                    <Grid2x2 size={20} />
                </div>

                <div className="h-10 w-10 rounded-lg bg-primary grid place-content-center">
                    <List size={20} />
                </div>
            </div>
            {/* <StudySets studySets={studySets} folders={folders} /> */}

            <ItemList folders={folders} studySets={studySets} />
        </MainLayout>
    );
};
