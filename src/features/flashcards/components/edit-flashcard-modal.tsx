import { Button } from "@/components/ui/button";
import { CircularButton } from "@/components/ui/circular-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import {
    TUpdateFlashcardSchema,
    updateFlashcardSchema,
    useUpdateFlashcard,
} from "@/features/flashcards/hooks";

import { TFlashcard } from "@/types";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";

interface EditFlashCardModalProps {
    flashcard: TFlashcard;
    studySetId: string;
}

export const EditFlashcardModal: React.FC<EditFlashCardModalProps> = ({
    flashcard,
    studySetId,
}) => {
    const { register, handleSubmit, getValues } =
        useForm<TUpdateFlashcardSchema>({
            resolver: zodResolver(updateFlashcardSchema),
            defaultValues: flashcard,
        });

    const [open, setOpen] = useState(false);

    const { mutate: updateFlashcard } = useUpdateFlashcard(studySetId);

    const handleUpdateFlashcard = () => {
        const data = getValues();
        
        updateFlashcard(
            {
                studySetId: studySetId,
                data,
            },
            {
                onSuccess: () => {
                    setOpen(!open);
                },
            }
        );
    };

    return (
        <div className="z-50 relative">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <CircularButton size={10} className="bg-container">
                        <FiEdit2 />
                    </CircularButton>
                </DialogTrigger>

                <DialogContent className="" hideCloseButton>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(
                            handleUpdateFlashcard,
                            (errors) => {
                                handleZodErrors(errors);
                            }
                        )}
                    >
                        <div className="space-y-1 w-full">
                            <h5>Term</h5>

                            <FormInput
                                className="border-[2px] rounded-md
                                border-gray-600 dark:border-container px-5 "
                                {...register("term")}
                            />
                        </div>

                        <div className="space-y-1 w-full">
                            <h5>Definition</h5>

                            <FormInput
                                className="border-[2.3px] rounded-md
                                border-gray-600 dark:border-container px-5 "
                                {...register("definition")}
                            />
                        </div>

                        <div className="flex justify-end gap-3 ">
                            <DialogClose asChild>
                                <Button
                                    className="w-fit px-10"
                                    variant="outline"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button className="w-fit px-10" type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
