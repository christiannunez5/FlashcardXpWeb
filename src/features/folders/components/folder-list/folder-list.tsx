import { TFolderSummary } from "@/types";
import { FolderCard } from "./folder-card";
import { FolderCardSkeleton } from "./folder-card-skeleton";
import React from "react";
import { useParams } from "react-router";

interface FolderListProps {
    folders: TFolderSummary[] | undefined;
}

export const FolderList: React.FC<FolderListProps> = ({ folders }) => {
    const params = useParams();

    // if (!folders) {
    //     return (
    //         <section className="space-y-3 mt-5">
    //             <h5>Folders</h5>
    //             <ul className="grid grid-cols-4 gap-4">
    //                 {Array.from({ length: 4 }).map((_, index) => {
    //                     return <FolderCardSkeleton key={index} />;
    //                 })}
    //             </ul>
    //         </section>
    //     );
    // }

    // if (folders.length === 0) {
    //     return null;
    // }

    // return (
    //     <section className="space-y-3 mt-5">
    //         <h5>Folders</h5>
    //         <ul className="grid grid-cols-4 gap-4">
    //             {folders.map((folder) => {
    //                 return (
    //                     <FolderCard
    //                         folder={folder}
    //                         key={folder.id}
    //                         parentFolderId={params.id}
    //                     />
    //                 );
    //             })}
    //         </ul>
    //     </section>
    // );

    return (
        <ul>
            
        </ul>
    );
};
