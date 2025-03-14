import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
    useUpdateFlashcards,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudySetFormSection } from "./study-set-form-section";
import { useForm, useWatch } from "react-hook-form";
import { handleZodErrors } from "@/utils";
import { useDeleteFlashcard } from "@/features/flashcards/hooks";
import { AddFlashcardFormSection } from "@/features/flashcards/components";
import { Button } from "@/components/ui/button";
import { TFlashcardsByStudySet } from "@/types";
import { useNavigate } from "react-router";
import { useState } from "react";

interface EditStudySetFormProps {
    studySet: TFlashcardsByStudySet;
}

export const EditStudySetForm = ({ studySet }: EditStudySetFormProps) => {
    const { mutate: deleteFlashcard } = useDeleteFlashcard(studySet.id);
    const { mutate: updateStudySet, isPending } = useUpdateFlashcards();
    const [cardCount, setCardCount] = useState("1");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<TUpdateStudySetSchema>({
        resolver: zodResolver(updateStudySetSchema),
        defaultValues: studySet,
    });

    const flashcards = useWatch({
        control,
        name: "flashcards",
        defaultValue: studySet.flashcards,
    });

    const handleUpdateStudySet = () => {
        const data = getValues();
        updateStudySet(
            { studySetId: studySet.id, data },
            {
                onSuccess: () => {
                    navigate(`/flashcards/${studySet.id}`);
                },
            }
        );
    };

    const handleAddFlashcardComponent = () => {
        const currentFlashcards = getValues("flashcards");

        const newFlashcards = Array.from({ length: Number(cardCount) }, () => ({
            term: "",
            definition: "",
        }));

        setValue("flashcards", [...currentFlashcards, ...newFlashcards]);
    };

    const handleDeleteFlashcard = (index: number, id?: string) => {
        if (id) {
            deleteFlashcard(id, {
                onSuccess: () => {
                    deleteFlashcardComponent(index);
                },
            });
            return;
        }

        deleteFlashcardComponent(index);
    };

    const deleteFlashcardComponent = (index: number) => {
        const currentFlashcards = getValues("flashcards");
        const updatedFlashcards = currentFlashcards.filter(
            (_, i) => i !== index
        );
        setValue("flashcards", updatedFlashcards);
    };
    
    const handleCardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardCount(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmit(handleUpdateStudySet, (errors) => {
                handleZodErrors(errors);
            })}
            className="w-full space-y-4"
        >
            <StudySetFormSection
                title="Title"
                placeholder="Enter a title, like 'Literature 11'"
                error={errors.title}
                register={register("title")}
            />

            <StudySetFormSection
                title="Description"
                placeholder="Add a description"
                error={errors.description}
                register={register("description")}
            />

            <ul className="space-y-4">
                {flashcards.map((flashcard, index) => {
                    return (
                        <AddFlashcardFormSection
                            key={index}
                            registerTerm={register(`flashcards.${index}.term`)}
                            registerDefinition={register(
                                `flashcards.${index}.definition`
                            )}
                            index={index}
                            errors={errors.flashcards?.[index]}
                            isDeleteDisabled={flashcards.length <= 4}
                            onDelete={() =>
                                handleDeleteFlashcard(index, flashcard.id)
                            }
                        />
                    );
                })}
            </ul>

            <div className="bg-primary w-full rounded-xl p-6 flex gap-2 justify-center">
                <Button
                    type="button"
                    onClick={handleAddFlashcardComponent}
                    className="px-6 "
                >
                    Add Card/s
                </Button>

                <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    border-xl outline-none ring-[1.5px] ring-gray-800 dark:ring-white 
                    w-24 rounded-3xl px-4 focus:ring-accent"
                    value={cardCount}
                    type="text"
                    onChange={handleCardCountChange}
                />
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="py-6 px-10"
                >
                    Save
                </Button>
            </div>
        </form>
    );
};
