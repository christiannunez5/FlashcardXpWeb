import { createDraftStudySet } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";

export const useCreateDraftStudySet = () => {
    return useMutation({
        mutationFn: createDraftStudySet,
    });
};
