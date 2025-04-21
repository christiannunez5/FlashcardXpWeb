import { getExperiencePercentage } from "@/utils";

interface ProgressBarProps {
    height: number;
    currentProgress: number;
    maxProgress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    height = 2,
    currentProgress,
    maxProgress,
}) => {
    const percentage = getExperiencePercentage(currentProgress, maxProgress);

    console.log(`current: ${currentProgress}, max: ${maxProgress}`);

    return (
        <div className={`bg-container w-full rounded-lg h-${height}`}>
            <div
                className={`bg-green-400 h-${height}
                ${percentage >= 100 ? "rounded-lg" : "rounded-l-lg"}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};
