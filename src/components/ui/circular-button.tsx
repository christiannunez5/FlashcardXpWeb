import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface CircularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: number;
}

export const CircularButton: FC<CircularButtonProps> = ({
    className,
    children,
    size,
    ...props
}) => {
    return (
        <button
            className={cn(
                `h-${size} w-${size} grid place-content-center bg-primary rounded-full text-foreground
                disabled:text-gray-600 disabled:opacity-65 cursor-pointer
                 disabled:cursor-default`,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
