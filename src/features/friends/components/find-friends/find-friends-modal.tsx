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
                            px-6 py-3"
                >
                    Find friends
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle className="text-center">
                    <h3>Find Friends</h3>
                </DialogTitle>

                <FindFriendsForm />
            </DialogContent>
        </Dialog>
    );
};
