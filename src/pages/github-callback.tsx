import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const GitHubCallback = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["github-login"],
        mutationFn: async () => {
            const response = await api.get("api/auth/login/github/callback", {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
        },
        onError: () => {
            toast.error("error logging in");
        },
    });

    useEffect(() => {
        mutate();
    }, [mutate]);

    return <p>Logging in with GitHub...</p>;
};

export default GitHubCallback;
