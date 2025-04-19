import { sidebarItems } from "@/data";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
    return (
        <aside
            className={`h-screen bg-primary w-[5.3rem] flex flex-col py-4 justify-center 
        sticky top-0 shadow-md`}
            style={{ transition: "width 0.2s ease-in-out" }}
        >
            <ul className="w-full flex flex-col flex-grow justify-center items-center gap-2">
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

            {/* <div className="w-full px-4 flex justify-center items-center ">
                <AddDraftStudySetModal>
                    <Button className="mt-2 bg-accent rounded-full">
                        <Plus strokeWidth={1.75} />
                    </Button>
                </AddDraftStudySetModal>
            </div> */}
        </aside>
    );
};

interface SidebarItemProps {
    icon: ReactNode;
    title: string;
    linkUrl: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, linkUrl }) => {
    const location = useLocation();
    const normalizedLinkUrl = linkUrl.startsWith("/") ? linkUrl : `/${linkUrl}`;
    const isActive = location.pathname === normalizedLinkUrl;

    return (
        <Link to={normalizedLinkUrl} className="">
            <button
                className={cn(
                    `sidebar-icon ${
                        isActive && "bg-accent text-accent-foreground"
                    }`
                )}
            >
                {icon}
            </button>
        </Link>
    );
};
