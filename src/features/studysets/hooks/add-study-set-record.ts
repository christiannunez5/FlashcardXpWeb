import { createStudySetRecord } from "@/api/studysets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddStudySetRecord = (studySetId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudySetRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-set-record", studySetId],
            });
        },
    });
};
