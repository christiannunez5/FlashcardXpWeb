import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { AddFlashcard } from "@/features/flashcards/components/add-flashcard";
import {
    studySetWithFlashcardsSchema,
    TStudySetWithFlashcardsSchema,
    useAddStudySet,
} from "@/features/studysets/hooks/add-study-set";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddFlashcards = () => {
    const { mutate: addFlashcards, isPending } = useAddStudySet();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<TStudySetWithFlashcardsSchema>({
        resolver: zodResolver(studySetWithFlashcardsSchema),
    });

    const [flashcardsCount, setFlashcardsCount] = useState(3);

    const handleAddStudySet = () => {
        const data = getValues();
        addFlashcards(data);
    };

    return (
        <form
            className="w-[75%] mx-auto space-y-4"
            onSubmit={handleSubmit(handleAddStudySet, (errors) => {
                handleZodErrors(errors);
            })}
        >
            <div className="bg-primary p-6 rounded-2xl flex flex-col gap-2">
                <h4>Title</h4>

                <FormInput
                    className="w-full bg-background py-3 px-5
                    outline-none rounded-xl font-semibold"
                    placeholder="Enter a title, like 'Literature 11'"
                    error={errors.title}
                    {...register("title")}
                />
            </div>

            <div className="bg-primary p-6 rounded-2xl flex flex-col gap-2">
                <h4 className="text-xl">Description</h4>
                <FormInput
                    className="w-full bg-background py-3 px-5
                    outline-none rounded-xl font-semibold"
                    placeholder="Add a description"
                    error={errors.description}
                    {...register("description")}
                />
            </div>

            {Array.from({ length: flashcardsCount }).map((_, index) => {
                return (
                    <AddFlashcard
                        register={register}
                        index={index}
                        errors={errors.flashcards?.[index]}
                    />
                );
            })}

            {flashcardsCount}

            <Button type="submit" disabled={isPending}>
                Submit
            </Button>
            <Button
                type="button"
                onClick={() => setFlashcardsCount((prev) => prev + 1)}
            >
                Add new flashcard
            </Button>
        </form>
    );
};

export default AddFlashcards;
