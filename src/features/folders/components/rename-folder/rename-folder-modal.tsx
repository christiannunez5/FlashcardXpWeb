import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RenameFolderForm } from "./rename-folder-form";
import { TFolderSummary } from "@/types";

interface RenameFolderModalProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    folder: TFolderSummary;
}

export const RenameFolderModal: React.FC<RenameFolderModalProps> = ({
    open,
    setOpen,
    folder,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                hideCloseButton
                className="outline-none min-w-[40%] p-10"
            >
                <h4>Rename folder</h4>

                <RenameFolderForm
                    folder={folder}
                    onSubmitCallback={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
};
