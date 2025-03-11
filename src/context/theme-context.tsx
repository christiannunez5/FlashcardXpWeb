import { createContext } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleMode: () => {},
});
