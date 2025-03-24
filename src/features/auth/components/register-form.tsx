import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import {
    createUserSchema,
    TCreateUserSchema,
    useRegister,
} from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, UserRound } from "lucide-react";
import { handleZodErrors } from "@/utils";
import { PasswordInput } from "@/components/shared";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<TCreateUserSchema>({
        resolver: zodResolver(createUserSchema),
    });

    const { mutate: createUser, isPending } = useRegister();
    const navigate = useNavigate();

    const handleRegister = () => {
        const data = getValues();
        createUser(data, {
            onSuccess: () => {
                toast.success("User created successfully.");
                reset();
            },
        });
    };

    return (
        <div className={`w-[55%] p-10 flex flex-col gap-4 `}>
            <div className=" flex flex-col items-center">
                <h3>Create an account</h3>
            </div>

            <form
                className="flex flex-col gap-2 mt-10"
                onSubmit={handleSubmit(handleRegister, (errors) => {
                    handleZodErrors(errors);
                })}
            >
                <FormInput
                    className="bg-background p-4 rounded-lg gap-4"
                    placeholder="Email address"
                    icon={<Mail strokeWidth={2} color="gray" />}
                    {...register("email")}
                    error={errors.email}
                />

                <FormInput
                    className="bg-background p-4 rounded-lg gap-4"
                    placeholder="Username"
                    icon={<UserRound strokeWidth={2} color="gray" />}
                    {...register("username")}
                    error={errors.username}
                />

                <PasswordInput
                    placeholder="Password"
                    register={register("password")}
                    error={errors.password}
                />

                <PasswordInput
                    placeholder="Confirm Password"
                    register={register("confirmPassword")}
                    error={errors.password}
                />

                <div className="w-full flex gap-2 mt-6">
                    <Button
                        className="bg-accent rounded-3xl px-7 "
                        type="submit"
                        disabled={isPending}
                    >
                        Create account
                    </Button>

                    <Button
                        className="border border-gray-500 bg-primary 
                        text-foreground rounded-3xl px-5 hover:text-accent-foreground"
                        type="button"
                        onClick={() => navigate(`/`)}
                    >
                        Back to login
                    </Button>
                </div>
            </form>
        </div>
    );
};
