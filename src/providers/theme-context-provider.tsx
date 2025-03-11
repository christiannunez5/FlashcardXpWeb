import { ThemeContext } from "@/context/theme-context";
import { PropsWithChildren, useState, useEffect } from "react";

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const [isDark, setIsDark] = useState(() => {
        const mode = localStorage.getItem("dark") === "true";

        if (mode) {
            document.documentElement.classList.add("dark");
        }

        return mode;
    });

    const toggleMode = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        localStorage.setItem("dark", "true");
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            localStorage.removeItem("dark");
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);
    return (
        <ThemeContext.Provider value={{ isDark, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
