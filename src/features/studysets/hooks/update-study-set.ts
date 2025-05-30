import { updateStudySet } from "@/api/studysets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

export const updateStudySetSchema = z.object({
    title: z.string().default(""),
    description: z.string().optional(),
});

export type TUpdateStudySetSchema = z.infer<typeof updateStudySetSchema>;

export const useUpdateStudySet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStudySet,
        // onMutate: async (data) => {
        //     queryClient.cancelQueries({ queryKey: ["my-study-sets"] });

        //     const previousStudySets = queryClient.getQueryData<
        //         TStudySetSummary[]
        //     >(["my-study-sets"]);

        //     queryClient.setQueryData(
        //         ["my-study-sets"],
        //         (oldData: TStudySetSummary[]) => {
        //             return oldData.map((studySet) => {
        //                 if (data.studySetId === studySet.id) {
        //                     return {
        //                         ...studySet,
        //                         title: data.data.title,
        //                         description: data.data.description,
        //                     };
        //                 }
        //                 return studySet;
        //             });
        //         }
        //     );
        //     console.log("Here");

        //     return { previousStudySets };
        // },
        // onError(error, _, context) {
        //     queryClient.setQueryData(
        //         ["my-study-sets"],
        //         context?.previousStudySets
        //     );
        //     if (error instanceof AxiosError) {
        //         toast.error(error.response?.data.message);
        //     }
        // },
        // onSettled() {
        //     queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
        // },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-study-sets"] });
        },
    });
};
