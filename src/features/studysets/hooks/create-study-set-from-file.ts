import { createStudySetFromFile } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";

export const useCreateStudySetFromFile = () => {
    return useMutation({
        mutationFn: createStudySetFromFile,
    });
};
