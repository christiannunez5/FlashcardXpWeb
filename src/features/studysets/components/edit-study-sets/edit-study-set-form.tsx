import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudySetFormSection } from "./study-set-form-section";
import { useForm, useWatch } from "react-hook-form";
import { handleZodErrors } from "@/utils";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import { AddFlashcardFormSection } from "@/features/flashcards/components";
import { Button } from "@/components/ui/button";

interface EditStudySetFormProps {
    studySetId: string;
}

export const EditStudySetForm = ({ studySetId }: EditStudySetFormProps) => {
    const { data: studySet } = useGetStudySetFlashcards(studySetId);

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<TUpdateStudySetSchema>({
        resolver: zodResolver(updateStudySetSchema),
        defaultValues: studySet,
    });

    const handleUpdateStudySet = () => {
        const data = getValues();
        console.log(data);
    };
    
    const flashcards = useWatch({
        control,
        name: "flashcards",
        defaultValue: studySet?.flashcards,
    });

    const handleAddFlashcardComponent = () => {
        const currentFlashcards = getValues("flashcards");
        const newFlashcardComponent = { term: "", definition: "" };
        setValue("flashcards", [...currentFlashcards, newFlashcardComponent]);
    };

    return (
        <form
            onSubmit={handleSubmit(handleUpdateStudySet, (errors) => {
                handleZodErrors(errors);
            })}
            className="w-full space-y-4"
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
                {flashcards.map((_, index) => {
                    return (
                        <AddFlashcardFormSection
                            key={index}
                            registerTerm={register(`flashcards.${index}.term`)}
                            registerDefinition={register(
                                `flashcards.${index}.definition`
                            )}
                            index={index}
                            errors={errors.flashcards?.[index]}
                            isDeleteDisabled={flashcards.length <= 4}
                        />
                    );
                })}
            </ul>

            <Button type="submit">Submit</Button>
            <Button type="button" onClick={handleAddFlashcardComponent}>
                Add new flashcard
            </Button>
        </form>
    );
};
