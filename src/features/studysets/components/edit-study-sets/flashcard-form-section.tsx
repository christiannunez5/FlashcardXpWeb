import { CircularButton } from "@/components/ui/circular-button";
import { FlashcardField } from "./flashcard-field";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";

interface FlashcardFormSection {
    registerTerm: UseFormRegisterReturn;
    registerDefinition: UseFormRegisterReturn;
    index: number;
    errors?: { term?: FieldError; definition?: FieldError };
    isDeleteDisabled: boolean;
    onDelete: () => void;
}

export const FlashcardFormSection: React.FC<FlashcardFormSection> = ({
    registerTerm,
    registerDefinition,
    index,
    errors,
    isDeleteDisabled,
    onDelete,
}) => {
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
                    register={registerTerm}
                />

                <FlashcardField
                    label="Definition"
                    error={errors?.definition}
                    register={registerDefinition}
                />
            </div>
        </div>
    );
};
