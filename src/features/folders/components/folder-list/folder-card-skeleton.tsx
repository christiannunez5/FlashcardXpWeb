import { Skeleton } from "@/components/shared/skeleton";

export const FolderCardSkeleton = () => {
    return (
        <div className="bg-primary rounded-xl gap-6 p-4 flex flex-col justify-between">
            <div>
                <Skeleton circle className="h-16 w-16" />
            </div>

            <Skeleton className="h-2" />
        </div>
    );
};
