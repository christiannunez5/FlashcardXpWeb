import { updateStudySet } from "@/api/studysets";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const updateStudySetSchema = z.object({
    title: z.string().min(6, "Title must have atleast 6 characters"),
    description: z.string().optional(),
});

export type TUpdateStudySetSchema = z.infer<typeof updateStudySetSchema>;

export const useUpdateStudySet = () => {
    return useMutation({
        mutationFn: updateStudySet,
    });
};
