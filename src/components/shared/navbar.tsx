import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useThemeContext } from "@/hooks/use-theme-context";
import { CircularButton } from "@/components/ui/circular-button";
import { useLogout } from "@/features/auth/hooks";
import { QuestModal } from "@/features/quests/components";
import { Search } from "lucide-react";
import { useAuthContext } from "@/context/auth/hooks";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
    const { mutate: logout } = useLogout();

    const { user } = useAuthContext();

    return (
        <nav className="w-full flex justify-end gap-6 items-center">
            <div
                className="w-[60%] flex p-[0.9rem] outline-none rounded-xl
            bg-background border-2 border-container gap-3"
            >
                <Search className="" />

                <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="Search anything.."
                />
            </div>

            <QuestModal />
            <ThemeToggle />

            <Avatar className="bg-accent">
                <AvatarImage src={user?.profilePicUrl} />
            </Avatar>
        </nav>
    );
};

export const ThemeToggle = () => {
    const { isDark, toggleMode } = useThemeContext();

    return (
        <CircularButton
            className="bg-inherit hover:bg-container text-lg"
            onClick={toggleMode}
            size={10}
        >
            {isDark ? <IoMoonOutline /> : <MdOutlineWbSunny />}
        </CircularButton>
    );
};
