import { login } from "@/api/auth";
import { useResetUserDailyQuest } from "@/features/quests/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().nonempty("Password can't be empty."),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const useLogin = () => {
    const queryClient = useQueryClient();

    const { mutate: resetQuests } = useResetUserDailyQuest();

    return useMutation({
        mutationFn: login,
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            resetQuests();
        },
    });
};
