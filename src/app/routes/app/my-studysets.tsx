import { MainLayout } from "@/components/layout";
import { AddDraftStudySetModal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { CreateGroupModal, Groups } from "@/features/groups/components";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { useState } from "react";

export const MyStudySets = () => {
    const { data: studySets } = useGetCurrentUserStudySets();

    const [selectedMenu, setSelectedMenu] = useState("Studysets");

    const menuItems = ["Studysets", "Groups"];
    
    return (
        <MainLayout>
            <section className="w-full h-full flex flex-col">
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
            </div>
        </MainLayout>
    );
};
