import { AddItemTypeModal } from "@/components/shared/add-item-type-modal";
import { Button } from "@/components/ui/button";
import { FolderCard } from "@/features/folders/components/folder-list/folder-card";
import { FolderCardSkeleton } from "@/features/folders/components/folder-list/folder-card-skeleton";
import { useUpdateParentFolder } from "@/features/folders/hooks";
import { StudySetCard } from "@/features/studysets/components/study-sets/study-set-card";
import { useUpdateStudySetFolder } from "@/features/studysets/hooks";
import { TFolderSummary, TStudySetSummary } from "@/types";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { Layers } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router";

interface ItemListProps {
    studySets: TStudySetSummary[] | undefined;
    folders: TFolderSummary[] | undefined;
    inputValue: string;
}

export const ItemList: React.FC<ItemListProps> = ({
    studySets,
    folders,
    inputValue,
}) => {
    const params = useParams();
    const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
    const { mutate: updateStudySetFolder } = useUpdateStudySetFolder(params.id);
    const { mutate: updateParentFolder } = useUpdateParentFolder(params.id);

    if (!studySets || !folders) {
        return (
            <ul className="grid grid-cols-4 gap-5">
                {Array.from({ length: 6 }).map(() => {
                    return <FolderCardSkeleton />;
                })}
            </ul>
        );
    }

    if (studySets.length === 0 && folders.length === 0) {
        return (
            <div
                className="w-full h-96 flex flex-col items-center
            justify-center  rounded-xl p-4"
            >
                <Layers size={65} className="text-muted-foreground mb-4" />

                <h3 className="text-lg font-semibold mb-2">No materials yet</h3>
                <p className="text-muted-foreground">
                    Create a folder or a study set to get started.
                </p>

                <AddItemTypeModal>
                    <Button className="mt-5 rounded-full px-10 py-5">
                        Create
                    </Button>
                </AddItemTypeModal>
            </div>
        );
    }

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const filteredStudySets = studySets.filter((studySet) =>
        studySet.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    const items = [
        ...filteredFolders.map((folder) => ({
            type: "folder" as const,
            data: folder,
        })),
        ...filteredStudySets.map((studySet) => ({
            type: "studysets" as const,
            data: studySet,
        })),
    ];

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        setHoveredFolder(null);

        if (!over) return;

        if (over.id === active.id) return;

        const parentFolderId = over.id as string;

        if (active.data.current?.type === "folder") {
            const folderId = active.id as string;
            const parentFolderId = over.id as string;

            updateParentFolder({ folderId, data: { parentFolderId } });
        } else {
            const studySetId = active.id as string;

            updateStudySetFolder({
                studySetId,
                data: { folderId: parentFolderId },
            });
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) {
            setHoveredFolder(null);
            return;
        }

        if (over.id === active.id) return;

        const parentFolderId = over.id as string;
        setHoveredFolder(parentFolderId);
    }

    return (
        <section>
            <DndContext
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragCancel={() => setHoveredFolder(null)}
            >
                <ul className="grid grid-cols-4 gap-5">
                    {items.map((item) => {
                        if (item.type === "folder") {
                            return (
                                <FolderCard
                                    parentFolderId={params.id}
                                    folder={item.data}
                                    key={item.data.id}
                                    isFolderHovered={
                                        hoveredFolder === item.data.id
                                    }
                                />
                            );
                        }

                        return (
                            <StudySetCard
                                studySet={item.data}
                                key={item.data.id}
                            />
                        );
                    })}
                </ul>
            </DndContext>
        </section>
    );
};
