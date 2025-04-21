import { FormInput } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface StudySetFieldProps {
    title: string;
    placeholder: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
}

export const StudySetField: React.FC<StudySetFieldProps> = ({
    title,
    placeholder,
    error,
    register,
}) => {
    return (
        <div className="bg-primary p-6 rounded-2xl flex flex-col gap-2 shadow-md">
            <h4 className="text-xl">{title}</h4>
            <FormInput
                className="w-full bg-background py-3 px-5
                    outline-none rounded-xl"
                placeholder={placeholder}
                error={error}
                {...register}
            />
        </div>
    );
};
