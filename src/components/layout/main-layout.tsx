import { Sidebar, Navbar } from "@/components/shared";
import React, { PropsWithChildren, ReactNode } from "react";
import { useLocation } from "react-router";
import "@/styles/progress-bar.css";

interface MainLayoutProps {
    children: ReactNode;
    size?: number;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    size = 100,
    children,
}) => {
    const location = useLocation();

    const shouldHideSidebar =
        location.pathname === "/flashcards/add" ||
        location.pathname.match(/^\/study-set\/[^/]+\/edit$/);

    return (
        <div className="bg-background w-full flex text-foreground ">
            {!shouldHideSidebar && <Sidebar />}

            <main className="w-full flex flex-col gap-10 p-10 bg-background ">
                <Navbar />
                <div className="flex-1 mx-auto" style={{ width: `${size}%` }}>
                    {children}
                </div>
            </main>
        </div>
    );
};
