import { Skeleton } from "@/components/shared/skeleton";

export const TopCreatorCardSkeleton = () => {
    return (
        <li className="p-5 bg-primary rounded-2xl flex items-center">
            <div className="w-32">
                <Skeleton className="h-12 w-12" circle />
            </div>

            <div className="flex gap-8 items-center grow">
                <Skeleton circle className="h-24 w-24" />

                <div className="flex flex-col">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-full" />
                </div>
            </div>

            <div className="px-10">
                <Skeleton className="h-2 w-full" />
            </div>
        </li>
    );
};
