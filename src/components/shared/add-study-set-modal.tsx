import {
    Dialog,
    DialogContent,
    DialogHeader,
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
                    <p className="text-lg font-semibold">
                        How would you like to create your flashcards?
                    </p>
                </DialogHeader>

                <div className="w-full flex gap-4 h-[300px] text-accent-foreground">
                    <button
                        className="relative w-full bg-accent rounded-xl px-5
                        flex flex-col justify-center text-center hover:bg-accent/90"
                        onClick={handleAddEmptyStudySet}
                    >
                        <p className="font-medium">Do it yourself flashcards</p>
                        <p className="text-sm text-muted-foreground">
                            Upload your files and let AI do all the work
                        </p>
                    </button>

                    <div
                        className="relative w-full bg-accent rounded-xl px-5 hover:bg-accent/90
                        flex flex-col justify-center text-center"
                    >
                        <a href="" className="absolute inset-0 "></a>
                        <p className="font-medium">AI generated flashcards</p>
                        <p className="text-muted-foreground text-sm">
                            Personally create your flashcards and customize them
                            to your liking
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
