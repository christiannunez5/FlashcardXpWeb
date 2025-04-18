import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCompletedFlashcards } from "@/features/flashcards/hooks";
import { useGetCurrentUserQuests } from "@/features/quests/hooks";
import { FaExclamation } from "react-icons/fa";

export const QuizModal = () => {
    const { data: quests, isLoading } = useGetCurrentUserQuests();

    const { data: flashcardCompleted } = useGetCompletedFlashcards();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CircularButton
                    className="bg-inherit hover:bg-container"
                    size={10}
                >
                    <FaExclamation />
                </CircularButton>
            </DialogTrigger>
            <DialogContent className="min-w-[70%] ">
                <DialogTitle>
                    <h3 className="text-center">Daily Quest</h3>
                </DialogTitle>

                {isLoading ? null : (
                    <ul className="space-y-3">
                        {quests?.map((quest) => {
                            return (
                                <div
                                    className="flex gap-4 items-center 
                                p-3 rounded-lg "
                                >
                                    <div className="w-full space-y-2">
                                        <p>{quest.description}</p>

                                        <div
                                            className="relative w-full h-3 rounded-2xl bg-container
                                            flex justify-center "
                                        >
                                            <div
                                                className="absolute left-0 bg-green-300 w-[60%] h-3
                                            rounded-l-2xl"
                                            ></div>

                                            <p className="relative z-30 text-sm -translate-y-3">
                                                {flashcardCompleted?.count} / 20
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            className="border-2 border-container rounded-lg
                                        py-2 bg-accent text-accent-foreground w-36"
                                            disabled={!quest.isCompleted}
                                        >
                                            {quest.xpReward}xp
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                )}
            </DialogContent>
        </Dialog>
    );
};
