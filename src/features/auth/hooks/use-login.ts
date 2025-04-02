import { login } from "@/api/auth";
import { useAuthContext } from "@/context/auth/hooks";
import { useResetUserDailyQuest } from "@/features/quests/hooks";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().nonempty("Password can't be empty."),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const useLogin = () => {
    const navigate = useNavigate();
    const { mutate: resetQuests } = useResetUserDailyQuest();
    const { setUser } = useAuthContext();

    return useMutation({
        mutationFn: login,
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        },
        onSuccess: async () => {
            resetQuests();
            const response = await api.get("api/auth/me");
            setUser(response.data);
            navigate("/");
        },
    });
};
