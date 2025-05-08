import { Skeleton } from "@/components/shared/skeleton";
import { FolderCard } from "@/features/folders/components/folder-list/folder-card";
import { useDeleteFolder } from "@/features/folders/hooks";
import { StudySetCard } from "@/features/studysets/components/study-sets/study-set-card";
import { useUpdateStudySetFolder } from "@/features/studysets/hooks";
import { TFolderSummary, TStudySetSummary } from "@/types";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverEvent,
} from "@dnd-kit/core";
import React, { useState } from "react";

interface ItemListProps {
    studySets: TStudySetSummary[] | undefined;
    folders: TFolderSummary[] | undefined;
}

export const ItemList: React.FC<ItemListProps> = ({ studySets, folders }) => {
    const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
    const { mutate: deleteFolder } = useDeleteFolder();
    const { mutate: updateStudySetFolder } = useUpdateStudySetFolder();

    if (!studySets || !folders) {
        return (
            <ul className="grid grid-cols-4 gap-5">
                {Array.from({ length: 6 }).map(() => {
                    return (
                        <li
                            className="bg-primary rounded-xl h-[180px] p-4
                            flex flex-col justify-between"
                        >
                            <Skeleton circle className="h-14 w-14" />

                            <Skeleton className="w-full h-2" />
                        </li>
                    );
                })}
            </ul>
        );
    }

    const items = [
        ...folders.map((folder) => ({
            type: "folder" as const,
            data: folder,
        })),
        ...studySets.map((studySet) => ({
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
            const folderId = active.id;
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
