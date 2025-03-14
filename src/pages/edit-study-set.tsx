import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { AddFlashcardFormSection } from "@/features/studysets/components/edit-study-sets/add-flashcard-form-section";
import { useGetStudySetFlashcards } from "@/features/flashcards/hooks";
import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
    useUpdateFlashcards,
} from "@/features/studysets/hooks";
import { handleZodErrors } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
    FieldError,
    useForm,
    UseFormRegisterReturn,
    useWatch,
} from "react-hook-form";
import { useParams } from "react-router";
import { EditStudySetForm } from "@/features/studysets/components";

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
        defaultValues: studySet,
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
        console.log(data);
        // updateStudySet({ studySetId: studySet?.id, data: data });
    };

    const handleDeleteFlashcard = (index: number) => {
        const currentFlashcards = getValues("flashcards");
        const updatedFlashcards = currentFlashcards.filter(
            (_, i) => i !== index
        );
        setValue("flashcards", updatedFlashcards);
    };

    const handleAddFlashcardComponent = () => {
        const currentFlashcards = getValues("flashcards");
        const newFlashcard = { term: "", definition: "" };

        setValue("flashcards", [...currentFlashcards, newFlashcard]);
        console.log(currentFlashcards);
    };

    return (
        <div className="w-[85%] mx-auto">
            <EditStudySetForm studySetId={studySet.id} />
        </div>
    );
};

interface StudySetFormSectionProps {
    title: string;
    placeholder: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
}

const StudySetFormSection: React.FC<StudySetFormSectionProps> = ({
    title,
    placeholder,
    error,
    register,
}) => {
    return (
        <div className="bg-primary p-6 rounded-2xl flex flex-col gap-2">
            <h4 className="text-xl">{title}</h4>
            <FormInput
                className="w-full bg-background py-3 px-5
                        outline-none rounded-xl font-semibold"
                placeholder={placeholder}
                error={error}
                {...register}
            />
        </div>
    );
};

export default EditFlashcards;
