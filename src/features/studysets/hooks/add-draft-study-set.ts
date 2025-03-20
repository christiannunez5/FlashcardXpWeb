import { addDraftStudySet } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";

export const useAddDraftStudySet = () => {
    return useMutation({
        mutationFn: addDraftStudySet,
    });
};
