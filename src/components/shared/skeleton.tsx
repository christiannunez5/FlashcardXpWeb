import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className,
    circle = false,
}) => {
    return (
        <div
            className={cn(
                `skeleton ${circle ? "rounded-full" : "rounded-lg"}`,
                className
            )}
        ></div>
    );
};
