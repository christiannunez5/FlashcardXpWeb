import { LoginForm } from "@/features/auth/components";
import background from "@/assets/background-logo.svg";

export const Login = () => {
    return (
        <div className="bg-primary w-screen  h-screen p-10 flex flex-col text-foreground ">
            <main className="flex-1 w-[80%] flex gap-10 mx-auto mt-10">
                <div className="w-full flex items-center justify-center">
                    <img src={background} alt="" className="" />
                </div>

                <LoginForm />
            </main>
        </div>
    );
};
