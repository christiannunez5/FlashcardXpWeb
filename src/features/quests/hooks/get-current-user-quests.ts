import { getCurrentUserQuests } from "@/api/quests";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserQuests = () => {
    return useQuery({
        queryKey: ["current-user-quests"],
        queryFn: getCurrentUserQuests,
    });
};
