import { getFolders } from "@/api/folders";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = () => {
    return useQuery({
        queryKey: ["folders"],
        queryFn: getFolders,
    });
};
