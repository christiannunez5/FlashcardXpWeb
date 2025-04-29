export const Groups = () => {
    return (
        <ul className="grid grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map(() => {
                return <GroupCard />;
            })}
        </ul>
    );
};

const GroupCard = () => {
    return (
        <li
            className="p-4 rounded-lg bg-primary shadow-md cursor-pointer
                hover:border-2 border-container flex flex-col gap-3 h-[150px]"
        >
            <h5 className="grow">University of Cebu</h5>
            <p
                className="text-sm text-muted-foreground 
                bg-container py-1 px-4 w-fit rounded-xl"
            >
                2 members
            </p>
        </li>
    );
};
