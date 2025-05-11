import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { FindFriendsForm } from "./find-friends-form";
import { Button } from "@/components/ui/button";

export const FindFriendsModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="bg-primary rounded-full
                            "
                >
                    Find friends
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[40%]">
                <DialogTitle className="text-center">
                    <h3>Find Friends</h3>
                </DialogTitle>

                <FindFriendsForm />
            </DialogContent>
        </Dialog>
    );
};
