import { FormInput } from "@/components/ui/input";
import { TStudySetWithFlashcardsSchema } from "@/features/studysets/hooks/add-study-set";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface AddFlashcardProps {
    register: UseFormRegister<TStudySetWithFlashcardsSchema>;
    index: number;
    errors?: { term?: FieldError; definition?: FieldError };
}

export const AddFlashcard: React.FC<AddFlashcardProps> = ({
    register,
    index,
    errors,
}) => {
    return (
        <div className="bg-primary p-6 rounded-xl flex flex-col gap-4">
            <h4>{index + 1}</h4>
            <div className="flex gap-4">
                <div className="w-full space-y-2">
                    <FormInput
                        {...register(`flashcards.${index}.term`)}
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
                        {...register(`flashcards.${index}.definition`)}
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
