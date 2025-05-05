import { Skeleton } from "@/components/shared/skeleton";

export const FolderCardSkeleton = () => {
    return (
        <div className="flex gap-5 items-center bg-primary p-4 rounded-2xl py-3 px-5">
            <Skeleton circle className="h-6 w-6" />
            <Skeleton className="grow h-2" />
        </div>
    );
};
