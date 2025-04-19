import { SidebarContext } from "@/context/sidebar/context";
import { useContext } from "react";

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("Sidebar context must be used with a provider.");
    }

    return context;
};
