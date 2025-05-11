import { Skeleton } from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FollowersList } from "@/features/friends/components/followers/followers-list";
import { useGetFollowers } from "@/features/friends/hooks";
import { X } from "lucide-react";

export const FollowerModal = () => {
    const { data: followers } = useGetFollowers();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="bg-primary rounded-full">
                    {!followers ? (
                        <Skeleton className="h-2 w-24" />
                    ) : (
                        <p>{followers.length} followers</p>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent hideCloseButton>
                <DialogClose className="absolute right-5 top-5">
                    <CircularButton
                        className="w-fit p-2 bg-destructive text-white
                    hover:brightness-75"
                    >
                        <X />
                    </CircularButton>
                </DialogClose>

                <DialogTitle>
                    <h4>Followers</h4>
                </DialogTitle>

                <FollowersList users={followers} />
            </DialogContent>
        </Dialog>
    );
};
