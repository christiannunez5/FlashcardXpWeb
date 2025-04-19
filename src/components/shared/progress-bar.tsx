interface ProgressBarProps {
    height: number;
    percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    height = 2,
    percentage,
}) => {
    return (
        <div className={`bg-container w-full rounded-lg h-${height}`}>
            <div
                className={`bg-green-400 rounded-l h-${height}`}
                style={{ width: percentage }}
            ></div>
        </div>
    );
};
