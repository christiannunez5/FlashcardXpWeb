import { addStudyset } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";

export const useAddStudySet = () => {
    return useMutation({
        mutationFn: addStudyset,
    });
};
