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
                disabled:bg-slate-500 disabled:text-accent-foreground hover:bg-accent/90`,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
