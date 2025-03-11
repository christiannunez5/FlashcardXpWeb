import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeContext must be used within a ThemeContextProvider"
        );
    }

    return context;
};
