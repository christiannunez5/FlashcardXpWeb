import { CircularButton } from "@/components/ui/circular-button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IoSettingsOutline } from "react-icons/io5";

export const FlashcardsOptionsModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <CircularButton
                    size={10}
                    className="bg-primary hover:bg-container"
                >
                    <IoSettingsOutline className="text-xl" />
                </CircularButton>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <p>Flashcard options</p>
                </DialogHeader>

                <p>hello</p>
            </DialogContent>
        </Dialog>
    );
};
