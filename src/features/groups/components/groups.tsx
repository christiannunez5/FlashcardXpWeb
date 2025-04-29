import { Skeleton } from "@/components/shared/skeleton";
import { useGetCurrentUserGroups } from "@/features/groups/hooks";
import { TGroupSummary } from "@/types";
import { useNavigate } from "react-router";

export const Groups = () => {
    const { data: groups, isLoading } = useGetCurrentUserGroups();

    if (!groups || isLoading) {
        return (
            <ul className="grid grid-cols-3 gap-4">
                {Array.from({ length: 5 }).map(() => {
                    return <GroupCardSkeleton />;
                })}
            </ul>
        );
    }

    return (
        <ul className="grid grid-cols-3 gap-4">
            {groups.map((group) => {
                return <GroupCard group={group} key={group.id} />;
            })}
        </ul>
    );
};

interface GroupCardProps {
    group: TGroupSummary;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    const navigate = useNavigate();

    return (
        <li
            className="p-4 rounded-lg bg-primary shadow-md cursor-pointer
                hover:border-2 border-container h-[150px] flex"
            onClick={() => navigate(`/groups/${group.id}`)}
        >
            <div className="flex flex-col gap-3 w-full">
                <h5 className="grow">{group.name}</h5>
                <p
                    className="text-sm text-muted-foreground 
                bg-container py-1 px-4 w-fit rounded-xl"
                >
                    {group.membersCount} member/s
                </p>
            </div>
        </li>
    );
};

const GroupCardSkeleton = () => {
    return (
        <div
            className="p-4 rounded-lg bg-primary shadow-md cursor-pointer
                hover:border-2 border-container h-[150px] flex 
                flex-col justify-between"
        >
            <Skeleton height={10} />
            <Skeleton height={10} width={100} />
        </div>
    );
};
