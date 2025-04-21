import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAddDraftStudySet } from "@/features/studysets/hooks";
import { PropsWithChildren } from "react";

export const AddDraftStudySetModal = ({ children }: PropsWithChildren) => {
    const { mutate: addEmptyStudySet } = useAddDraftStudySet();

    const handleAddEmptyStudySet = () => {
        addEmptyStudySet(undefined, {
            onSuccess: (data) => {
                window.location.href = `/study-set/${data}/edit`;
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader className="flex justify-center items-center mt-4">
                    <DialogTitle>
                        <h5 className="text-lg font-semibold text-center">
                            How would you like to create your flashcards?
                        </h5>
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full flex gap-4 h-[300px] text-accent-foreground">
                    <button
                        className="relative w-full bg-accent rounded-xl px-5
                        flex flex-col justify-center text-center hover:bg-accent/90"
                        onClick={handleAddEmptyStudySet}
                    >
                        <h5 className="font-medium">
                            Do it yourself flashcards
                        </h5>

                        <p className="text-gray-400 text-sm">
                            Personally create your flashcards and customize them
                            to your liking
                        </p>
                    </button>

                    <div
                        className="relative w-full bg-accent rounded-xl px-5 hover:bg-accent/90
                        flex flex-col justify-center text-center"
                    >
                        <h5 className="font-medium">AI generated flashcards</h5>
                        <p className="text-sm text-gray-400">
                            Upload your files and let AI do all the work
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
