import { AiOutlineMail } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";

export const LoginForm = () => {
    return (
        <div className="w-[400px] p-3 flex flex-col gap-5">
            <h1 className="mx-auto font-semibold text-xl">Sign in</h1>

            <form action="" className="flex flex-col text-gray-400 gap-2">
                <div className="border-2 border-gray-200 rounded-xl flex py-2 px-4 items-center gap-3">
                    <AiOutlineMail />
                    <input
                        type="text"
                        placeholder="Email address"
                        className="w-full outline-none"
                    />
                </div>

                <div className="border-2 border-gray-200 rounded-xl flex py-2 px-4 items-center gap-3">
                    <IoLockClosedOutline />
                    <input
                        type="text"
                        placeholder="Password"
                        className="w-full outline-none"
                    />
                </div>

                <button className="bg-[#07085B] text-white p-2 rounded-xl">
                    Sign in
                </button>

                <div className="text-sm font-light text-center space-x-1 mt-1">
                    <span>Dont have an account?</span>
                    <a className="text-blue-500">Register</a>
                </div>
            </form>

            <div>
                <span>Sign in via socials</span>

                <button></button>
            </div>
        </div>
    );
};
