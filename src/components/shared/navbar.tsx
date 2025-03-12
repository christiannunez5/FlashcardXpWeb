import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import { useThemeContext } from "@/hooks/use-theme-context";
import { CircularButton } from "@/components/ui/circular-button";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks";
import { useGetCurrentUser } from "@/hooks";
import { AddStudySetModal } from "@/components/shared";
    
export const Navbar = () => {
    const { mutate: logout } = useLogout();
    const { data } = useGetCurrentUser();
    const handleLogout = () => {
        console.log("hello");
        logout();
        console.log(data);
    };

    return (
        <nav className="w-full flex justify-end gap-6 items-center">
            <AddStudySetModal>
                <CircularButton
                    className="bg-accent text-accent-foreground"
                    size={10}
                >
                    <FiPlus />
                </CircularButton>
            </AddStudySetModal>

            <CircularButton className="bg-inherit hover:bg-container" size={10}>
                <FaExclamation />
            </CircularButton>

            <Button onClick={handleLogout}>Logout</Button>

            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-container"></div>
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
            {isDark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
        </CircularButton>
    );
};
