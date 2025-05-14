import { getStudySetsByTag } from "@/api/tags";
import { useQuery } from "@tanstack/react-query";

export const useGetStudySetsByTag = (tagId: string) => {
    return useQuery({
        queryKey: ["tag-study-sets", tagId],
        queryFn: () => getStudySetsByTag(tagId),
    });
};
