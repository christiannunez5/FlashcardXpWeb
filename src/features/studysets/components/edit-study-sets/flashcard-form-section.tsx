import { CircularButton } from "@/components/ui/circular-button";
import { FlashcardField } from "./flashcard-field";
import React, { useCallback, useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import useDebounce from "@/hooks/use-debouce";
import {
    TUpdateFlashcardSchema,
    useUpdateFlashcard,
} from "@/features/flashcards/hooks";
import { useParams } from "react-router";

interface FlashcardFormSection {
    registerTerm: UseFormRegisterReturn;
    registerDefinition: UseFormRegisterReturn;
    index: number;
    errors?: { term?: FieldError; definition?: FieldError };
    isDeleteDisabled: boolean;
    onDelete: () => void;
    flashcard: TUpdateFlashcardSchema;
}

export const FlashcardFormSection: React.FC<FlashcardFormSection> = ({
    registerTerm,
    registerDefinition,
    index,
    errors,
    isDeleteDisabled,
    onDelete,
    flashcard: data,
}) => {
    const params = useParams();

    if (!params.id) {
        throw new Error("study set id params is missing");
    }

    const { mutate: updateFlashcard } = useUpdateFlashcard(params.id);

    const [flashcard, setFlashcard] = useState(data);
    const debouncedFlashcard = useDebounce(flashcard, 750);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFlashcard((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const isSafeToEdit = useCallback(() => {
        if (
            debouncedFlashcard.term == data.term &&
            debouncedFlashcard.definition == data.definition
        ) {
            return false;
        }
        if (
            debouncedFlashcard.term == "" ||
            debouncedFlashcard.definition == ""
        ) {
            return false;
        }

        return true;
    }, [debouncedFlashcard, data]);

    const handleUpdateFlashcard = useCallback(() => {
        if (isSafeToEdit()) {
            updateFlashcard({
                studySetId: params.id!,
                data: debouncedFlashcard,
            });
            return;
        }
    }, [isSafeToEdit, debouncedFlashcard, updateFlashcard, params.id]);

    useEffect(() => {
        handleUpdateFlashcard();
    }, [debouncedFlashcard, data, handleUpdateFlashcard]);

    return (
        <div className="bg-primary p-6 rounded-xl flex flex-col gap-4">
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
                    error={errors?.term}
                    register={{
                        ...registerTerm,
                        onChange: async (e) => {
                            await registerTerm.onChange(e);
                            handleInputChange(
                                e as React.ChangeEvent<HTMLInputElement>
                            );
                        },
                    }}
                />

                <FlashcardField
                    label="Definition"
                    error={errors?.definition}
                    register={{
                        ...registerDefinition,
                        onChange: async (e) => {
                            await registerTerm.onChange(e);
                            handleInputChange(
                                e as React.ChangeEvent<HTMLInputElement>
                            );
                        },
                    }}
                />
            </div>
        </div>
    );
};
