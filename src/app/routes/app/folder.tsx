import { MainLayout } from "@/components/layout";
import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";
import { Skeleton } from "@/components/shared/skeleton";
import { FormInput } from "@/components/ui/input";
import { FolderBreadCrumb } from "@/features/folders/components/folder-breadcrumbs";
import {
    useFolderBreadcrumbTrail,
    useGetFolderById,
    useGetStudySetsByFolder,
} from "@/features/folders/hooks";
import { ItemList } from "@/features/items";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

export const Folder = () => {
    const params = useParams();
    if (!params.id) {
        throw new Error("Folder id is required.");
    }

    const [inputValue, setInputValue] = useState("");
    const { data: currentFolder } = useGetFolderById(params.id);
    const { data: folders } = useFolderBreadcrumbTrail(params.id);
    const { data: studySets } = useGetStudySetsByFolder(params.id);

    return (
        <MainLayout>
            <div className="mb-1.5">
                <FolderBreadCrumb folders={folders} />
            </div>

            <div className="w-full  flex justify-between items-center">
                <div className="grow flex items-center">
                    {!currentFolder ? (
                        <Skeleton className="w-40 h-2" />
                    ) : (
                        <h3 className="grow ">{currentFolder?.name}</h3>
                    )}
                </div>

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

            {/* <FolderList folders={currentFolder?.subFolders} />

            <StudySets studySets={studySets} /> */}

            <div className="mt-6">
                <ItemList
                    inputValue={inputValue}
                    folders={currentFolder?.subFolders}
                    studySets={studySets}
                />
            </div>
        </MainLayout>
    );
};
