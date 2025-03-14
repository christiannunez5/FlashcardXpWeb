import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { AddFlashcardFormSection } from "@/features/studysets/components/edit-study-sets/add-flashcard-form-section";
import {
    updateFlashcardsSchema,
    TUpdateFlashcardsSchema,
    useAddStudySet,
} from "@/features/studysets/hooks/add-study-set";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

const AddFlashcards = () => {
    const { mutate: addFlashcards, isPending } = useAddStudySet();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<TUpdateFlashcardsSchema>({
        resolver: zodResolver(updateFlashcardsSchema),
        defaultValues: {
            title: "",
            description: "",
            isPublic: false,
            flashcards: [
                { term: "", definition: "" },
                { term: "", definition: "" },
            ],
        },
    });

    const flashcards = useWatch({
        control,
        name: "flashcards",
        defaultValue: getValues("flashcards"),
    });

    const handleAddStudySet = () => {
        const data = getValues();
        addFlashcards(data);
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

            {flashcards?.map((_, index) => {
                return (
                    <AddFlashcardFormSection
                        key={index}
                        register={register}
                        index={index}
                        errors={errors.flashcards?.[index]}
                        onDelete={handleDeleteFlashcard}
                        isDeleteDisabled={flashcards.length <= 4}
                    />
                );
            })}

            <Button type="submit" disabled={isPending}>
                Submit
            </Button>
            <Button type="button" onClick={handleAddEmptyFlashcard}>
                Add new flashcard
            </Button>
        </form>
    );
};

export default AddFlashcards;
