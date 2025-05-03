import { getFolder } from "@/api/folders";
import { useQuery } from "@tanstack/react-query";

export const useGetFolderById = (id: string) => {
    return useQuery({
        queryKey: ["folders", id],
        queryFn: () => getFolder(id),
    });
};
