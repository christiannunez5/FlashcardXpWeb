import { logoutUser } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            window.location.href = "/";
        },
    });
};
