import { createContext } from "react";

interface SidebarContextType {
    isExpanded: boolean;
    handleSidebarExpand: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
    isExpanded: false,
    handleSidebarExpand: () => {},
});
