import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth/hooks";
import { FollowerModal } from "@/features/friends/components";
import { FindFriendsModal } from "@/features/friends/components/find-friends/find-friends-modal";
import { FollowingModal } from "@/features/friends/components/followings/following-modal";

export const UserProfileCard = () => {
    const { user } = useAuthContext();

    return (
        <div className="bg-primary rounded-xl p-5 shadow-xs">
            <div className="bg-background h-72 rounded-xl relative">
                <Avatar className="h-24 w-24 bg-accent absolute left-5 -bottom-10">
                    <AvatarImage src={user?.profilePicUrl} />
                </Avatar>
            </div>

            <p className="pt-16 space-y-4">
                <div>
                    <h5>{user?.email}</h5>
                    <p className="text-sm">{user?.username}</p>
                </div>

                <div className="flex gap-3 items-center">
                    <FollowingModal />
                    <FollowerModal />
                    <FindFriendsModal />
                </div>
            </p>
        </div>
    );
};
