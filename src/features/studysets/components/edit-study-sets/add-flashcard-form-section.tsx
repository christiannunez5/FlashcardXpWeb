import { CircularButton } from "@/components/ui/circular-button";
import { FormInput } from "@/components/ui/input";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";

interface AddFlashcardFormSection {
    registerTerm: UseFormRegisterReturn;
    registerDefinition: UseFormRegisterReturn;
    index: number;
    errors?: { term?: FieldError; definition?: FieldError };
    isDeleteDisabled: boolean;
    onDelete: () => void;
}

export const AddFlashcardFormSection: React.FC<AddFlashcardFormSection> = ({
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
                <div className="w-full space-y-2">
                    <FormInput
                        {...registerTerm}
                        placeholder="Enter term"
                        errorStyles="border-destructive"
                        className="border-b-[3px] outline-none
                            border-container w-full py-1 rounded-none px-0"
                        error={errors?.term}
                    />

                    <label htmlFor="">
                        <p className="text-lg font-semibold text-muted-foreground ">
                            Term
                        </p>
                    </label>
                </div>

                <div className="w-full space-y-2">
                    <FormInput
                        {...registerDefinition}
                        placeholder="Enter definition"
                        errorStyles="border-destructive"
                        className="border-b-[3px] outline-none
                            border-container w-full py-1 rounded-none px-0"
                        error={errors?.definition}
                    />
                    <label>
                        <p className="text-lg font-semibold text-muted-foreground">
                            Definition
                        </p>
                    </label>
                </div>
            </div>
        </div>
    );
};
