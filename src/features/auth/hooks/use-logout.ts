import { logoutUser } from "@/api/auth";
import { useAuthContext } from "@/context/auth/hooks";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
    const { setUser } = useAuthContext();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            setUser(undefined);
        },
    });
};
