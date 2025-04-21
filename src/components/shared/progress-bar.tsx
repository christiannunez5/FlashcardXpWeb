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

    console.log(percentage);

    return (
        <div className={`bg-container w-full rounded-lg h-${height}`}>
            <div
                className={`bg-green-400 rounded-l h-${height}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};
