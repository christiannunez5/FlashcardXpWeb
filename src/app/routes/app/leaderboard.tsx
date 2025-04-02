import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { Copy } from "lucide-react";
import { FiPlus } from "react-icons/fi";

const Leaderboard = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <CircularButton
                        className="bg-accent text-accent-foreground"
                        size={10}
                    >
                        <FiPlus />
                    </CircularButton>
                </DialogTrigger>

                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2"></div>
                        <Button type="submit" size="sm" className="px-3">
                            <span className="sr-only">Copy</span>
                            <Copy />
                        </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Leaderboard;
