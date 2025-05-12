import { Skeleton } from "@/components/shared/skeleton";
import React from "react";

export const TagCardSkeleton = () => {
    return (
        <div className="card rounded-3xl space-y-5">
            <Skeleton className="h-12 w-12" circle />
            <Skeleton className="h-2 w-full" />
        </div>
    );
};
