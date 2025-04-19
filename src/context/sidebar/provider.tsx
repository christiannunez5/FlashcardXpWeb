import { SidebarContext } from "@/context/sidebar/context";
import { PropsWithChildren, useState } from "react";

export const SidebarContextProvider = ({ children }: PropsWithChildren) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSidebarExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <SidebarContext.Provider value={{ isExpanded, handleSidebarExpand }}>
            {children}
        </SidebarContext.Provider>
    );
};
