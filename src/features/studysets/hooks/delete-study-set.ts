import { deleteStudySet } from "@/api/studysets";
import { TStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStudySet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStudySet,
        onSuccess: (deleteStudySet) => {
            queryClient.setQueryData(
                ["study-sets"],
                (studySets: TStudySet[]) => {
                    return studySets.filter((s) => s.id !== deleteStudySet.id);
                }
            );
        },
    });
}
