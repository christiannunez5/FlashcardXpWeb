import { Sidebar, Navbar } from "@/components/shared";
import { Outlet, useLocation } from "react-router";

export const MainLayout = () => {
    const location = useLocation();

    // Define routes where you **do not** want to show the sidebar
    const hideSidebarRoutes = ["/flashcards/add"];

    const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

    return (
        <div className="bg-background w-full flex text-foreground ">
            {shouldShowSidebar && <Sidebar />}

            <main className="w-full flex flex-col gap-10 p-10 ">
                <Navbar />
                <Outlet />
            </main>
        </div>
    );
};
