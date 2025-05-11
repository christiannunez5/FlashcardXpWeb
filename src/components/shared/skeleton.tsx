import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SkeletonProps {
    className?: string;
    circle?: boolean;
    children?: ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className,
    circle = false,
    children,
}) => {
    return (
        <div
            className={cn(
                `skeleton ${circle ? "rounded-full" : "rounded-lg"}`,
                className
            )}
        >
            {children}
        </div>
    );
};
