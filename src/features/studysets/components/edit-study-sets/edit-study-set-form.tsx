import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
    useUpdateFlashcards,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudySetFormSection } from "./study-set-form-section";
import { useForm } from "react-hook-form";

import { TStudySet } from "@/types";
import { useCallback } from "react";

interface EditStudySetFormProps {
    studySet: TStudySet;
}

export const EditStudySetForm = ({ studySet }: EditStudySetFormProps) => {
    const { mutate: updateStudySet, isPending } = useUpdateFlashcards();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<TUpdateStudySetSchema>({
        resolver: zodResolver(updateStudySetSchema),
        defaultValues: studySet,
    });

    const handleUpdateStudySet = useCallback(async () => {
        const data = getValues();
        updateStudySet({ studySetId: studySet.id, data });
    }, [getValues, studySet.id, updateStudySet]);

    return (
        <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleUpdateStudySet)}
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

            <div className="flex justify-end ">
                <button
                    className="py-4 px-6 bg-accent w-fit rounded-xl cursor-pointer"
                    type="submit"
                >
                    {isPending ? "Saving...." : "Submit"}
                </button>
            </div>
        </form>
    );
};
