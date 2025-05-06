import { Skeleton } from "@/components/shared/skeleton";

export const RecentStudySetCardSkeleton = () => {
    return (
        <div className="card h-[150px] flex flex-col justify-between ">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
        </div>
    );
};
