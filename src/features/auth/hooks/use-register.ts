import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

export const createUserSchema = z
    .object({
        email: z.string().email("Please enter a valid email address"),
        username: z.string().nonempty("Username can't be empty."),
        password: z
            .string()
            .min(6, "Password must be atleast 6 characters long")
            .regex(/[0-9]/, "Password must contain at least one digit")
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type TCreateUserSchema = z.infer<typeof createUserSchema>;

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }

            console.log(error);
        },
    });
};
