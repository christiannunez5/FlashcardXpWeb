import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
    errorStyles?: string;
    icon?: ReactNode;
}

export const FormInput: React.FC<InputProps> = ({
    error,
    className,
    errorStyles = "border-2 border-destructive",
    icon,
    ...props
}) => {
    return (
        <div
            className={cn(
                `p-2 rounded-xl transition-all flex gap-2 items-center`,
                className,
                `${error ? errorStyles : ""}`
            )}
        >
            {icon}
            <input {...props} className="outline-none w-full"></input>
        </div>
    );
};
