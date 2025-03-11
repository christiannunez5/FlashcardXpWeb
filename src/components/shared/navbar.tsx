import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa";
import { useThemeContext } from "@/hooks/use-theme-context";

export const Navbar = () => {
    return (
        <nav className="w-full flex justify-end gap-6 items-center">
            <button className="p-3 bg-accent text-white rounded-full">
                <FiPlus />
            </button>

            <button className="p-3 rounded-full hover:bg-container">
                <FaExclamation />
            </button>
            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-container"></div>
        </nav>
    );
};

export const ThemeToggle = () => {
    const { isDark, toggleMode } = useThemeContext();

    console.log(isDark);

    return (
        <button
            className="rounded-full hover:bg-container p-3 text-lg"
            onClick={toggleMode}
        >
            {isDark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
        </button>
    );
};
