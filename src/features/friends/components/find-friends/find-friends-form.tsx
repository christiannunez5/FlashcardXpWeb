import { FormInput } from "@/components/ui/input";
import { UserfindFriendsList } from "@/features/friends/components/find-friends/user-find-friends-list";
import useDebounce from "@/hooks/use-debouce";
import api from "@/lib/axios";
import { TUser } from "@/types";
import { Search } from "lucide-react";
import React, { useEffect } from "react";

export const FindFriendsForm = () => {
    const [friend, setFriend] = React.useState("");
    const [userList, setUserList] = React.useState<TUser[]>([]);
    const debouncedSearch = useDebounce(friend);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get(
                `/api/users/search?value=${debouncedSearch}`
            );

            setUserList(response.data);
        };

        fetchUsers();
    }, [debouncedSearch]);

    return (
        <div className="mt-4">
            <FormInput
                icon={<Search />}
                onChange={(e) => setFriend(e.target.value)}
                className="py-2.5 px-5 bg-container gap-4
                rounded-full"
                placeholder="Search name or email."
            />

            <div className="mt-5">
                <UserfindFriendsList users={userList} />
            </div>
        </div>
    );
};
