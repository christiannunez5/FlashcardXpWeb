import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddStudySetTagForm } from "./add-study-set-tag-form";

import { TTag } from "@/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";

interface AddStudySetTagModalProps {
    children: ReactNode;
    tags: TTag[];
}

export const AddStudySetTagModal: React.FC<AddStudySetTagModalProps> = ({
    children,
    tags,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    <h4>Edit your tags</h4>
                </DialogTitle>

                <div>
                    <AddStudySetTagForm tags={tags} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
