import { createGroup } from "@/api/groups";
import { TGroupSummary } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const createGroupSchema = z.object({
    name: z.string().min(6, "Name must be atleast 6 characters"),
});

export type TCreateGroupSchema = z.infer<typeof createGroupSchema>;

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGroup,
        onMutate: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["groups"] });

            const previousGroups = queryClient.getQueryData<TGroupSummary[]>([
                "groups",
            ]);

            const newGroup: TGroupSummary = {
                id: "",
                name: data.name,
                membersCount: 1,
            };

            queryClient.setQueryData(["groups"], (oldData: TGroupSummary[]) => {
                return [...oldData, newGroup];
            });

            return { previousGroups, newGroup };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
    });
};
