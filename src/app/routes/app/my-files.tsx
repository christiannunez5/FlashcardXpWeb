import { MainLayout } from "@/components/layout";
import { useGetCurrentUserStudySets } from "@/features/studysets/hooks";
import { Plus, Search } from "lucide-react";
import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";
import { useGetFolders } from "@/features/folders/hooks";
import { ItemList } from "@/features/items/item-list/item-list";
import { FormInput } from "@/components/ui/input";
import { useState } from "react";

export const MyFiles = () => {
    const { data: studySets } = useGetCurrentUserStudySets();
    const { data: folders } = useGetFolders();
    const [inputValue, setInputValue] = useState("");

    return (
        <MainLayout>
            <div className="w-full flex justify-between items-center mb-5">
                <h3 className="">Files</h3>
                <div className="flex gap-4">
                    <FormInput
                        icon={<Search />}
                        className="rounded-4xl py-2.5 px-4 bg-primary w-96 gap-4"
                        placeholder="Search name.."
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <AddItemTypeModal>
                        <button
                            className="bg-accent flex items-center text-accent-foreground
                        py-2.5 rounded-4xl justify-center gap-2 w-32 cursor-pointer"
                        >
                            <Plus />
                            <p>Create</p>
                        </button>
                    </AddItemTypeModal>
                </div>
            </div>

            <div className="mt-5  ">
                <ItemList
                    studySets={studySets}
                    folders={folders}
                    inputValue={inputValue}
                />
            </div>
        </MainLayout>
    );
};
