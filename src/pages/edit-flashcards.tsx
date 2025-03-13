import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { AddFlashcard } from "@/features/flashcards/components/add-flashcard";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
    useUpdateFlashcards,
} from "@/features/studysets/hooks";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";

const EditFlashcards = () => {
    const params = useParams();

    if (!params.id) {
        throw new Error("params missing");
    }

    const { data: studySet } = useGetStudySetFlashcards(params.id);

    const { mutate: updateStudySet } = useUpdateFlashcards();

    const {
        register,
        getValues,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<TUpdateStudySetSchema>({
        resolver: zodResolver(updateStudySetSchema),
        defaultValues: {
            title: "",
            description: "",
            flashcards: [],
        },
    });

    useEffect(() => {
        if (studySet) {
            setValue("title", studySet.title);
            setValue("description", studySet.description);
            setValue("flashcards", studySet.flashcards || []);
        }
    }, [studySet, setValue]);

    const flashcards = useWatch({
        control,
        name: "flashcards",
        defaultValue: getValues("flashcards"),
    });

    if (!studySet) {
        return <div>Loading...</div>;
    }

    const handleUpdateStudySet = () => {
        const data = getValues();

        updateStudySet({ studySetId: studySet?.id, data: data });
    };

    const handleDeleteFlashcard = (index: number) => {
        const currentFlashcards = getValues("flashcards");
        const updatedFlashcards = currentFlashcards.filter(
            (_, i) => i !== index
        );
        setValue("flashcards", updatedFlashcards);
    };

    const handleAddEmptyFlashcard = () => {
        const currentFlashcards = getValues("flashcards");
        const newFlashcard = { term: "", definition: "" };

        setValue("flashcards", [...currentFlashcards, newFlashcard]);
        console.log(currentFlashcards);
    };

    return (
        <form
            className="w-[75%] mx-auto space-y-4"
            onSubmit={handleSubmit(handleUpdateStudySet, (errors) => {
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

            {flashcards.map((_, index) => {
                return (
                    <AddFlashcard
                        key={index}
                        register={register}
                        index={index}
                        errors={errors.flashcards?.[index]}
                        onDelete={handleDeleteFlashcard}
                        isDeleteDisabled={flashcards.length <= 4}
                    />
                );
            })}

            <Button type="submit">Submit</Button>
            <Button type="button" onClick={handleAddEmptyFlashcard}>
                Add new flashcard
            </Button>
        </form>
    );
};

export default EditFlashcards;
