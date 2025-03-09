import { Sidebar, Navbar } from "@/components/shared";
import { Outlet } from "react-router";

export const MainLayout = () => {
    return (
        <div className="bg-[#eff5f8] w-full flex ">
            <Sidebar />

            <main className="w-full flex flex-col gap-10 p-10 ">
                <Navbar />
                <Outlet />
            </main>
        </div>
    );
};
