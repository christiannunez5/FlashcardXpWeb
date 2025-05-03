import { FolderCard } from "./folder-card";

export const FolderList = () => {
    return (
        <ul className="grid grid-cols-4 gap-3">
            {Array.from({ length: 5 }).map(() => {
                return <FolderCard />;
            })}
        </ul>
    );
};
