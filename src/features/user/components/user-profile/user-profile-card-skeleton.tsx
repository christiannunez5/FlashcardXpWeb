import { Skeleton } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { FindFriendsModal } from "@/features/friends/components/find-friends/find-friends-modal";

export const UserProfileCardSkeleton = () => {
    return (
        <div className="bg-primary rounded-xl p-5 shadow-xs">
            <Skeleton className="bg-container h-72 rounded-xl relative">
                <Skeleton className="h-24 w-24 absolute left-5 -bottom-10 " />
            </Skeleton>

            <div className="pt-16 space-y-4">
                <div>
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-full" />
                </div>
                <div className="space-x-3">
                    <Button
                        variant={"outline"}
                        className="bg-primary rounded-full
                            px-6 py-3"
                    >
                        0 followers
                    </Button>

                    <FindFriendsModal />
                </div>
            </div>
        </div>
    );
};
