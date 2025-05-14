import { CircularButton } from "@/components/ui/circular-button";
import { FlashcardField } from "./flashcard-field";
import React, { useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { TUpdateFullStudySetSchema } from "@/features/studysets/hooks";
import useDebounce from "@/hooks/use-debouce";
import { useUpdateFlashcard } from "@/features/flashcards/hooks";

interface FlashcardFormSection {
    index: number;
    isDeleteDisabled: boolean;
    onDelete: () => void;
    studySetId: string;
}

export const FlashcardFormSection: React.FC<FlashcardFormSection> = ({
    index,
    isDeleteDisabled,
    onDelete,
    studySetId,
}) => {
    const { mutate: updateFlashcard } = useUpdateFlashcard(studySetId);

    const {
        register,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<TUpdateFullStudySetSchema>();

    const id = getValues(`flashcards.${index}.id`);

    const fieldErrors = errors.flashcards?.[index];

    const isFirstRender = useRef(true);

    const term = watch(`flashcards.${index}.term`);
    const definition = watch(`flashcards.${index}.definition`);

    const debouncedTerm = useDebounce(term);
    const debouncedDefinition = useDebounce(definition);

    const handleUpdateFlashcard = useCallback(() => {
        if (debouncedTerm == "" || debouncedDefinition == "") return;

        const data = {
            id,
            term: debouncedTerm,
            definition: debouncedDefinition,
        };

        updateFlashcard(
            { studySetId, data },
            {
                onSuccess: (updatedFlashcard) => {
                    setValue(`flashcards.${index}.id`, updatedFlashcard.id);
                },
            }
        );
    }, [
        debouncedTerm,
        debouncedDefinition,
        id,
        studySetId,
        updateFlashcard,
        index,
        setValue,
    ]);

    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        handleUpdateFlashcard();
    }, [handleUpdateFlashcard, index]);
    
    return (
        <div className="bg-primary p-6 rounded-xl flex flex-col gap-4 shadow-md">
            <div className="flex items-center">
                <h4 className="grow">{index + 1}</h4>
                <CircularButton
                    onClick={onDelete}
                    size={10}
                    className={`${!isDeleteDisabled && "hover:bg-container"}`}
                    type="button"
                    disabled={isDeleteDisabled}
                >
                    <FiTrash />
                </CircularButton>
            </div>

            <div className="flex gap-4">
                <FlashcardField
                    label="Term"
                    error={fieldErrors?.term}
                    register={register(`flashcards.${index}.term`)}
                />

                <FlashcardField
                    label="Definition"
                    error={fieldErrors?.definition}
                    register={register(`flashcards.${index}.definition`)}
                />
            </div>
        </div>
    );
};
