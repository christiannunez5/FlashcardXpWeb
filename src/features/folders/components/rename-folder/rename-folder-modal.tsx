import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RenameFolderForm } from "./rename-folder-form";
import { TFolderSummary } from "@/types";

interface RenameFolderModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    folder: TFolderSummary;
}

export const RenameFolderModal: React.FC<RenameFolderModalProps> = ({
    open,
    setOpen,
    folder,
}) => {
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                hideCloseButton
                onClick={handleContentClick}
                className="outline-none min-w-[40%] p-10"
            >
                <h4>Rename folder</h4>

                <RenameFolderForm
                    folder={folder}
                    onSubmitCallback={() => setOpen(!open)}
                />
            </DialogContent>
        </Dialog>
    );
};
