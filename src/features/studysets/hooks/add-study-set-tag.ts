import { addStudySetTag } from "@/api/studysets";
import { TTag } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useAddStudySetTag = (studySetId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addStudySetTag,
        onMutate: async (data) => {
            queryClient.cancelQueries({
                queryKey: ["study-set-tags", studySetId],
            });

            const previousStudySetTags = queryClient.getQueryData<TTag[]>([
                "study-set-tags",
                studySetId,
            ]);

            queryClient.setQueryData(
                ["study-set-tags", studySetId],
                (oldTags: TTag[]) => {
                    return [...oldTags, data.tag];
                }
            );

            return { previousStudySetTags };
        },

        onError(error, __, context) {
            queryClient.setQueryData(
                ["study-set-tags", studySetId],
                context?.previousStudySetTags
            );

            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-set-tags", studySetId],
            });
        },
    });
};
