import { getFolder } from "@/api/folders";
import { TFolderSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFolderBreadcrumbTrail = (folderId: string) => {
    return useQuery({
        queryKey: ["breadcrumbTrail", folderId],
        queryFn: async () => {
            const trail: TFolderSummary[] = [];
            let current = await getFolder(folderId);

            while (current) {
                trail.unshift({
                    id: current.id,
                    name: current.name,
                    parentFolderId: current.parentFolderId,
                });
                if (!current.parentFolderId) break;
                current = await getFolder(current.parentFolderId);
            }

            return trail;
        },
        enabled: !!folderId,
    });
};
