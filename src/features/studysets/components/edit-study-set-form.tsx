import {
    TUpdateStudySetSchema,
    updateStudySetSchema,
    useUpdateStudySet,
} from "@/features/studysets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { TStudySet } from "@/types";
import { handleZodErrors } from "@/utils";
import { FormInput } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import useDebounce from "@/hooks/use-debouce";
import { useEffect } from "react";

interface EditStudySetFormProps {
    studySet: TStudySet;
    onUpdate: (data: TUpdateStudySetSchema) => void;
}

export const EditStudySetForm: React.FC<EditStudySetFormProps> = ({
    studySet,
    onUpdate,
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TUpdateStudySetSchema>({
        resolver: zodResolver(updateStudySetSchema),
        defaultValues: {
            title: studySet.title,
            description: studySet.description,
        },
    });

    const { mutate: updateStudySet } = useUpdateStudySet();

    const title = useWatch({
        control,
        name: "title",
    });

    const description = useWatch({
        control,
        name: "description",
    });

    const debouncedTitle = useDebounce(title, 750);
    const debouncedDescription = useDebounce(description, 750);

    const handleFormsubmit = (data: TUpdateStudySetSchema) => {
        onUpdate(data);
    };

    useEffect(() => {
        if (
            debouncedTitle !== "" &&
            debouncedTitle.length >= 6 &&
            debouncedTitle !== studySet.title
        ) {
            updateStudySet({
                studySetId: studySet.id,
                data: {
                    title: debouncedTitle,
                    description: debouncedDescription,
                    isPublic: studySet.isPublic,
                },
            });
        }
    }, [debouncedTitle, debouncedDescription, studySet, updateStudySet]);

    return (
        <form
            className="w-full space-y-4"
            id="edit-study-set-form"
            onSubmit={handleSubmit(handleFormsubmit, (errors) => {
                handleZodErrors(errors);
            })}
        >
            <StudySetField
                title="Title"
                placeholder="Enter a title, like 'Literature 11'"
                error={errors.title}
                register={register("title")}
            />

            <StudySetField
                title="Description"
                placeholder="Add a description"
                error={errors.description}
                register={register("description")}
            />

            {/* <div className="flex justify-end">
                <Button className="py-6 px-10 " type="submit">
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </div> */}
        </form>
    );
};

interface StudySetFieldProps {
    title: string;
    placeholder: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
}

const StudySetField: React.FC<StudySetFieldProps> = ({
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
