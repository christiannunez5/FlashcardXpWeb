import { CircularButton } from "@/components/ui/circular-button";
import React, { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import {
    TUpdateFlashcardSchema,
    updateFlashcardSchema,
    useUpdateFlashcard,
} from "@/features/flashcards/hooks";
import { useParams } from "react-router";
import useDebounce from "@/hooks/use-debouce";
import { TFlashcard } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditFlashcardFormProps {
    index: number;
    isDeleteDisabled: boolean;
    onDelete: () => void;
    flashcard: TFlashcard;
}

export const EditFlashcardForm: React.FC<EditFlashcardFormProps> = ({
    index,
    isDeleteDisabled,
    onDelete,
    flashcard,
}) => {
    const params = useParams();

    if (!params.id) {
        throw new Error("study set id params is missing");
    }

    const { mutate: updateFlashcard } = useUpdateFlashcard(params.id);

    const {
        register,
        control,
        formState: { errors },
    } = useForm<TUpdateFlashcardSchema>({
        resolver: zodResolver(updateFlashcardSchema),
        defaultValues: flashcard,
    });

    const term = useWatch({
        control,
        name: "term",
    });
    
    const definition = useWatch({
        control,
        name: "definition",
    });

    const debouncedTerm = useDebounce(term, 750);
    const debouncedDefinition = useDebounce(definition, 750);

    const isSafeToEdit = useCallback(() => {
        if (
            debouncedTerm == flashcard.term &&
            debouncedDefinition == flashcard.definition
        ) {
            return false;
        }

        if (debouncedTerm == "" || debouncedDefinition == "") return false;

        return true;
    }, [debouncedTerm, debouncedDefinition, flashcard]);

    const handleUpdateFlashcard = useCallback(() => {
        if (isSafeToEdit()) {
            updateFlashcard({
                studySetId: params.id!,
                data: {
                    id: flashcard.id,
                    term: debouncedTerm,
                    definition: debouncedDefinition,
                },
            });
        }
    }, [
        debouncedDefinition,
        debouncedTerm,
        flashcard.id,
        isSafeToEdit,
        params.id,
        updateFlashcard,
    ]);

    useEffect(() => {
        handleUpdateFlashcard();
    }, [debouncedTerm, handleUpdateFlashcard]);

    return (
        <form className="bg-primary p-6 rounded-xl flex flex-col gap-4">
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
                    register={register(`term`)}
                    error={errors.term}
                />

                <FlashcardField
                    label="Definition"
                    error={errors.definition}
                    register={register(`definition`)}
                />
            </div>
        </form>
    );
};

import { FormInput } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FlashcardFieldProps {
    label: string;
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
}

const FlashcardField: React.FC<FlashcardFieldProps> = ({
    label,
    error,
    register,
}) => {
    return (
        <div className="w-full space-y-2">
            <FormInput
                {...register}
                placeholder="Enter definition"
                errorStyles="border-destructive"
                className="border-b-[3px] outline-none
                            border-container w-full py-1 rounded-none px-0"
                error={error}
            />
            <label>
                <p className="text-lg font-semibold text-muted-foreground">
                    {label}
                </p>
            </label>
        </div>
    );
};
