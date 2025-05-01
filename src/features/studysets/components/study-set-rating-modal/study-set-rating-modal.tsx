import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { StudySetRatingForm } from "./study-set-rating-form";
import { Button } from "@/components/ui/button";

export const StudySetRatingModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="p-2 px-5 border-[0.2px] border-container cursor-pointer
                        rounded-2xl hover:bg-foreground hover:text-primary-foreground"
                >
                    Rate it
                </button>
            </DialogTrigger>

            <DialogContent className="p-0 pb-4 border-none" hideCloseButton>
                <DialogTitle className="p-6 text-center border-b-2 border-container">
                    <h3>Rate your experience</h3>
                </DialogTitle>
                <StudySetRatingForm>
                    <DialogClose>
                        <Button
                            variant="outline"
                            type="button"
                            className="px-10"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </StudySetRatingForm>
            </DialogContent>
        </Dialog>
    );
};
