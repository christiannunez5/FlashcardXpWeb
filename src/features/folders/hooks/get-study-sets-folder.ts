import { getStudySetsByFolder } from "@/api/folders";
import { useQuery } from "@tanstack/react-query";

export const useGetStudySetsByFolder = (folderId: string) => {
    return useQuery({
        queryKey: ["study-sets-folder", folderId],
        queryFn: () => getStudySetsByFolder(folderId),
    });
};
