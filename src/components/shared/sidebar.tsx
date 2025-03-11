import { ReactNode } from "react";
import { Link } from "react-router";

export const Sidebar = () => {
    return (
        <aside
            className="h-screen bg-primary w-80 flex flex-col items-center py-4 justify-center 
        sticky top-0 shadow-md text-foreground"
        >
            <ul className="w-full flex flex-col gap-2 flex-grow justify-center">
                <SidebarItem
                    title="Home"
                    linkUrl="/"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-smart-home"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
                            <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0" />
                        </svg>
                    }
                />

                <SidebarItem
                    title="My Studysets"
                    linkUrl="my-studysets"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-folder-check"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4" />
                            <path d="M15 19l2 2l4 -4" />
                        </svg>
                    }
                />

                <SidebarItem
                    title="Leaderboard"
                    linkUrl="leaderboard"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar-popular"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                            <path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                            <path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                            <path d="M4 20h14" />
                        </svg>
                    }
                />

                <SidebarItem
                    title="Popular"
                    linkUrl="popular"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-flame"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.621 -2.333 5.588c0 3.704 3.134 6.706 7 6.706s7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235" />
                        </svg>
                    }
                />
                <SidebarItem
                    title="Profile"
                    linkUrl="home"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-user"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                    }
                />
            </ul>

            <div className="w-full px-6 hover:brightness-105">
                <button className="w-full p-2 bg-accent text-accent-foreground rounded-2xl">
                    New study set
                </button>
            </div>
        </aside>
    );
};

interface SidebarItemProps {
    icon: ReactNode;
    title: string;
    linkUrl: string;
}

const SidebarItem = ({ icon, title, linkUrl }: SidebarItemProps) => {
    return (
        <Link
            to={linkUrl}
            className="relative py-3 px-6 gap-4 flex items-center "
        >
            {icon}
            <p>{title}</p>
        </Link>
    );
};
