import {
    TUpdateWholeStudySetSchema,
    updateWholeStudySetSchema,
    useUpdateWholeStudySet,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudySetFormSection } from "./study-set-form-section";
import { useForm, useWatch } from "react-hook-form";
import { TStudySet } from "@/types";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FlashcardFormSection } from "@/features/flashcards/components";
import { handleZodErrors } from "@/utils";
import { useDeleteFlashcard } from "@/features/flashcards/hooks";

interface EditStudySetFormProps {
    studySet: TStudySet;
}

export const EditStudySetForm = ({ studySet }: EditStudySetFormProps) => {
    const { mutate: updateStudySet, isPending } = useUpdateWholeStudySet();
    const { mutate: deleteFlashcard } = useDeleteFlashcard(studySet.id);

    const [cardCount, setCardCount] = useState("1");

    const {
        register,
        handleSubmit,
        getValues,
        control,
        setValue,
        formState: { errors },
    } = useForm<TUpdateWholeStudySetSchema>({
        resolver: zodResolver(updateWholeStudySetSchema),
        defaultValues: studySet,
    });

    const flashcards = useWatch({
        control,
        name: "flashcards",
    });

    const handleUpdateStudySet = useCallback(async () => {
        const data = getValues();
        updateStudySet({ studySetId: studySet.id, data });
    }, [getValues, studySet.id, updateStudySet]);

    // add a flashcard component with empty values
    const handleAddFlashcardComponent = () => {
        const currentFlashcards = getValues("flashcards");
        const newFlashcards = Array.from({ length: Number(cardCount) }, () => ({
            term: "",
            definition: "",
        }));
        setValue("flashcards", [...currentFlashcards, ...newFlashcards]);
        setCardCount("1");
    };

    const deleteFlashcardComponent = (index: number) => {
        const currentFlashcards = getValues("flashcards");
        const updatedFlashcards = currentFlashcards.filter(
            (_, i) => i !== index
        );
        setValue("flashcards", updatedFlashcards);
    };

    const handleDeleteFlashcard = (index: number, id?: string) => {
        if (id) {
            deleteFlashcard(id, {});
        }
        deleteFlashcardComponent(index);
    };

    return (
        <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleUpdateStudySet, (errors) => {
                handleZodErrors(errors);
            })}
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
                        <FlashcardFormSection
                            key={index}
                            registerTerm={register(`flashcards.${index}.term`)}
                            registerDefinition={register(
                                `flashcards.${index}.definition`
                            )}
                            flashcard={flashcard}
                            index={index}
                            errors={errors.flashcards?.[index]}
                            isDeleteDisabled={flashcards.length <= 4}
                            onDelete={() => {
                                handleDeleteFlashcard(index, flashcard.id);
                            }}
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
                    onChange={(e) => setCardCount(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Button className="py-6 px-10 " type="submit">
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
};
