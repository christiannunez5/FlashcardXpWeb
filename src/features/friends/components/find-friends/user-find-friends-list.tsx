import { UserFindFriendItem } from "./user-find-friend-item";
import { TUser } from "@/types";

interface UserFindFriendsListProps {
    users: TUser[];
}

export const UserfindFriendsList: React.FC<UserFindFriendsListProps> = ({
    users,
}) => {
    return (
        <ul className="space-y-3">
            {users.map((user) => {
                return <UserFindFriendItem key={user.id} user={user} />;
            })}
        </ul>
    );
};
