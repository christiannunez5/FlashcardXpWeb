import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createFolderSchema = z.object({
    name: z.string().min(1, "Name must be atleast 1 character."),
});

export type TCreateFolderSchema = z.infer<typeof createFolderSchema>

export const useAddFolder = () => {
    return useMutation({
        mutationFn: 
    })
}