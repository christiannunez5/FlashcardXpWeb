import { completeQuest } from "@/api/user-quests";
import { TQuest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCompleteQuest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeQuest,
        onMutate: async (questId) => {
            await queryClient.cancelQueries({
                queryKey: ["current-user-quests"],
            });

            const previousQuests = queryClient.getQueryData<TQuest[]>([
                "current-user-quests",
            ]);
            
            queryClient.setQueryData(
                ["current-user-quests"],
                (oldQuests: TQuest[]) => {
                    return oldQuests.filter((quest) => quest.id !== questId);
                }
            );

            return { previousQuests, questId };
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["current-user-quests"],
            });
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(
                ["current-user-quests"],
                context?.previousQuests
            );

            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["current-user-experience"],
            });
        },
    });
};
