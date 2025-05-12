import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCurrentUserQuests } from "../hooks";
import { useCompleteQuest } from "../hooks";
import { TQuest } from "@/types";
import React from "react";
import { FaExclamation } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { getExperiencePercentage } from "@/utils";
import { Progress } from "@/components/ui/progress";

export const QuestModal = () => {
    const { data: quests, isLoading } = useGetCurrentUserQuests();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CircularButton className="bg-inherit hover:bg-container h-10 w-10">
                    <FaExclamation />
                </CircularButton>
            </DialogTrigger>

            <DialogContent
                className="min-w-[70%] max-h-[600px] overflow-y-auto"
                hideCloseButton
            >
                <DialogClose className="absolute right-5 top-5">
                    <CircularButton
                        className="w-fit p-2 bg-destructive text-white
                    hover:brightness-75"
                    >
                        <X />
                    </CircularButton>
                </DialogClose>

                <DialogTitle>
                    <h3 className="text-center">Daily Quest</h3>
                </DialogTitle>

                {isLoading ? null : (
                    <ul className="space-y-3">
                        {quests?.map((quest) => {
                            return <QuestItem quest={quest} key={quest.id} />;
                        })}
                    </ul>
                )}
            </DialogContent>
        </Dialog>
    );
};

interface QuestItemProps {
    quest: TQuest;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest }) => {
    const { mutate: completeQuest } = useCompleteQuest();

    const handleCompleteQuest = () => {
        completeQuest(quest.id);
    };

    const value = getExperiencePercentage(
        quest.completedFlashcards,
        quest.goal
    );

    return (
        <li className="flex gap-4 items-center">
            <div className="w-full space-y-1">
                <p className="font-semibold">{quest.title}</p>
                <p>{quest.description}</p>

                <div className="relative flex flex-col items-center">
                    {/* <ProgressBar
                        currentProgress={quest.completedFlashcards}
                        maxProgress={quest.goal}
                        height={0.8}
                    /> */}

                    <Progress value={value} className="h-3 bg-container" />

                    <p className="absolute z-30 text-sm -translate-y-3">
                        {`${quest.completedFlashcards} / ${quest.goal}`}
                    </p>
                </div>
            </div>

            <div className="relative p-4 rounded-full border-2 border-container">
                <img src={quest.iconUrl} alt="" className="h-16 w-24" />
                <p className="absolute left-6">{quest.xpReward} xp</p>
            </div>

            <div>
                <Button
                    className="border-2 border-container rounded-lg
                                        py-3.5 bg-green-600 text-accent-foreground w-44 self-end"
                    disabled={quest.completedFlashcards !== quest.goal}
                    onClick={handleCompleteQuest}
                >
                    Complete
                </Button>
            </div>
        </li>
    );
};
