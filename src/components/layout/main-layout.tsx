import { Sidebar, Navbar } from "@/components/shared";
import { Outlet, useLocation } from "react-router";

export const MainLayout = () => {
    const location = useLocation();

    const shouldHideSidebar =
        location.pathname === "/flashcards/add" ||
        location.pathname.match(/^\/study-set\/[^/]+\/edit$/);

    return (
        <div className="bg-background w-full flex text-foreground ">
            {!shouldHideSidebar && <Sidebar />}

            <main className="w-full flex flex-col gap-10 p-10 ">
                <Navbar />
                <Outlet />
            </main>
        </div>
    );
};
