import { getExperiencePercentage } from "@/utils";

interface ProgressBarProps {
    height: number;
    currentProgress: number;
    maxProgress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    height = 1,
    currentProgress,
    maxProgress,
}) => {
    const percentage = getExperiencePercentage(currentProgress, maxProgress);

    console.log(`current: ${currentProgress}, max: ${maxProgress}`);

    return (
        <div
            className={`bg-primary border-2 border-container w-full rounded-lg `}
            style={{ height: `${height}rem` }}
        >
            <div
                className={`bg-green-400 h-[inherit]
                ${percentage >= 100 ? "rounded-lg" : "rounded-l-lg"}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};
