import { Sidebar, Navbar } from "@/components/shared";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import "@/styles/progress-bar.css";

export const MainLayout = ({ children }: PropsWithChildren) => {
    const location = useLocation();

    const shouldHideSidebar =
        location.pathname === "/flashcards/add" ||
        location.pathname.match(/^\/study-set\/[^/]+\/edit$/);

    return (
        <div className="bg-background w-full flex text-foreground ">
            {!shouldHideSidebar && <Sidebar />}

            <main className="w-full flex flex-col gap-10 p-10 bg-background ">
                <Navbar />
                <div className="flex-1">{children}</div>
            </main>
        </div>
    );
};
