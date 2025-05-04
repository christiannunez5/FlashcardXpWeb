import { Skeleton } from "@/components/shared/skeleton";
import React from "react";

export const FolderCardSkeleton = () => {
    return (
        <div className="flex gap-5 items-center bg-primary p-4 rounded-2xl">
            <Skeleton circle className="h-6 w-6" />

            <Skeleton className="grow h-2" />
        </div>
    );
};
