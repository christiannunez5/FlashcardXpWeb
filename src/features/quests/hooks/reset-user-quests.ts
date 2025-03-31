import { resetCurrentUserQuests } from "@/api/quests";
import { useMutation } from "@tanstack/react-query";

export const useResetUserDailyQuest = () => {
    return useMutation({
        mutationFn: resetCurrentUserQuests,
    });
};
