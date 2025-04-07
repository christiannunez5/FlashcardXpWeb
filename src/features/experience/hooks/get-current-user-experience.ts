import { getCurrentUserExperience } from "@/api/experience";
import { useQuery } from "@tanstack/react-query";
    
export const useGetCurrentUserExperience = () => {
    return useQuery({
        queryKey: ["current-user-experience"],
        queryFn: getCurrentUserExperience,
    });
};
