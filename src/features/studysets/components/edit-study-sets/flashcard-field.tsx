import { FormInput } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FlashcardFieldProps {
    label: string;
    error: FieldError | undefined;
    register: UseFormRegisterReturn;
}

export const FlashcardField: React.FC<FlashcardFieldProps> = ({
    label,
    error,
    register,
}) => {
    return (
        <div className="w-full space-y-2">
            <FormInput
                {...register}
                placeholder="Enter definition"
                errorStyles="border-destructive"
                className="border-b-[3px] outline-none
                            border-container w-full py-1 rounded-none px-0"
                error={error}
            />
            <label>
                <p className="text-lg font-semibold text-muted-foreground">
                    {label}
                </p>
            </label>
        </div>
    );
};
