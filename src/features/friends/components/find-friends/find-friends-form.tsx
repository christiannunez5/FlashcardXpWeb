import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debouce";
import api from "@/lib/axios";
import { TUser } from "@/types";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export const FindFriendsForm = () => {
    const [friend, setFriend] = React.useState("");
    const [userList, setUserList] = React.useState<TUser[]>([]);
    const debouncedSearch = useDebounce(friend);
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const response = await api.get(
                `/api/users/search?value=${debouncedSearch}`
            );

            setUserList(response.data);
        };

        fetchUsers();
    }, [debouncedSearch]);

    return (
        <form className="mt-4">
            <FormInput
                icon={<Search />}
                onChange={(e) => setFriend(e.target.value)}
                className="py-3 px-6 bg-container text-lg font-normal gap-4
                rounded-full"
                placeholder="Search name or email."
            />

            <ul className="mt-5 space-y-4">
                {/* {loading ? (
                    <p>Loading..</p>
                ) : (
                    userList.map((data) => {
                        return <p>{data.email}</p>;
                    })
                )} */}
                {userList.map((data) => {
                    return (
                        <li className="flex gap-5 items-center">
                            <Avatar className="bg-accent h-14 w-14">
                                <AvatarImage src={data.profilePicUrl} />
                            </Avatar>

                            <div>
                                <p>{data.email}</p>
                                <p className="text-sm text-gray-500">
                                    {data.username}
                                </p>
                            </div>

                            <div className="ml-auto">
                                <Button
                                    variant="outline"
                                    className="text-sm"
                                    type="button"
                                >
                                    Follow
                                </Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </form>
    );
};
