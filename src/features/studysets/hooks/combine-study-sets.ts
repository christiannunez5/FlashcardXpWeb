import { combineStudySets } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";

export const useCombineStudySets = () => {
    return useMutation({
        mutationFn: combineStudySets,
    });
};
