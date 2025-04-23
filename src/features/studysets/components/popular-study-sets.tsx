import { Skeleton } from "@/components/shared/skeleton";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

// interface PopularStudySetsProps {}

export const PopularStudySets = () => {
    return (
        <ul className="grid grid-cols-3 gap-4 mt-5">
            {Array.from({ length: 5 }).map((_) => (
                <PopularStudySetCard />
            ))}

            <PopularStudySetCardSkeleton />
        </ul>
    );
};

const PopularStudySetCard = () => {
    return (
        <div
            className="p-4 rounded-lg bg-primary shadow-md cursor-pointer
        hover:border-2 border-container space-y-3"
        >
            <h5>Literature 101</h5>
            <p
                className="text-sm text-muted-foreground 
            bg-container py-1 px-4 w-fit rounded-xl"
            >
                100 terms
            </p>
            <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=christian" />
                </Avatar>
                <p className="">Mark Christian Nunez</p>
            </div>
        </div>
    );
};

const PopularStudySetCardSkeleton = () => {
    return (
        <div className="p-4 rounded-lg bg-primary space-y-3 flex flex-col">
            <Skeleton height={10} width={200} />
            <Skeleton height={10} width={150} />
            <div className="flex items-center gap-2 mt-auto">
                <Skeleton circle height={50} width={50} />
                <Skeleton width={100} height={10} />
            </div>
        </div>
    );
};
