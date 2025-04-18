import { updateFullStudySet } from "@/api/studysets";
import { updateFlashcardSchema } from "@/features/flashcards/hooks";
import { TStudySet } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const updateFullStudySetSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().default(""),
    flashcards: z
        .array(updateFlashcardSchema)
        .min(4, "Create 4 non empty flashcards"),
});

export type TUpdateFullStudySetSchema = z.infer<
    typeof updateFullStudySetSchema
>;

export const useUpdateFullStudySet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFullStudySet,

        onMutate: async (data) => {
            queryClient.cancelQueries({
                queryKey: ["study-set", data.studySetId],
            });

            const previousStudySet = queryClient.getQueryData<TStudySet>([
                "study-set",
                data.studySetId,
            ]);

            queryClient.setQueryData(
                ["study-set", data.studySetId],
                (oldData: TStudySet) => {
                    return {
                        ...oldData,
                        status: "Published",
                    };
                }
            );

            return { previousStudySet, data };
        },

        onError: (_, __, context) => {
            queryClient.setQueryData(
                ["study-set", context?.previousStudySet?.id],
                context?.previousStudySet
            );
        },
        onSettled: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["study-set", data.studySetId],
            });
        },
    });
};
