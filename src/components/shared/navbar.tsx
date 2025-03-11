import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import { useThemeContext } from "@/hooks/use-theme-context";
import { CircularButton } from "@/components/ui/circular-button";

export const Navbar = () => {
    return (
        <nav className="w-full flex justify-end gap-6 items-center">
            <CircularButton
                className="bg-accent text-accent-foreground"
                size={10}
            >
                <FiPlus />
            </CircularButton>

            <CircularButton className="bg-inherit hover:bg-container" size={10}>
                <FaExclamation />
            </CircularButton>

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
