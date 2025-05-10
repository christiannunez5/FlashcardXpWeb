import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import { GroupMembers } from "@/features/groups/components";
import { StudySets } from "@/features/studysets/components";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { Plus } from "lucide-react";

import { useState } from "react";

export const Group = () => {
    // const { id } = useParams();

    const [selectedMenu, setSelectedMenu] = useState("Studysets");
    const groupMenuItems = ["Studysets", "Members"];

    const { data: studysets } = useGetCurrentUserStudySets();

    return (
        <MainLayout size={80}>
            <div
                className="relative w-full h-60
            bg-primary rounded-lg"
            >
                <div
                    className="w-full absolute bottom-0 p-5 
                flex justify-between"
                >
                    <h2>HCI 101</h2>

                    <CircularButton size={12} className="bg-accent">
                        <Plus />
                    </CircularButton>
                </div>
            </div>

            <main className="">
                <section className="mt-5">
                    {selectedMenu === "Studysets" ? (
                        <StudySets studySets={studysets} />
                    ) : (
                        <GroupMembers />
                    )}
                </section>
            </main>
        </MainLayout>
    );
};
