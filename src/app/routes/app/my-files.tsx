import { MainLayout } from "@/components/layout";
import { AddDraftStudySetModal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { CreateGroupModal, Groups } from "@/features/groups/components";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { ChevronDown, LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";
import folder from "@/assets/opened-folder.svg";
import { FolderList } from "@/features/folders/components";
import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";

export const MyFiles = () => {
    const { data: studySets } = useGetCurrentUserStudySets();

    const [selectedMenu, setSelectedMenu] = useState("Studysets");

    const menuItems = ["Studysets", "Groups"];

    const [isGrid, setIsGrid] = useState<"grid" | "list">("grid");

    return (
        <MainLayout>
            {/* <section className="w-full h-full flex flex-col">
                <div className="flex justify-between">
                    <menu className="flex gap-10 w-fit rounded-3xl p-2">
                        {menuItems.map((menu) => {
                            return (
                                <li
                                    className={`border-accent py-1.5
                                cursor-pointer ${
                                    selectedMenu === menu && "border-b-[2.5px] "
                                }`}
                                    onClick={() => setSelectedMenu(menu)}
                                >
                                    <h5>{menu}</h5>
                                </li>
                            );
                        })}
                    </menu>

                    {selectedMenu === "Studysets" ? (
                        <AddDraftStudySetModal>
                            <Button>Create new set</Button>
                        </AddDraftStudySetModal>
                    ) : (
                        <CreateGroupModal>
                            <Button>Create new group</Button>
                        </CreateGroupModal>
                    )}
                </div>

                <div className="h-full w-full mt-5">
                    {selectedMenu === "Studysets" ? (
                        <StudySets studySets={studySets} />
                    ) : (
                        <Groups />
                    )}
                </div>
            </section>

            <div>
                <ul>
                    <li></li>
                </ul>
            </div> */}

            <div className="w-full  flex justify-between items-center">
                <h3 className="grow ">Files</h3>
                <AddItemTypeModal>
                    <button
                        className="bg-accent flex items-center text-accent-foreground
                py-3 rounded-4xl justify-center gap-2 w-32 cursor-pointer"
                    >
                        <Plus />
                        <p className="font-medium">Create</p>
                    </button>
                </AddItemTypeModal>
            </div>

            <div className="flex justify-between mt-4 ">
                <div
                    className="py-2.5 px-5 rounded-4xl cursor-pointer bg-primary w-fit flex gap-2 items-center
                     border-container hover:border-[1.5px] font-medium"
                >
                    <p>Type</p>
                    <ChevronDown size={15} />
                </div>

                <div
                    className="bg-primary rounded-3xl flex w-20 items-center
                justify-center gap-2"
                >
                    <div
                        className="bg-foreground text-white h-8 w-8 rounded-full grid place-content-center"
                        onClick={() => setIsGrid("grid")}
                    >
                        <LayoutGrid size={20} />
                    </div>

                    <div
                        className="h-8 w-8 rounded-full grid place-content-center"
                        onClick={() => setIsGrid("list")}
                    >
                        <List size={20} />
                    </div>
                </div>
            </div>

            <section className="space-y-3 mt-5">
                <h5>Folders</h5>
                <FolderList />
            </section>

            <section className="space-y-3 mt-5">
                <h5>Study sets</h5>
                <StudySets studySets={studySets} />
            </section>
        </MainLayout>
    );
};
