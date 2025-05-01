import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { StudySetRatingForm } from "./study-set-rating-form";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface StudySetRatingModalProps {
    children: ReactNode;
    userRating: number;
}

export const StudySetRatingModal: React.FC<StudySetRatingModalProps> = ({
    children,
    userRating,
}) => {
    const [openModal, setOpenModal] = useState(false);
    
    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="p-0 pb-4 border-none" hideCloseButton>
                <DialogTitle className="p-6 text-center border-b-2 border-container">
                    <h3>Rate your experience</h3>
                </DialogTitle>
                <StudySetRatingForm
                    userRating={userRating}
                    onSubmitCallback={() => setOpenModal(!openModal)}
                >
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
