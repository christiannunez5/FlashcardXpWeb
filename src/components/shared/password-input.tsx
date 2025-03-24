import { FormInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
    register?: UseFormRegisterReturn;
    className?: string;
    placeholder?: string;
    error?: FieldError;
}

export const PasswordInput = ({
    register,
    className,
    placeholder,
    error,
}: PasswordInputProps) => {
    const [isPassword, setIsPassword] = useState(true);

    const handleShowPassword = () => {
        setIsPassword(!isPassword);
    };
    
    return (
        <div
            className={cn(
                `flex justify-between items-center bg-background rounded-lg ${
                    error && "border-2 border-destructive"
                }`,
                className
            )}
        >
            <FormInput
                className="w-full p-4 gap-4"
                type={isPassword ? "password" : "text"}
                placeholder={placeholder}
                icon={<Lock strokeWidth={2} color="gray" />}
                {...register}
            />

            <button
                className="mr-4 text-gray-600 cursor-pointer"
                onClick={handleShowPassword}
                type="button"
            >
                {isPassword ? (
                    <EyeOff strokeWidth={2} />
                ) : (
                    <Eye strokeWidth={2} />
                )}
            </button>
        </div>
    );
};
