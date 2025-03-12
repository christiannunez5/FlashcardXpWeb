import { AddStudySetModal } from "@/components/shared/add-study-set-modal";
import { Button } from "@/components/ui/button";
import { sidebarItems } from "@/data";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
    return (
        <aside
            className="h-screen bg-primary w-80 flex flex-col items-center py-4 justify-center 
        sticky top-0 shadow-md px-4"
        >
            <ul className="w-full flex flex-col gap-2 flex-grow justify-center">
                {sidebarItems.map((s, index) => {
                    return (
                        <SidebarItem
                            key={index}
                            icon={s.icon}
                            title={s.title}
                            linkUrl={s.linkUrl}
                        />
                    );
                })}
            </ul>

            <div className="w-full px-4">
                <AddStudySetModal>
                    <Button className="w-full mt-2 " variant={"default"}>
                        New study set
                    </Button>
                </AddStudySetModal>
            </div>
        </aside>
    );
};

interface SidebarItemProps {
    icon: ReactNode;
    title: string;
    linkUrl: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, linkUrl }) => {
    const location = useLocation();
    const normalizedLinkUrl = linkUrl.startsWith("/") ? linkUrl : `/${linkUrl}`;
    const isActive = location.pathname === normalizedLinkUrl;

    return (
        <Link
            to={linkUrl}
            className={`relative py-3 px-5 gap-4 flex items-center rounded-xl
                ${
                    isActive
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "hover:bg-container"
                }`}
        >
            {icon}
            <p>{title}</p>
        </Link>
    );
};
