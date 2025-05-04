import { MainLayout } from "@/components/layout";
import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";
import { Skeleton } from "@/components/shared/skeleton";

import { FolderList } from "@/features/folders/components";
import { FolderBreadCrumb } from "@/features/folders/components/folder-breadcrumbs";
import {
    useFolderBreadcrumbTrail,
    useGetFolderById,
    useGetStudySetsByFolder,
} from "@/features/folders/hooks";
import { StudySets } from "@/features/studysets/components";
import { Plus } from "lucide-react";
import { useParams } from "react-router";

export const Folder = () => {
    const params = useParams();
    if (!params.id) {
        throw new Error("Folder id is required.");
    }

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

            <FolderList folders={currentFolder?.subFolders} />

            <StudySets studySets={studySets} />
        </MainLayout>
    );
};
