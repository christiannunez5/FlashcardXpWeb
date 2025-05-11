import { Skeleton } from "@/components/shared/skeleton";

export const PopularStudySetCardSkeleton = () => {
    return (
        <div
            className="bg-primary p-4 flex flex-col justify-between h-[150px]
        rounded-lg"
        >
            <Skeleton className="h-2 w-full" />

            <div className="flex gap-3 items-center">
                <Skeleton className="h-8 w-8" circle />
                <Skeleton className="h-2 grow" />
            </div>
        </div>
    );
};
