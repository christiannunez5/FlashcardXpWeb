import { getTags } from "@/api/tags";
import { useQuery } from "@tanstack/react-query";

export const useGetTags = () => {
    return useQuery({
        queryFn: getTags,
        queryKey: ["tags"],
    });
};
