import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateFolderForm } from "@/features/folders/components/create-folder/create-folder-form";
import React from "react";

interface CreateFolderModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
    open,
    setOpen,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent hideCloseButton>
                <h3>New Folder</h3>
                <CreateFolderForm
                    onDeleteSuccessCallback={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
};
