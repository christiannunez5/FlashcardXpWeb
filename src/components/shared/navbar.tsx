import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

import { useState } from "react";

export const Navbar = () => {
    return (
        <nav className="bg-white p-3 flex justify-between border-b border-gray-100">
            <div>
                <p>test</p>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="h-8 w-8 rounded-full bg-violet-300"></div>
            </div>
        </nav>
    );
};

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(true);

    return (
        <div
            className="text-lg rounded-full hover:bg-[#eff5f8] p-2 cursor-pointer"
            onClick={() => setIsLight(!isLight)}
        >
            {isLight ? <MdOutlineWbSunny /> : <IoMoonOutline />}
        </div>
    );
};
