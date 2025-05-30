import { loginSchema, TLoginSchema, useLogin } from "../hooks/";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleZodErrors } from "@/utils/handle-zod-errors";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { CircularButton } from "@/components/ui/circular-button";
import { useNavigate } from "react-router";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();
    const { mutate: login, isPending } = useLogin();

    const handleLogin = () => {
        const data = getValues();
        console.log(data);
        login(data);
    };

    watch();

    return (
        <div className="w-[55%] p-10 flex flex-col gap-4 ">
            <div className=" flex flex-col items-center">
                <h3>Sign in with email</h3>
            </div>

            <form
                className="flex flex-col gap-2 mt-10"
                onSubmit={handleSubmit(handleLogin, (errors) =>
                    handleZodErrors(errors)
                )}
            >
                <FormInput
                    className="bg-background p-4 rounded-lg gap-4"
                    placeholder="Email address"
                    {...register("email")}
                    error={errors.email}
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="gray"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-mail"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                    }
                />

                <FormInput
                    type="Password"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="gray"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-lock"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                    }
                    {...register("password")}
                    placeholder="Password"
                    error={errors.password}
                    className="bg-background p-4 rounded-lg gap-4"
                />

                <a className="text-gray-400 self-end my-1">Forgot password?</a>

                <div className="w-full flex gap-2 ">
                    <Button
                        className="bg-accent rounded-3xl px-7 "
                        type="submit"
                        disabled={isPending}
                    >
                        Login now
                    </Button>

                    <Button
                        className="border border-gray-500 bg-primary 
                        text-foreground rounded-3xl px-5 hover:text-accent-foreground"
                        type="button"
                        onClick={() => navigate(`/auth/register`)}
                    >
                        Create account
                    </Button>
                </div>
            </form>

            <p className="mt-10 text-center text-gray-400 border-t border-slate-300 pt-4">
                or you can sign in with
            </p>

            <div className="w-full space-x-3">
                <CircularButton className="bg-black p-3 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
                    </svg>
                </CircularButton>
            </div>
        </div>
    );
};
