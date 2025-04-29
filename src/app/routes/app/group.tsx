import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { GroupMembers } from "@/features/groups/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";

import { useState } from "react";

export const Group = () => {
    // const { id } = useParams();

    const [selectedMenu, setSelectedMenu] = useState("Studysets");

    const groupMenuItems = ["Studysets", "Members"];

    const { data: studysets } = useGetCurrentUserStudySets();

    return (
        <MainLayout>
            <section>
                <div className="flex justify-between">
                    <h2>HCI 101</h2>
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create a new set</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add a set to this class</DialogTitle>
                            <p>hello</p>

                            <div>
                                <p>Some title</p>
                                <p className="text-sm text-muted-foreground">
                                    3 terms
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog> */}
                </div>

                <menu className="flex gap-5">
                    {groupMenuItems.map((group) => {
                        return (
                            <li
                                className={`border-accent py-1.5
                                    cursor-pointer ${
                                        selectedMenu === group &&
                                        "border-b-[2.5px] "
                                    }`}
                                onClick={() => setSelectedMenu(group)}
                            >
                                <p>{group}</p>
                            </li>
                        );
                    })}
                </menu>
            </section>

            <section>
                <div className="mt-5">
                    {selectedMenu === "Members" && <GroupMembers />}
                </div>
            </section>
        </MainLayout>
    );
};
