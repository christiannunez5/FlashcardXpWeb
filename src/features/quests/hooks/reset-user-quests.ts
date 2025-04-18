import { resetCurrentUserQuests } from "@/api/user-quests";
import { useMutation } from "@tanstack/react-query";

export const useResetUserDailyQuest = () => {
    return useMutation({
        mutationFn: resetCurrentUserQuests,
    });
};
