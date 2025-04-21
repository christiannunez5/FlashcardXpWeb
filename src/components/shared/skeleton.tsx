import { cn } from "@/lib/utils";

interface SkeletonProps {
    width?: number | "full";
    height?: number;
    className?: string;
    circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = "full",
    height = 2,
    className,
    circle = false,
}) => {
    return (
        <div
            className={cn(
                `skeleton ${circle ? "rounded-full" : "rounded-lg"}`,
                className
            )}
            style={{
                height: `${height}px`,
                width: `${width === "full" ? "100%" : `${width}px`}`,
            }}
        ></div>
    );
};
