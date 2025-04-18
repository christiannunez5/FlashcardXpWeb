import { getCurrentUserQuests } from "@/api/user-quests";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserQuests = () => {
    return useQuery({
        queryKey: ["current-user-quests"],
        queryFn: getCurrentUserQuests,
    });
};
