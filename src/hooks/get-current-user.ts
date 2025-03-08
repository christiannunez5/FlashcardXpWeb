import { getCurrentLoggedInUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentLoggedInUser,
    });
}
