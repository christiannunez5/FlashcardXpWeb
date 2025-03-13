import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import React, { ReactNode } from "react";

interface EditFlashCardModalProps {
    children: ReactNode;
}

export const EditFlashcardModal: React.FC<EditFlashCardModalProps> = ({
    children,
}) => {
    return (
        <div className="z-50 relative">
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>

                <DialogContent>
                    <p>hello</p>
                </DialogContent>
            </Dialog>
        </div>
    );
};
