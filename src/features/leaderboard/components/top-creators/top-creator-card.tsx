import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TTopStudySetCreator } from "@/types";

interface TopCreatorCardProps {
    topCreator: TTopStudySetCreator;
    index: number;
}

export const TopCreatorCard: React.FC<TopCreatorCardProps> = ({
    topCreator,
    index,
}) => {
    return (
        <li className="p-5 bg-primary rounded-2xl flex items-center">
            <div className="w-32">
                <div
                    className="h-12 w-12 bg-accent text-accent-foreground grid
                            place-content-center rounded-full"
                >
                    <h5>{index}</h5>
                </div>
            </div>

            <div className="flex gap-8 items-center grow">
                <Avatar className="h-24 w-24 bg-container">
                    <AvatarImage src={topCreator.user.profilePicUrl} />
                </Avatar>

                <div className="flex flex-col">
                    <p className="font-semibold">{topCreator.user.email}</p>
                    <p className="text-gray-500">{topCreator.user.username}</p>
                </div>
            </div>

            <div className="px-10">
                <h5>{topCreator.studySetsCreatedCount} sets created</h5>
            </div>
        </li>
    );
};
